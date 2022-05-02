import frappe, json
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

    add_article_type_data()
    add_recipe_group_data()

def add_article_type_data():
    article_datas = json.loads(
        open(frappe.get_app_path("devit_customization", "data", "article_type_data.json")).read())
    for d in article_datas:
        if not frappe.db.exists('Article Type', _(d.get("article_type_english"))):
            frappe.get_doc({
                "doctype": "Article Type",
                "article_type_english": _(d.get("article_type_english")),
                "article_type_german": _(d.get("article_type_german")),
            }).db_insert()

def add_recipe_group_data():
    group_datas = json.loads(
        open(frappe.get_app_path("devit_customization", "data", "recipe_group_data.json")).read())
    for group in group_datas:
        if not frappe.db.exists('Group List', _(group.get("group_name"))):
            frappe.get_doc({
                "doctype": "Group List",
                "group_name": _(group.get("group_name"))
            }).db_insert()
