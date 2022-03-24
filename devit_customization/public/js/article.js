frappe.ui.form.on('Item', {
    refresh(frm) {
        frm.trigger('set_mandatory_fields');
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    }
})
