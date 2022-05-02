# Copyright (c) 2022, Hardik and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class ProductionProcess(Document):
	def validate(self):
		if self.base_version and not self.processes:
			check_base = frappe.get_list('Production Process', filters={'item_code': self.item_code, 'version': self.base_version})
			if check_base:
				processes_list = frappe.get_list('Production Process Table', filters={'parent': check_base[0].name}, fields=['*'],
											 order_by='idx')
				for process in processes_list:
					self.append('processes', {
						'priority': process.priority,
						'process_step': process.process_step,
						'max_temp': process.max_temp,
						'temperature': process.temperature,
						'time_in_min': process.time_in_min,
						'humidity_in_': process.humidity_in_,
						'oven_program': process.oven_program,
						'slices_per_unit': process.slices_per_unit,
						'slices_per_package': process.slices_per_package,
						'grams_per_package': process.grams_per_package
					})
