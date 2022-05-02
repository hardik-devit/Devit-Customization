# Copyright (c) 2022, Hardik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ProcessStep(Document):
	@frappe.whitelist()
	def get_unique_value_for_process_steps(self):
		check_records = frappe.get_list('Process Step', filters=[["id", "=", self.id], ["id", "!=", None]])
		if not self.id and not check_records:
			check_records = frappe.get_list('Process Step', fields=['id'])
			count_records = [int(d['id']) for d in check_records]
			return int(max(count_records or [0])) + 1
