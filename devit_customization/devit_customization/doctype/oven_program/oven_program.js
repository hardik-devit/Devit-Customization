// Copyright (c) 2022, Hardik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Oven Program', {
	 refresh: function(frm) {
        if(!frm.doc.id)
            frm.trigger('set_mandatory_fields');
	 },
    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_oven_id').then(res => {
			if (res.message){
		        frm.set_value("id", parseInt(res.message));
			}
		});
    }
});
