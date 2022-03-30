import frappe
from erpnext.stock.doctype.item.item import (Item)
from erpnext.controllers.item_variant import (make_variant_item_code)

class ItemInherit(Item):
    @frappe.whitelist()
    def get_unique_value_for_item_code(self):
        check_records = frappe.get_list('Item', filters=[["item_code", "=", self.item_code], ["item_code", "!=", None]])
        if not self.item_code and not check_records:
            check_records = frappe.get_list('Item', fields=['item_code'])
            count_records = [d['item_code'] for d in check_records]
            return int(max(count_records)) +1

    def autoname(self):
        if frappe.db.get_default("item_naming_by") == "Naming Series":
            if self.variant_of:
                if not self.item_code:
                    template_item_name = frappe.db.get_value("Item", self.variant_of, "item_name")
                    make_variant_item_code(self.variant_of, template_item_name, self)
            else:
                from frappe.model.naming import set_name_by_naming_series
                set_name_by_naming_series(self)
                # self.item_code = self.name
        self.item_code = self.item_code
