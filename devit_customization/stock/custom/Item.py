import frappe
from erpnext.stock.doctype.item.item import (Item)
from erpnext.controllers.item_variant import (make_variant_item_code)

class ItemInherit(Item):
    """
    -> Please check this method is not working
    """
    @frappe.whitelist()
    def get_unique_value_for_item_code(self):
        count_of_items = frappe.db.count('Item')
        return count_of_items+1

    def autoname(self):
        if frappe.db.get_default("item_naming_by") == "Naming Series":
            if self.variant_of:
                if not self.item_code:
                    template_item_name = frappe.db.get_value("Item", self.variant_of, "item_name")
                    make_variant_item_code(self.variant_of, template_item_name, self)
            else:
                from frappe.model.naming import set_name_by_naming_series
                set_name_by_naming_series(self)
                self.item_code = self.name

        self.item_code = self.item_code
        # self.name = self.item_code

