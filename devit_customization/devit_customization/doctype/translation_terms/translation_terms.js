// Copyright (c) 2022, Hardik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Translation Terms', {
	refresh: function(frm) {
		frm.set_query('sub_module', (doc) => {
			return {
				'filters': {
					'module': frm.doc.module_name
				}
			}
		});
		// $("[data-fieldname='module_name'").attr("title", "Represent module name for record set of translation terms.");
	}
});