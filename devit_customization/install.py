# import frappe
from frappe import _
from frappe.custom.doctype.custom_field.custom_field import create_custom_field

def after_install():
    dt = 'Role'
    # define roles list
    field_list = [{
        "fieldname": "custom_sc",
        "label": _("Permissions"),
        "fieldtype": "Section Break",
        "insert_after": "dashboard",
        "owner": "Administrator"
    },{
        "fieldname": "custom_html",
        "label": _("Custom HTML"),
        "fieldtype": "HTML",
        "options": "",
        "insert_after": "custom_sc",
        "owner": "Administrator"
    }]

    # insert custom field
    for field in field_list:
        create_custom_field(dt, field)
