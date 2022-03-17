import frappe
from frappe import _

def validate_item(doc, method=None):
    check_records = frappe.get_list('Item', filters=[["cwg1", "=", "%s"%(doc.cwg1)], ['name', '!=', str(doc.name)]])
    if check_records:
        frappe.throw(_("CWG Field should be Unique for all records..!!"))


from erpnext.stock.doctype.item.item import (Item)

class ItemInherit(Item):
    def get_unique_value_for_item_code(self):
        count_of_items = frappe.db.count('Item')
        return count_of_items+1
