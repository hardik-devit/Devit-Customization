import json
import frappe
from frappe import _
from frappe.permissions import get_all_perms, get_linked_doctypes, update_permission_property, add_permission, \
    setup_custom_perms
from frappe.core.doctype.doctype.doctype import validate_permissions_for_doctype


def validate_item(doc, method=None):
    check_records = frappe.get_list('Item', filters=[["cwg1", "=", doc.cwg1], ["cwg1", "!=", None],
                                                     ['name', '!=', str(doc.name)]])
    if check_records:
        frappe.throw(_("CWG ID already used, thís ID should be unique"))
    if doc.kjoule:
        doc.kcal = doc.kjoule / 4.184


@frappe.whitelist()
def get_user_groups_doctype():
    group_list = [d.name for d in frappe.db.get_all("User Group")]
    doctype_list = [d.name for d in frappe.db.get_all("DocType")]
    return group_list, doctype_list


@frappe.whitelist()
def get_doctype_data(role):
    not_allowed_in_permission_manager = ["DocType", "Patch Log", "Module Def", "Transaction Log"]
    active_domains = frappe.get_active_domains()
    modules_list = frappe.get_list('Module Def', limit_page_length=100, order_by='name')
    for module in modules_list:
        doctypes = frappe.get_all('DocType', order_by='name',
                                  filters={'istable': 0,
                                           'name': ('not in', ','.join(not_allowed_in_permission_manager)),
                                           'module': module.name},
                                  or_filters={"ifnull(restrict_to_domain, '')": "",
                                              "restrict_to_domain": ("in", active_domains), 'module': module.name})
        for dt in doctypes:
            dt.permissions = get_permissions(dt.name, role)
        module.doctypes = doctypes
    return modules_list


def get_permissions(doctype=None, role=None):
    if role:
        out = get_all_perms(role)
        if doctype:
            out = [p for p in out if p.parent == doctype]
    else:
        filters = dict(parent=doctype)
        if frappe.session.user != 'Administrator':
            custom_roles = frappe.get_all('Role', filters={'is_custom': 1})
            filters['role'] = ['not in', [row.name for row in custom_roles]]

        out = frappe.get_all('Custom DocPerm', fields='*', filters=filters, order_by="permlevel")
        if not out:
            out = frappe.get_all('DocPerm', fields='*', filters=filters, order_by="permlevel")

    linked_doctypes = {}
    for d in out:
        if not d.parent in linked_doctypes:
            linked_doctypes[d.parent] = get_linked_doctypes(d.parent)
        d.linked_doctypes = linked_doctypes[d.parent]
        meta = frappe.get_meta(d.parent)
        if meta:
            d.is_submittable = meta.is_submittable
            d.in_create = meta.in_create

    return out


@frappe.whitelist()
def update_permission(doctype, role, permlevel, ptype, value=None):
    if not frappe.db.exists('Custom DocPerm', dict(parent=doctype, role=role, permlevel=permlevel)):
        add_permission(doctype, role, permlevel, ptype)
    else:
        out = update_permission_property(doctype, role, permlevel, ptype, value)
        return 'refresh' if out else None


@frappe.whitelist()
def bulk_update_permission(dt_list, role, ptype, value=None):
    if isinstance(dt_list, str):
        dt_list = json.loads(dt_list)
    for dt in dt_list:
        update_permission(dt.get('name'), role, dt.get('permlevel'), ptype, value)


@frappe.whitelist()
def remove_permission(doctype, role, permlevel):
    setup_custom_perms(doctype)

    frappe.db.delete("Custom DocPerm", {"parent": doctype, "role": role, "permlevel": permlevel})

    if not frappe.get_all('Custom DocPerm', {"parent": doctype}):
        frappe.throw(_('There must be atleast one permission rule.'), title=_('Cannot Remove'))

    validate_permissions_for_doctype(doctype, for_remove=True, alert=True)


@frappe.whitelist()
def get_recipe_detail(item_code, version=None):
    filters = {'item_code': item_code}
    if version:
        filters = {'name': version}
    recipe_list = frappe.get_all('Recipe', fields=['name', 'item_code', 'version', 'base_version', 'allow_item_edit',
                                                    'calculation_based_on', 'total_amount'], filters=filters,
                                  order_by='creation desc', limit_page_length=1)
    if recipe_list:
        recipe_list[0].items = frappe.get_all('Recipe Item',
                                               fields=['item_code', 'item_name', 'article_type', 'amount_in_grams',
                                                       'name', 'parent', 'idx', 'parenttype', 'parentfield',
                                                       'percentage'], filters={'parent': recipe_list[0].name},
                                               order_by='idx')
        return recipe_list[0]


@frappe.whitelist()
def insert_recipe_item(doc):
    parent = None
    if isinstance(doc, str):
        doc = json.loads(doc)
    if isinstance(doc, list):
        for each in doc:
            data = each
            parent = frappe.get_doc(data.get('parenttype'), data.get('parent'))
            for item in parent.items:
                if item.name == data.get('name'):
                    item.update(data)
            if data.get('__islocal', False):
                parent.append(data.get('parentfield'), data)
            parent.save()
        return parent.as_dict()
    else:
        parent = frappe.get_doc(doc.get('parenttype'), doc.get('parent'))
        parent.append(doc.get('parentfield'), doc)
        parent.save()
        return parent.as_dict()


@frappe.whitelist()
def update_recipe_item(doc):
    parent = None
    if isinstance(doc, str):
        doc = json.loads(doc)
    if isinstance(doc, list):
        for each in doc:
            data = each
            parent = frappe.get_doc(data.get('parenttype'), data.get('parent'))
            for item in parent.items:
                if item.name == data.get('name'):
                    item.update(data)
            parent.save()
        return parent.as_dict()
    else:
        parent = frappe.get_doc(doc.get('parenttype'), doc.get('parent'))
        for item in parent.items:
            if item.name == doc.get('name'):
                item.update(doc)
        parent.save()
        return parent.as_dict()


@frappe.whitelist()
def delete_recipe_item(docname, parent, doc=False):
    frappe.delete_doc('Recipe Item', docname)
    doc_recipe = frappe.get_doc('Recipe', parent)
    if doc_recipe.items:
        for i, item in enumerate(doc_recipe.items):
            item.idx = (i + 1)
    doc_recipe.save()
    if doc:
        if isinstance(doc, str):
            doc = json.loads(doc)
        if isinstance(doc, list):
            for each in doc:
                data = each
                parent = frappe.get_doc(data.get('parenttype'), data.get('parent'))
                for item in parent.items:
                    if item.name == data.get('name'):
                        item.update(data)
                parent.save()
            if isinstance(parent, str):
                return {}
            return parent.as_dict()
    else:
        return doc_recipe.as_dict()


@frappe.whitelist()
def insert_recipe(item_code, version, group, base_version=None, article_version_id='',
                  calculation_based_on="Amount In Grams", total_amount=0):
    if not frappe.db.get_value('Article Version', article_version_id):
        created_version = frappe.get_doc({
            'doctype': 'Article Version',
            'article_version_id': article_version_id,
            'article_version_german': version,
            'article_version_italian': version,
            'article_version_english': version,
            'recipe_item_code': item_code,
            'article_group': group,
        }).insert()

    if not frappe.db.get_value('Group List', group):
        frappe.get_doc({
            'doctype': 'Group List',
            'group_name': group,
        }).insert()

    recipe = frappe.get_doc({
        'doctype': 'Recipe',
        'item_code': item_code,
        'version': version,
        'base_version': base_version if base_version else version,
        'allow_item_edit': 1,
        'calculation_based_on': calculation_based_on,
        'total_amount': total_amount,
        'recipe_group': group,
    }).insert()

    return recipe.as_dict()


@frappe.whitelist()
def update_recipe_edit(active_recipe_version=False, selected_recipe_version=False):
    """ Logic changed from item_code to based on recipe """
    if active_recipe_version:
        frappe.db.set_value('Recipe', active_recipe_version, 'allow_item_edit', 0)
    if selected_recipe_version:
        frappe.db.set_value('Recipe', selected_recipe_version, 'allow_item_edit', 0)

@frappe.whitelist()
def get_last_version(selected_group, current_item_code):
    response = {}
    if selected_group:
        recipe = frappe.get_list('Recipe', fields=['item_code', 'version', 'base_version', 'recipe_group'],
                                 filters=({'item_code': current_item_code}, {'recipe_group': selected_group}))
        if not recipe:
            response = {'version': 'V1'}
        else:
            recipes = [each.get('version') for each in recipe]
            recipe_ids = [int(each_ver.split('-')[1].split('V')[-1]) for each_ver in recipes]
            max_version = max(recipe_ids)
            response = {'version': max_version + 1, 'base_version': max_version}
    return response


@frappe.whitelist()
def get_recipe_list(item_code):
    recipe_versions = frappe.db.get_list('Recipe', fields=['*'], filters={'item_code': item_code})
    return recipe_versions


@frappe.whitelist()
def insert_process(item_code, version, base_version=None):
    if not frappe.db.get_value('Process Version', version):
        frappe.get_doc({
            'doctype': 'Process Version',
            'id': version,
            'process_version_german': version,
            'process_version_italian': version,
            'process_version_english': version
        }).insert()

    process = frappe.get_doc({
        'doctype':'Production Process',
        'item_code': item_code,
        'version': version,
        'base_version': base_version,
        'allow_item_edit': 1
    }).insert()

    return process.as_dict()


@frappe.whitelist()
def get_process_detail(item_code, version=None):
    filters = {'item_code': item_code}
    if version:
        filters = {'name': version}
    process_list = frappe.get_list('Production Process', fields=['*'], filters=filters, order_by='creation desc', limit_page_length=1)
    if process_list and len(process_list) != 0:
        process_list[0].processes = frappe.get_list('Production Process Table', fields=['priority', 'process_step', 'temperature', 'time_in_min', 'humidity_in_', 'oven_program', 'slices_per_unit', 'slices_per_package', 'grams_per_package', 'name', 'parent', 'idx', 'parenttype', 'parentfield'], filters={'parent': process_list[0].name}, order_by='idx')
        return process_list[0]
    else:
        if version:
            filters = {'version': version, 'item_code': item_code}
            process_list = frappe.get_list('Production Process', fields=['*'], filters=filters, order_by='creation desc', limit_page_length=1)
            if process_list and len(process_list) != 0:
                process_list[0].processes = frappe.get_list('Production Process Table', fields=['priority', 'process_step', 'temperature', 'time_in_min', 'humidity_in_', 'oven_program', 'slices_per_unit', 'slices_per_package', 'grams_per_package', 'name', 'parent', 'idx', 'parenttype', 'parentfield'], filters={'parent': process_list[0].name}, order_by='idx')
                return process_list[0]

@frappe.whitelist()
def delete_process_step(docname, parent):
    frappe.delete_doc('Production Process Table', docname)
    doc = frappe.get_doc('Production Process', parent)
    if doc.processes:
        for i,process in enumerate(doc.processes):
            process.idx = (i + 1)
    doc.save()
    return doc.as_dict()


@frappe.whitelist()
def insert_process_step(doc):
    if isinstance(doc, str):
        doc = json.loads(doc)

    parent = frappe.get_doc(doc.get('parenttype'), doc.get('parent'))
    parent.append(doc.get('parentfield'), doc)
    parent.save()
    return parent.as_dict()


@frappe.whitelist()
def get_production_process_list(item_code):
    process_versions = frappe.db.get_list('Production Process', fields=['*'], filters={'item_code': item_code})
    return process_versions


@frappe.whitelist()
def get_total_process_version_list(item_code):
    process_versions = len(frappe.db.get_list('Production Process', filters={'item_code': item_code}))
    return process_versions


@frappe.whitelist()
def update_process_edit(active_production_version=False, select_production_version=False):
    if active_production_version:
        frappe.db.set_value('Production Process', active_production_version, 'allow_item_edit', 0)
    if select_production_version:
        frappe.db.set_value('Production Process', select_production_version, 'allow_item_edit', 0)

@frappe.whitelist()
def set_attributes_calculation(total_in_grams, lines):
    response = {}
    if isinstance(lines, str):
        lines = json.loads(lines)
    if isinstance(total_in_grams, str):
        total_in_grams = json.loads(total_in_grams)
    global_kjoule = 0; global_kcal = 0;global_fat = 0;global_protein = 0;global_carbohydrates = 0;global_whereof_sugar = 0;global_whereof_saturated_fat = 0;global_salt = 0;global_fibre = 0;
    global_iron_per_100g = 0; global_zinc_per_100g = 0; global_calcium_per_100g = 0; global_magnesium_per_100g = 0; global_iodine_per_100g = 0; global_fluoride_per_100g = 0; global_potassium_per_100g = 0;
    for each_value in lines:
        line_aig = each_value['amount_in_grams']
        item_code = each_value['item_code']
        item = frappe.get_list('Item', filters=[["name", "=", item_code]], fields=['*'])
        if item:
            kjoule = item[0].get('kjoule', 0.0)
            kcal = item[0].get('kcal', 0.0)
            fat = item[0].get('fat', 0.0)
            protein = item[0].get('protein', 0.0)
            carbohydrates = item[0].get('carbohydrates', 0.0)
            whereof_sugar = item[0].get('whereof_sugar', 0.0)
            whereof_saturated_fat = item[0].get('whereof_saturated_fat', 0.0)
            salt = item[0].get('salt', 0.0)
            fibre = item[0].get('fibre', 0.0)
            # Minerals field
            iron = item[0].get('iron_per_100g', 0.0)
            zinc = item[0].get('zinc_per_100g', 0.0)
            calcium = item[0].get('calcium_per_100g', 0.0)
            magnesium = item[0].get('magnesium_per_100g', 0.0)
            iodine = item[0].get('iodine_per_100g', 0.0)
            fluoride = item[0].get('fluoride_per_100g', 0.0)
            potassium = item[0].get('potassium_per_100g', 0.0)

            global_kjoule += kjoule * line_aig / total_in_grams
            global_kcal += kcal * line_aig / total_in_grams
            global_fat += fat * line_aig / total_in_grams
            global_protein += protein * line_aig / total_in_grams
            global_carbohydrates += carbohydrates * line_aig / total_in_grams
            global_whereof_sugar += whereof_sugar * line_aig / total_in_grams
            global_whereof_saturated_fat += whereof_saturated_fat * line_aig / total_in_grams
            global_salt += salt * line_aig / total_in_grams
            global_fibre += fibre * line_aig / total_in_grams

            global_iron_per_100g += iron * line_aig / total_in_grams
            global_zinc_per_100g += zinc * line_aig / total_in_grams
            global_calcium_per_100g += calcium * line_aig / total_in_grams
            global_magnesium_per_100g += magnesium * line_aig / total_in_grams
            global_iodine_per_100g += iodine * line_aig / total_in_grams
            global_fluoride_per_100g += fluoride * line_aig / total_in_grams
            global_potassium_per_100g += potassium * line_aig / total_in_grams
    response.update({
        'global_kjoule': global_kjoule,
        'global_kcal': global_kcal,
        'global_fat': global_fat,
        'global_protein': global_protein,
        'global_carbohydrates': global_carbohydrates,
        'global_whereof_sugar': global_whereof_sugar,
        'global_whereof_saturated_fat': global_whereof_saturated_fat,
        'global_salt': global_salt,
        'global_fibre': global_fibre,
        'global_iron_per_100g': global_iron_per_100g,
        'global_zinc_per_100g': global_zinc_per_100g,
        'global_calcium_per_100g': global_calcium_per_100g,
        'global_magnesium_per_100g': global_magnesium_per_100g,
        'global_iodine_per_100g': global_iodine_per_100g,
        'global_fluoride_per_100g': global_fluoride_per_100g,
        'global_potassium_per_100g': global_potassium_per_100g,
    })
    return response

@frappe.whitelist()
def set_attributes_allergens(lines):
    response = {}
    if isinstance(lines, str):
        lines = json.loads(lines)
    allergens_list = ['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites',
               'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270',
               'e_300', 'e_330', 'sol', 'leach']
    other_list = ['vegan', 'vegeterian']
    field_list = allergens_list + other_list
    prepare_dict = {}
    for each_field in field_list:
        if each_field not in prepare_dict:
            prepare_dict.update({each_field: []})
        for each_line in lines:
            item_code = each_line['item_code']
            item = frappe.get_list('Item', filters=[["name", "=", item_code]], fields=field_list)
            prepare_dict[each_field].append(item[0].get(each_field))
    for each_prepare in prepare_dict:
        if each_prepare in allergens_list:
            if any(prepare_dict[each_prepare]):
                response.update({each_prepare: True})
            else:
                response.update({each_prepare: False})
        if each_prepare in other_list:
            if all(prepare_dict[each_prepare]):
                response.update({each_prepare:True})
            else:
                response.update({each_prepare: False})
    return response

@frappe.whitelist()
def update_production_edit(active_production_version):
    """ Logic changed from item_code to based on recipe """
    if active_production_version:
        frappe.db.set_value('Production Process', active_production_version, 'allow_item_edit', 1)

@frappe.whitelist()
def update_process_step(doc):
    if isinstance(doc, str):
        doc = json.loads(doc)
    parent = frappe.get_doc(doc.get('parenttype'), doc.get('parent'))
    for process in parent.processes:
        if process.name == doc.get('name'):
            process.update(doc)
    parent.save()
    return parent.as_dict()

@frappe.whitelist()
def get_selected_active_version(selected_value=False):
    if selected_value:
        filters = {'name': selected_value}
        recipe_list = frappe.get_list('Recipe', fields=['*'], filters=filters)
        return recipe_list[0]
