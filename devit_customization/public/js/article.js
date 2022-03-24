frappe.ui.form.on('Item', {
    refresh: function(frm) {
        frm.trigger('set_mandatory_fields');
        console.log("\n========frm.doc.article_name_german>>", frm.doc)
		frm.toggle_display('netto_weight_in_kg', frm.doc. == "test");
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    }
})
