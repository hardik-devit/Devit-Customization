import frappe
from erpnext.stock.doctype.item.item import (Item)

class ItemInherit(Item):
    @frappe.whitelist()
    def get_unique_value_for_item_code(self):
        count_of_items = frappe.db.count('Item')
        return count_of_items+1
