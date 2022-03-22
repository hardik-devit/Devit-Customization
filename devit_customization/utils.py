import frappe
from frappe import _

def validate_item(doc, method=None):
    check_records = frappe.get_list('Item', filters=[["cwg1", "=", "%s"%(doc.cwg1)], ['name', '!=', str(doc.name)]])
    if check_records:
        frappe.throw(_("CWG Field should be Unique for all records..!!"))


@frappe.whitelist()
def get_user_groups_doctype():
    group_list = [d.name for d in frappe.db.get_all("User Group")]
    doctype_list = [d.name for d in frappe.db.get_all("DocType")]
    return group_list, doctype_list


