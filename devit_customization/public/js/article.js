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

		frm.toggle_display(['item_group'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good" || frm.doc.article_type == "Raw material" || frm.doc.article_type == "Dough");
		frm.toggle_display(['discount_group'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
        frm.toggle_display(['netto_weight_in_kg'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['brutto_weight_in_kg'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['baked_weight_in_kg'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['nr_of_items_on_plate'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['minimal_production_amount'], frm.doc.article_type == "Dough");
		frm.toggle_display(['maximal_production_amount'], frm.doc.article_type == "Dough");
		frm.toggle_display(['plates_per_trolley'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['amount_storage_unit'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good" || frm.doc.article_type == "Raw material" || frm.doc.article_type == "Dough");
		frm.toggle_display(['unit_measure'], frm.doc.article_type == "Retail good");
		frm.toggle_display(['kg_price'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['preisschild'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['verrechnung'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['package_amount_in_kg'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['retours'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['retourenartikel'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['empty_retours'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['retourenanteilsberechnung'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['vat'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['purchasing_production'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
		frm.toggle_display(['production_costs'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
		frm.toggle_display(['replacement_in_hours'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
    },

    article_type(frm){
		frm.toggle_display(['item_group'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good" || frm.doc.article_type == "Raw material" || frm.doc.article_type == "Dough");
		frm.toggle_display(['discount_group'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
        frm.toggle_display(['netto_weight_in_kg'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['brutto_weight_in_kg'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['baked_weight_in_kg'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['nr_of_items_on_plate'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['minimal_production_amount'], frm.doc.article_type == "Dough");
		frm.toggle_display(['maximal_production_amount'], frm.doc.article_type == "Dough");
		frm.toggle_display(['plates_per_trolley'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['amount_storage_unit'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good" || frm.doc.article_type == "Raw material" || frm.doc.article_type == "Dough");
		frm.toggle_display(['unit_measure'], frm.doc.article_type == "Retail good");
		frm.toggle_display(['kg_price'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['preisschild'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['verrechnung'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['package_amount_in_kg'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['retours'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['retourenartikel'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['empty_retours'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['retourenanteilsberechnung'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['vat'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
		frm.toggle_display(['purchasing_production'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
		frm.toggle_display(['production_costs'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
		frm.toggle_display(['replacement_in_hours'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    }
})
