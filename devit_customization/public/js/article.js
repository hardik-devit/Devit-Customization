frappe.ui.form.on('Item', {
    refresh: function(frm) {

        if (frappe.boot.lang == 'de'){
            frm.page.set_title(frm.doc.article_name_german)
        }
        if (frappe.boot.lang == 'it'){
            frm.page.set_title(frm.doc.article_name_italien)
        }
        else{
            frm.page.set_title(frm.doc.article_name_english)
        }
        frm.trigger('set_mandatory_fields');

		frm.toggle_display(['netto_weight_in_kg'], frm.doc.article_type == "test");
    },

    article_type(frm){
        frm.toggle_display(['netto_weight_in_kg'], frm.doc.article_type == "test");
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    }
})
