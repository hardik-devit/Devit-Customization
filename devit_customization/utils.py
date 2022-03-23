import frappe
from frappe import _
from frappe.permissions import get_all_perms, get_linked_doctypes, update_permission_property

def validate_item(doc, method=None):
    check_records = frappe.get_list('Item', filters=[["cwg1", "=", "%s"%(doc.cwg1)], ['name', '!=', str(doc.name)]])
    if check_records:
        frappe.throw(_("CWG Field should be Unique for all records..!!"))


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
	"""Update role permission params

	Args:
		doctype (str): Name of the DocType to update params for
		role (str): Role to be updated for, eg "Website Manager".
		permlevel (int): perm level the provided rule applies to
		ptype (str): permission type, example "read", "delete", etc.
		value (None, optional): value for ptype, None indicates False

	Returns:
		str: Refresh flag is permission is updated successfully
	"""
	out = update_permission_property(doctype, role, permlevel, ptype, value)
	return 'refresh' if out else None