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

		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
        frm.toggle_display(['netto_weight_in_kg', 'brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley', 'retours', 'retourenartikel', 'empty_retours', 'retourenanteilsberechnung'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type));
		frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['unit_measure'], ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_enable(['kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_enable(['kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], !["Finished good", "Beendet gut"].includes(frm.doc.article_type) && !["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type) && !["Dough", "Teig"].includes(frm.doc.article_type) && !["Raw material", "Rohmaterial"].includes(frm.doc.article_type))
        frm.toggle_enable(['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type))
    },

    article_type(frm){
		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
        frm.toggle_display(['netto_weight_in_kg', 'brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley', 'retours', 'retourenartikel', 'empty_retours', 'retourenanteilsberechnung'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type));
		frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['unit_measure'], ['Retail good', 'Einzelhandelsware'].includes(frm.doc.article_type));
		frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_enable(['kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_enable(['kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], !["Finished good", "Beendet gut"].includes(frm.doc.article_type) && !["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type) && !["Dough", "Teig"].includes(frm.doc.article_type) && !["Raw material", "Rohmaterial"].includes(frm.doc.article_type))
        frm.toggle_enable(['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type))
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    }
})
