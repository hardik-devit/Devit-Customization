# Copyright (c) 2022, Hardik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Recipe(Document):
	def validate(self):
		if self.base_version and not self.items:
			check_base = frappe.get_list('Recipe', filters={'item_code': self.item_code, 'version': self.base_version})
			if check_base:
				items_list = frappe.get_list('Recipe Item', filters={'parent': check_base[0].name}, fields=['*'], order_by='idx')
				for item in items_list:
					self.append('items', {
						'item_code': item.item_code,
						'item_name': item.item_name,
						'article_type': item.article_type,
						'amount_in_grams': item.amount_in_grams
					})
