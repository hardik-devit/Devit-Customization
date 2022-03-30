import json
import frappe
from frappe import _
from frappe.permissions import get_all_perms, get_linked_doctypes, update_permission_property, add_permission, setup_custom_perms
from frappe.core.doctype.doctype.doctype import validate_permissions_for_doctype

def validate_item(doc, method=None):
    check_records = frappe.get_list('Item', filters=[["cwg1", "=", doc.cwg1], ["cwg1", "!=", None], ['name', '!=', str(doc.name)]])
    if check_records:
        frappe.throw(_("CWG ID already used, thís ID should be unique"))

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
            filters={'istable': 0, 'name': ('not in', ','.join(not_allowed_in_permission_manager)), 'module': module.name},
            or_filters={"ifnull(restrict_to_domain, '')": "", "restrict_to_domain": ("in", active_domains), 'module': module.name})
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
        filters=dict(parent = doctype)
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
    recipe_list = frappe.get_list('Recipe', fields=['name', 'item_code', 'version', 'base_version', 'allow_item_edit'], filters=filters, order_by='creation desc', limit_page_length=1)
    if recipe_list:
        recipe_list[0].items = frappe.get_list('Recipe Item', fields=['item_code', 'item_name', 'article_type', 'amount_in_grams', 'name', 'parent', 'idx', 'parenttype', 'parentfield'], filters={'parent': recipe_list[0].name}, order_by='idx')
        return recipe_list[0]

@frappe.whitelist()
def insert_recipe_item(doc):
    if isinstance(doc, str):
        doc = json.loads(doc)
    
    parent = frappe.get_doc(doc.get('parenttype'), doc.get('parent'))
    parent.append(doc.get('parentfield'), doc)
    parent.save()
    return parent.as_dict()

@frappe.whitelist()
def update_recipe_item(doc):
    if isinstance(doc, str):
        doc = json.loads(doc)
    
    parent = frappe.get_doc(doc.get('parenttype'), doc.get('parent'))
    for item in parent.items:
        if item.name == doc.get('name'):
            item.update(doc)
    parent.save()
    return parent.as_dict()

@frappe.whitelist()
def delete_recipe_item(docname, parent):
    frappe.delete_doc('Recipe Item', docname)
    doc = frappe.get_doc('Recipe', parent)
    if doc.items:
        for i,item in enumerate(doc.items):
            item.idx = (i + 1)
    doc.save()
    return doc.as_dict()

@frappe.whitelist()
def insert_recipe(item_code, version, base_version=None):
    if not frappe.db.get_value('Article Version', version):
        frappe.get_doc({'doctype': 'Article Version', 'version': version}).insert()
    
    recipe = frappe.get_doc({
        'doctype':'Recipe',
        'item_code': item_code,
        'version': version,
        'base_version': base_version,
        'allow_item_edit': 1
    }).insert()

    return recipe.as_dict()

@frappe.whitelist()
def update_recipe_edit(item_code):
    recipe = get_recipe_detail(item_code)
    if recipe:
        frappe.db.set_value('Recipe', recipe.name, 'allow_item_edit', 0)