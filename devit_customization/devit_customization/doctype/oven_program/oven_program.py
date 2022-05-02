# Copyright (c) 2022, Hardik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class OvenProgram(Document):

	@frappe.whitelist()
	def get_unique_value_for_oven_id(self):
		check_records = frappe.get_list('Oven Program', filters=[["id", "=", self.id], ["id", "!=", None]])
		if not self.id and not check_records:
			check_records = frappe.get_list('Oven Program', fields=['id'])
			count_records = [int(d['id']) for d in check_records]
			return int(max(count_records or [0])) + 1
