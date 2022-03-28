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

		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
        frm.toggle_display(['netto_weight_in_kg', 'brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley', 'retours', 'retourenartikel', 'empty_retours', 'retourenanteilsberechnung'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], frm.doc.article_type == "Dough");
		frm.toggle_display(['unit_measure'], frm.doc.article_type == "Retail good");
		frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
		frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], frm.doc.article_type != "Raw material")
    },

    article_type(frm){
		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Retail good");
        frm.toggle_display(['netto_weight_in_kg', 'brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley', 'retours', 'retourenartikel', 'empty_retours', 'retourenanteilsberechnung'], frm.doc.article_type == "Finished good");
		frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], frm.doc.article_type == "Dough");
		frm.toggle_display(['unit_measure'], frm.doc.article_type == "Retail good");
		frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], frm.doc.article_type == "Finished good" || frm.doc.article_type == "Dough");
		frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], frm.doc.article_type != "Raw material")
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    }
})
