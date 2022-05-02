
frappe.ui.form.on('Item', {
    refresh: function(frm) {
        frm.dashboard.hide();

        if (frappe.boot.lang == 'de'){
            frm.page.set_title(frm.doc.article_name_german)
        }
        if (frappe.boot.lang == 'it'){
            frm.page.set_title(frm.doc.article_name_italien)
        }
        else{
            frm.page.set_title(frm.doc.article_name_english)
        }
        if(!frm.doc.item_code)
            frm.trigger('set_mandatory_fields');

		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], ["Finished good", "Fertigware", "Beendet gut", "Fertigwaren"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type));
        frm.toggle_display(['brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley'], ["Finished good", "Fertigware", "Beendet gut", "Fertigwaren"].includes(frm.doc.article_type));
        frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], ["Dough", "Teig", "Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type));
        frm.toggle_display(['unit_measure'], ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type));
        frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], ["Finished good", "Beendet gut", "Fertigware", "Fertigwaren"].includes(frm.doc.article_type) || ["Dough", "Teig"].includes(frm.doc.article_type) || ["Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type));
        frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], !["Raw material", "Rohmaterial", "Rohstoffe", "Dough", "Teig", "Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type))
        frm.toggle_enable(['kjoule', 'kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], ["Raw material", "Rohmaterial", "Rohstoffe"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type));
        frm.toggle_enable(['whereof_sugar_custom', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], !["Finished good", "Fertigware", "Fertigwaren", "Beendet gut"].includes(frm.doc.article_type) && !["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type) && !["Dough", "Teig"].includes(frm.doc.article_type) && !["Raw material", "Rohmaterial", "Rohstoffe"].includes(frm.doc.article_type) && !["Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type))
        frm.toggle_enable(['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], ["Raw material", "Rohmaterial", "Rohstoffe"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type))
        frm.toggle_display(['buffer_quantity', 'recipe_html'], ["Dough", "Teig"].includes(frm.doc.article_type) || ["Finished good", "Beendet gut", "Fertigware", "Fertigwaren"].includes(frm.doc.article_type) || ["Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type))
        frm.toggle_display(['production_process_html'], !["Raw material", "Rohmaterial", "Rohstoffe", "Structural goods", "Beni strutturali"].includes(frm.doc.article_type))
        frm.toggle_display(['recipe_html'], !["Retail good", "Einzelhandelswaren", "Raw material", "Rohmaterial", "Rohstoffe", "Structural goods", "Beni strutturali"].includes(frm.doc.article_type))
        frm.toggle_display(['kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium', 'whereof_sugar_custom', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium', 'gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], !["Structural goods", "Beni strutturali"].includes(frm.doc.article_type));
        let wrapper = frm.fields_dict.recipe_html.wrapper;
        new recipe(wrapper);
        if (!frm.doc.__islocal) {
			frm.set_df_property('item_code', 'hidden', 0);
		};
        frm.set_df_property('active_recipe_version', 'hidden', 1);
        frm.set_df_property('selected_recipe_version', 'hidden', 1);
        frm.set_df_property('show_options_recipe', 'hidden', 1);
        frm.set_df_property('select_option_recipe', 'hidden', 1);
        frm.set_df_property('recipe_variant_1', 'hidden', 1);
        frm.set_df_property('recipe_variant_2', 'hidden', 1);
        frm.set_df_property('recipe_variant_3', 'hidden', 1);
        frm.set_df_property('recipe_variant_4', 'hidden', 1);
    },

    onload: function(frm) {
        frm.dashboard.hide();
        frm.trigger('set_attributes_data');
    },

    article_type(frm){
		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], ["Finished good", "Fertigware", "Beendet gut", "Fertigwaren"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type));
        frm.toggle_display(['brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley'], ["Finished good", "Fertigware", "Beendet gut", "Fertigwaren"].includes(frm.doc.article_type));
        frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], ["Dough", "Teig", "Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type));
        frm.toggle_display(['unit_measure'], ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type));
        frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], ["Finished good", "Beendet gut", "Fertigware", "Fertigwaren"].includes(frm.doc.article_type) || ["Dough", "Teig"].includes(frm.doc.article_type) || ["Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type));
        frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], !["Raw material", "Rohmaterial", "Rohstoffe", "Dough", "Teig", "Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type))
        frm.toggle_enable(['kjoule', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], ["Raw material", "Rohmaterial", "Rohstoffe"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type));
        frm.toggle_enable(['whereof_sugar_custom', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], !["Finished good", "Fertigware", "Beendet gut", "Fertigwaren"].includes(frm.doc.article_type) && !["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type) && !["Dough", "Teig"].includes(frm.doc.article_type) && !["Raw material", "Rohmaterial", "Rohstoffe"].includes(frm.doc.article_type) && !["Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type))
        frm.toggle_enable(['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], ["Raw material", "Rohmaterial", "Rohstoffe"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelswaren"].includes(frm.doc.article_type))
        frm.toggle_display(['buffer_quantity', 'recipe_html'], ["Dough", "Teig"].includes(frm.doc.article_type) || ["Finished good", "Beendet gut", "Fertigware", "Fertigwaren"].includes(frm.doc.article_type) || ["Half-finished goods", "Merci finite a metà"].includes(frm.doc.article_type))
        frm.toggle_display(['production_process_html'], !["Raw material", "Rohmaterial", "Rohstoffe", "Structural goods", "Beni strutturali"].includes(frm.doc.article_type))
        frm.toggle_display(['recipe_html'], !["Retail good", "Einzelhandelswaren", "Raw material", "Rohmaterial", "Rohstoffe", "Structural goods", "Beni strutturali"].includes(frm.doc.article_type))
        frm.toggle_display(['kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium', 'whereof_sugar_custom', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium', 'gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], !["Structural goods", "Beni strutturali"].includes(frm.doc.article_type));

    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res.message){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    },

    before_save(frm) {
        frm.trigger('set_attributes_data');
        if(frm.update_recipe) {
            frappe.call({
                method: 'devit_customization.utils.update_recipe_edit',
                args: {
                    active_recipe_version: frm.doc.active_recipe_version,
                    selected_recipe_version: frm.doc.selected_recipe_version
                }
            })
        }
    },

    set_attributes_data(frm){
        let global_ps_kcal_slice = 0;
        let global_ps_protein_custom = 0; let global_ps_carbohydrates_custom = 0; let global_ps_fibre_custom = 0;
        let global_ps_fat_custom = 0; let global_ps_whereof_saturated_fat_custom = 0; let global_ps_salt_custom = 0;
        let global_ps_whereof_sugar_custom = 0; let global_iron = 0; let global_zinc = 0; let global_calcium = 0;
        let global_magnesium = 0; let global_iodine = 0; let global_fluoride = 0; let global_potassium = 0;

        if(frm.doc.brutto_weight_in_kg && frm.doc.article_type == 'Fertigwaren') {
            global_ps_kcal_slice = frm.doc.kcal * frm.doc.brutto_weight_in_kg / 100
            global_ps_protein_custom = frm.doc.protein * frm.doc.brutto_weight_in_kg / 100
            global_ps_carbohydrates_custom = frm.doc.carbohydrates * frm.doc.brutto_weight_in_kg / 100
            global_ps_fibre_custom = frm.doc.fibre * frm.doc.brutto_weight_in_kg / 100
            global_ps_fat_custom = frm.doc.fat * frm.doc.brutto_weight_in_kg / 100
            global_ps_whereof_saturated_fat_custom = frm.doc.whereof_saturated_fat * frm.doc.brutto_weight_in_kg / 100
            global_ps_salt_custom = frm.doc.salt * frm.doc.brutto_weight_in_kg / 100
            global_ps_whereof_sugar_custom = frm.doc.whereof_sugar * frm.doc.brutto_weight_in_kg / 100

            global_iron = frm.doc.iron_per_100g * frm.doc.brutto_weight_in_kg / 100
            global_zinc = frm.doc.zinc_per_100g * frm.doc.brutto_weight_in_kg / 100
            global_calcium = frm.doc.calcium_per_100g * frm.doc.brutto_weight_in_kg / 100
            global_magnesium = frm.doc.magnesium_per_100g * frm.doc.brutto_weight_in_kg / 100
            global_iodine = frm.doc.iodine_per_100g * frm.doc.brutto_weight_in_kg / 100
            global_fluoride = frm.doc.fluoride_per_100g * frm.doc.brutto_weight_in_kg / 100
            global_potassium = frm.doc.potassium_per_100g * frm.doc.brutto_weight_in_kg / 100

            cur_frm.set_value("kcal_slice", global_ps_kcal_slice);
            cur_frm.set_value("protein_custom", global_ps_protein_custom);
            cur_frm.set_value("carbohydrates_custom", global_ps_carbohydrates_custom);
            cur_frm.set_value("fibre_custom", global_ps_fibre_custom);
            cur_frm.set_value("fat_custom", global_ps_fat_custom);
            cur_frm.set_value("whereof_saturated_fat_custom", global_ps_whereof_saturated_fat_custom);
            cur_frm.set_value("salt_custom", global_ps_salt_custom);
            cur_frm.set_value("whereof_sugar_custom", global_ps_whereof_sugar_custom);

            cur_frm.set_value("iron", global_iron);
            cur_frm.set_value("zinc", global_zinc);
            cur_frm.set_value("calcium", global_calcium);
            cur_frm.set_value("magnesium", global_magnesium);
            cur_frm.set_value("iodine", global_iodine);
            cur_frm.set_value("fluoride", global_fluoride);
            cur_frm.set_value("potassium", global_potassium);
        }
        if(frm.doc.package_amount_in_kg && frm.doc.article_type == 'Einzelhandelswaren') {
            global_ps_kcal_slice = frm.doc.kcal * frm.doc.package_amount_in_kg / 100
            global_ps_protein_custom = frm.doc.protein * frm.doc.package_amount_in_kg / 100
            global_ps_carbohydrates_custom = frm.doc.carbohydrates * frm.doc.package_amount_in_kg / 100
            global_ps_fibre_custom = frm.doc.fibre * frm.doc.package_amount_in_kg / 100
            global_ps_fat_custom = frm.doc.fat * frm.doc.package_amount_in_kg / 100
            global_ps_whereof_saturated_fat_custom = frm.doc.whereof_saturated_fat * frm.doc.package_amount_in_kg / 100
            global_ps_salt_custom = frm.doc.salt * frm.doc.package_amount_in_kg / 100
            global_ps_whereof_sugar_custom = frm.doc.whereof_sugar * frm.doc.package_amount_in_kg / 100

            global_iron = frm.doc.iron_per_100g * frm.doc.package_amount_in_kg / 100
            global_zinc = frm.doc.zinc_per_100g * frm.doc.package_amount_in_kg / 100
            global_calcium = frm.doc.calcium_per_100g * frm.doc.package_amount_in_kg / 100
            global_magnesium = frm.doc.magnesium_per_100g * frm.doc.package_amount_in_kg / 100
            global_iodine = frm.doc.iodine_per_100g * frm.doc.package_amount_in_kg / 100
            global_fluoride = frm.doc.fluoride_per_100g * frm.doc.package_amount_in_kg / 100
            global_potassium = frm.doc.potassium_per_100g * frm.doc.package_amount_in_kg / 100

            cur_frm.set_value("kcal_slice", global_ps_kcal_slice);
            cur_frm.set_value("protein_custom", global_ps_protein_custom);
            cur_frm.set_value("carbohydrates_custom", global_ps_carbohydrates_custom);
            cur_frm.set_value("fibre_custom", global_ps_fibre_custom);
            cur_frm.set_value("fat_custom", global_ps_fat_custom);
            cur_frm.set_value("whereof_saturated_fat_custom", global_ps_whereof_saturated_fat_custom);
            cur_frm.set_value("salt_custom", global_ps_salt_custom);
            cur_frm.set_value("whereof_sugar_custom", global_ps_whereof_sugar_custom);

            cur_frm.set_value("iron", global_iron);
            cur_frm.set_value("zinc", global_zinc);
            cur_frm.set_value("calcium", global_calcium);
            cur_frm.set_value("magnesium", global_magnesium);
            cur_frm.set_value("iodine", global_iodine);
            cur_frm.set_value("fluoride", global_fluoride);
            cur_frm.set_value("potassium", global_potassium);

        }
        if(["Dough", "Teig", "Finished good", "Beendet gut", "Fertigware", "Fertigwaren"].includes(frm.doc.article_type)) {
            if (frm.doc.active_recipe_version) {
                frappe.call({
                    method: 'devit_customization.utils.get_recipe_detail',
                    args: {
                        item_code: frm.doc.active_recipe_version,
                        version: frm.doc.active_recipe_version
                    },
                    freeze: true,
                    callback: (r) => {
                        let global_total_amount_in_grams = 0;
                        r.message.items.map(item => {
                            global_total_amount_in_grams += item.amount_in_grams
                        });
                        frappe.call({
                            method: 'devit_customization.utils.set_attributes_calculation',
                            args: {
                                total_in_grams: global_total_amount_in_grams,
                                lines: r.message.items
                            },
                            callback: function(r) {
                                if(r.message) {
                                    cur_frm.set_value("kjoule", r.message.global_kjoule);
                                    cur_frm.set_value("kcal", r.message.global_kcal);
                                    cur_frm.set_value("fat", r.message.global_fat);
                                    cur_frm.set_value("protein", r.message.global_protein);
                                    cur_frm.set_value("carbohydrates", r.message.global_carbohydrates);
                                    cur_frm.set_value("whereof_sugar", r.message.global_whereof_sugar);
                                    cur_frm.set_value("whereof_saturated_fat", r.message.global_whereof_saturated_fat);
                                    cur_frm.set_value("salt", r.message.global_salt);
                                    cur_frm.set_value("fibre", r.message.global_fibre);
                                    cur_frm.set_value("iron_per_100g", r.message.global_iron_per_100g);
                                    cur_frm.set_value("zinc_per_100g", r.message.global_zinc_per_100g);
                                    cur_frm.set_value("calcium_per_100g", r.message.global_calcium_per_100g);
                                    cur_frm.set_value("magnesium_per_100g", r.message.global_magnesium_per_100g);
                                    cur_frm.set_value("iodine_per_100g", r.message.global_iodine_per_100g);
                                    cur_frm.set_value("fluoride_per_100g", r.message.global_fluoride_per_100g);
                                    cur_frm.set_value("potassium_per_100g", r.message.global_potassium_per_100g);
                                }
                            }
                        })
                        frappe.call({
                            method: 'devit_customization.utils.set_attributes_allergens',
                            args: {
                                lines: r.message.items
                            },
                            callback: function(r) {
                                if(r.message) {
                                    let allergens_list = ['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites',
                                   'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270',
                                   'e_300', 'e_330', 'sol', 'leach', 'vegan', 'vegeterian']
                                    for(let i=0; i < allergens_list.length; i++) {
                                        cur_frm.set_value(allergens_list[i], r.message[allergens_list[i]]);
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }
    },
})

var recipe = class ArticleRecipe {
    constructor(parent) {
        this.wrapper = $(parent).empty();
        this.active_recipe = {};
        this.make();
        if (cur_frm.doc.selected_recipe_version) {
            this.select_field.set_value(cur_frm.doc.selected_recipe_version);
        }
        if (cur_frm.doc.active_recipe_version) {
            this.active_field.set_value(cur_frm.doc.active_recipe_version);
        }
        else {
            this.get_active_receipe();
        }
        if (cur_frm.doc.show_options_recipe) {
            this.show_option.set_value(cur_frm.doc.show_options_recipe);
            this.select_option.set_value(cur_frm.doc.select_option_recipe);
            this.variant_1.set_value(cur_frm.doc.recipe_variant_1);
            this.variant_2.set_value(cur_frm.doc.recipe_variant_2);
            this.variant_3.set_value(cur_frm.doc.recipe_variant_3);
            this.variant_4.set_value(cur_frm.doc.recipe_variant_4);
        }
    }
    make() {
        $(`<div class="container-fluid">
            <div class="row" style="align-items: center;">
                <div class="col-md-3">
                    <div class="select-group"></div>
                </div>
                <div class="col-md-3">
                    <div class="show-option"></div>
                </div>
                <div class="col-md-3">
                    <div class="select-option" style="display: none"></div>
                </div>
            </div>
            <div class="row" style="align-items: center;">
                <div class="col-md-3">
                    <div class="select-version"></div>
                </div>
                <div class="col-md-3">
                    <div class="active-version"></div>
                </div>
                <div class="col-md-3">
                    <div class="group-name"></div>
                </div>
                <div class="col-md-3">
                    <div class="add-version">
                        <button type="button" class="btn btn-default ellipsis btn-sm">
                            ${__("Add Version")}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row" style="align-items: center;">
                <div class="col-md-3"></div>
                <div class="col-md-3">
                    <div class="variant-1" style="display: none;"></div>
                    <div class="variant-2" style="display: none;"></div>
                    <div class="variant-3" style="display: none;"></div>
                    <div class="variant-4" style="display: none;"></div>
                </div>
                <div class="col-md-3">
                    <div class="group-1" style="display: none;"></div>
                    <div class="group-2" style="display: none;"></div>
                    <div class="group-3" style="display: none;"></div>
                    <div class="group-4" style="display: none;"></div>
                </div>
            </div>
            <div class="row recipe-data" style="display: none;">
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary ellipsis btn-sm add-recipe-item">
                        ${__("Add Article")}
                    </button>
                    <br><br>
                    <div class="select_version"></div>
                    <h5>Active Version:</h5>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>${__("Article Code")}</th>
                                <th>${__("Article Name")}</th>
                                <th>${__("Article Type")}</th>
                                <th>${__("Amount in grams")}</th>
                                <th>${__("Percentage")}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="active-version-class">
                            <tr>
                                <td colspan="5">${__("No records found!")}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="variant_1"></div>
                    <div class="variant_2"></div>
                    <div class="variant_3"></div>
                    <div class="variant_4"></div>
                </div>
            </div>
        </div>`).appendTo(this.wrapper);
        this.$selectVersion = this.wrapper.find('.select-version');
        this.$activeVersion = this.wrapper.find('.active-version');
        this.$GroupName = this.wrapper.find('.group-name');
        this.$SelectGroup = this.wrapper.find('.select-group');
        this.$showOption = this.wrapper.find('.show-option');
        this.$selectOption = this.wrapper.find('.select-option');
        this.$variant1 = this.wrapper.find('.variant-1');
        this.$variant2 = this.wrapper.find('.variant-2');
        this.$variant3 = this.wrapper.find('.variant-3');
        this.$variant4 = this.wrapper.find('.variant-4');
        this.$GroupName1 = this.wrapper.find('.group-1');
        this.$GroupName2 = this.wrapper.find('.group-2');
        this.$GroupName3 = this.wrapper.find('.group-3');
        this.$GroupName4 = this.wrapper.find('.group-4');

        this.setup_field();
        this.setup_add_version();
        this.setup_add_recipe_item();
    }
    setup_field(parent, df) {
        let me = this;
        let group_filter_select_version = {'item_code': cur_frm.doc.name}; let group_filter_active_version = {'recipe_item_code': cur_frm.doc.name};
        // Added Group Search Bar
        this.search_by_group_field = frappe.ui.form.make_control({
            parent: me.$SelectGroup,
            render_input: true,
            df: {
                fieldname: 'group_name',
                fieldtype: 'Link',
                options: 'Group List',
                label: __('Search By Group'),
                onchange: () => {
                    let val = me.search_by_group_field.get_value();
                    let field = me.search_by_group_field.df.fieldname;
                    let header = me.select_field.df.label
                    if(val) {
                        me.get_active_receipe(val, field, header);
                        group_filter_select_version['recipe_group'] = this.search_by_group_field.get_value();
                        group_filter_active_version['article_group'] = this.search_by_group_field.get_value();
                    }
                }
            }
        });
        // END
        this.select_field = frappe.ui.form.make_control({
            parent: me.$selectVersion,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'select_version',
                label: __("Select Version"),
                reqd: 0,
                options: "Recipe",
                default: '',
                get_query: () => {
                    let version_arr = [me.active_field.get_value()]
                    if (me.show_option == 1) {
                        let version_arr_inif = version_arr
                        for (let i = 1; i < me.select_option.get_value(); i++) {
                            let field = 'variant_' + i.toString();
                            version_arr_inif.push(me.field);
                        }
                        group_filter_select_version['name'] = ['not in', version_arr_inif];
                    } else {
                        group_filter_select_version['name'] = ['not in', version_arr];
                    }
                    return {
                        filters: group_filter_select_version
                    };
                },
                onchange: () => {
                    let val = me.select_field.get_value();
                    let field = me.select_field.df.fieldname;
                    let header = me.select_field.df.label
                    if (val) {
                        cur_frm.set_value('selected_recipe_version', this.select_field.get_value())
                        me.get_active_receipe(val, field, header);
                    } else {
                        // Hide Select version if not available
                        me.wrapper.find('.select_version').hide();
                        cur_frm.set_value('selected_recipe_version', '')
                    }
                }
            }
        });
        var default_version = '';
        if (cur_frm.doc.active_recipe_version) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'Recipe',
                    filters: {
                        name: cur_frm.doc.active_recipe_version
                    },
                    fieldname: ['version']
                },
                freeze: true,
                callback: (r) => {
                    if(r.message) {
                         default_version = r.message.version
                    }
                }
            })
        }

        this.active_field = frappe.ui.form.make_control({
            parent: me.$activeVersion,
            render_input: true,
            df: {
                fieldtype: 'Link',
                options: 'Article Version',
                fieldname: 'active_version',
                label: __("Primary Active Version"),
                reqd: 0,
                default: default_version,
                get_query: () => {
                    group_filter_active_version['name'] = ['not in', [me.variant_1.get_value(), me.select_field.get_value(), me.variant_2.get_value(), me.variant_3.get_value(), me.variant_4.get_value()]];
                    return {
                        filters: group_filter_active_version
                    };
                },
                onchange: () => {
                    let val = me.active_field.get_value();
                    let field = me.active_field.df.fieldname;
                    let header = me.active_field.df.label
                    if(val) {
                        frappe.call({
                            method: 'frappe.client.get_list',
                            args: {
                                doctype: "Recipe",
                                fields: ["name"],
                                filters: [['name', '=', val]]
                            },
                            callback: (datas) => {
                                cur_frm.set_value('active_recipe_version', datas.message[0].name)
                            }
                        })
                        me.get_active_receipe(val, field, header);
                        let current_active_version = val.split('V')[1].split('-')[1]
                        this.group_selected.set_value(current_active_version);
                    } else {
                        this.group_selected.set_value("");
                    }
                    // End
                }
            }
        });

        this.group_selected = frappe.ui.form.make_control({
            parent: me.$GroupName,
            render_input: true,
            df: {
                fieldtype: 'Data',
                fieldname: 'group_list_name',
                label: __("Group"),
                reqd: 0,
                read_only: 1
            }
        });

        this.group_1_selected = frappe.ui.form.make_control({
            parent: me.$GroupName1,
            render_input: true,
            df: {
                fieldtype: 'Data',
                fieldname: 'group_1_list_name',
                label: __("Group - Variant Active Version 1"),
                reqd: 0,
                read_only: 1
            }
        });

        this.group_2_selected = frappe.ui.form.make_control({
            parent: me.$GroupName2,
            render_input: true,
            df: {
                fieldtype: 'Data',
                fieldname: 'group_2_list_name',
                label: __("Group - Variant Active Version 2"),
                reqd: 0,
                read_only: 1
            }
        });

        this.group_3_selected = frappe.ui.form.make_control({
            parent: me.$GroupName3,
            render_input: true,
            df: {
                fieldtype: 'Data',
                fieldname: 'group_3_list_name',
                label: __("Group - Variant Active Version 3"),
                reqd: 0,
                read_only: 1
            }
        });

        this.group_4_selected = frappe.ui.form.make_control({
            parent: me.$GroupName4,
            render_input: true,
            df: {
                fieldtype: 'Data',
                fieldname: 'group_4_list_name',
                label: __("Group - Variant Active Version 4"),
                reqd: 0,
                read_only: 1
            }
        });

        this.show_option = frappe.ui.form.make_control({
            parent: me.$showOption,
            render_input: true,
            df: {
                fieldtype: 'Check',
                fieldname: 'show_option',
                label: __("Show Option"),
                reqd: 0,
                onchange: () => {
                    if (me.show_option.get_value() == 0) {
                        me.$selectOption.hide();
                        me.$variant1.hide();
                        me.$variant2.hide();
                        me.$variant3.hide();
                        me.$variant4.hide();
                        me.$GroupName1.hide();
                        me.$GroupName2.hide();
                        me.$GroupName3.hide();
                        me.$GroupName4.hide();
                    } else {
                        me.wrapper.find('.select-option').show();
//                        me.select_option.set_value("1");
                    }
                    cur_frm.set_value('show_options_recipe', this.show_option.get_value());
                },
            },
        });

        this.select_option = frappe.ui.form.make_control({
            parent: me.$selectOption,
            render_input: true,
            df: {
                fieldtype: 'Select',
                fieldname: 'select_option',
                label: __("Select Option"),
                options: ["2", "3", "4", "5"],
                reqd: 0,
                onchange: () => {
                    let val = me.select_option.get_value()
                    if (val){
                        cur_frm.set_value('select_option_recipe', this.select_option.get_value());
                        for (var i = 1; i < val; i++) {
                            let variant_class = '.variant-' + i.toString();
                            let group_class = '.group-' + i.toString();
                            me.wrapper.find(variant_class).show();
                            me.wrapper.find(group_class).show();
                        }
                        for (var j = val; j < 5; j++){
                            let table = '.variant_'+ j.toString();
                            let variant_class = '.variant-' + j.toString();
                            let group_class = '.group-' + j.toString();
                            me.wrapper.find(table).hide();
                            me.wrapper.find(variant_class).hide();
                            me.wrapper.find(group_class).hide();
                        }
                    } else {
                        cur_frm.set_value('select_option_recipe', '');
                    }
                }
            }
        });

        this.variant_1 = frappe.ui.form.make_control({
            parent: me.$variant1,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'variant_1',
                label: __("Variant Active Version 1"),
                options: 'Article Version',
                reqd: 0,
                get_query: () => {
                    let filters = {'recipe_item_code': cur_frm.doc.name, 'name': ['not in', [me.active_field.get_value(), me.select_field.get_value(), me.variant_2.get_value(), me.variant_3.get_value(), me.variant_4.get_value()]]};
                    if (this.search_by_group_field.get_value() == "") {
                        return {
                            filters: filters
                        };
                    } else {
                        filters['article_group'] = this.search_by_group_field.get_value();
                        return {
                            filters: filters
                        };
                    };
                },
                onchange: () => {
                    let val = me.variant_1.get_value();
                    let field = me.variant_1.df.fieldname;
                    let header = me.variant_1.df.label;
                    if (val) {
                        me.get_active_receipe(val, field, header);
                        let current_active_version = val.split('V')[1].split('-')[1]
                        this.group_1_selected.set_value(current_active_version);
                        cur_frm.set_value('recipe_variant_1', this.variant_1.get_value());
                    } else {
                        this.group_1_selected.set_value("");
                        me.wrapper.find('.variant_1').hide();
                        cur_frm.set_value('recipe_variant_1', '');
                    }
                }
            }
        });

        this.variant_2 = frappe.ui.form.make_control({
            parent: me.$variant2,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'variant_2',
                label: __("Variant Active Version 2"),
                options: 'Article Version',
                reqd: 0,
                get_query: () => {
                    let filters = {'recipe_item_code': cur_frm.doc.name, 'name': ['not in', [me.active_field.get_value(), me.select_field.get_value(), me.variant_1.get_value(), me.variant_3.get_value(), me.variant_4.get_value()]]};
                    if (this.search_by_group_field.get_value() == "") {
                        return {
                            filters: filters
                        };
                    } else {
                        filters['article_group'] = this.search_by_group_field.get_value();
                        return {
                            filters: filters
                        };
                    };
                },
                onchange: () => {
                    let val = me.variant_2.get_value();
                    let field = me.variant_2.df.fieldname;
                    let header = me.variant_2.df.label
                    if (val) {
                        me.get_active_receipe(val, field, header);
                        let current_active_version = val.split('V')[1].split('-')[1]
                        this.group_2_selected.set_value(current_active_version);
                        cur_frm.set_value('recipe_variant_2', this.variant_2.get_value());
                    } else {
                        this.group_2_selected.set_value("");
                        me.wrapper.find('.variant_2').hide();
                        cur_frm.set_value('recipe_variant_2', '');
                    }
                }
            }
        });

        this.variant_3 = frappe.ui.form.make_control({
            parent: me.$variant3,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'variant_3',
                label: __("Variant Active Version 3"),
                options: 'Article Version',
                reqd: 0,
                get_query: () => {
                    let filters = {'recipe_item_code': cur_frm.doc.name, 'name': ['not in', [me.active_field.get_value(), me.select_field.get_value(), me.variant_2.get_value(), me.variant_1.get_value(), me.variant_4.get_value()]]};
                    if (this.search_by_group_field.get_value() == "") {
                        return {
                            filters: filters
                        };
                    } else {
                        filters['article_group'] = this.search_by_group_field.get_value();
                        return {
                            filters: filters
                        };
                    };
                },
                onchange: () => {
                    let val = me.variant_3.get_value();
                    let field = me.variant_3.df.fieldname;
                    let header = me.variant_3.df.label
                    if (val) {
                        me.get_active_receipe(val, field, header);
                        let current_active_version = val.split('V')[1].split('-')[1]
                        this.group_3_selected.set_value(current_active_version);
                        cur_frm.set_value('recipe_variant_3', this.variant_3.get_value());
                    } else {
                        this.group_3_selected.set_value("");
                        me.wrapper.find('.variant_3').hide();
                        cur_frm.set_value('recipe_variant_3', '');
                    }
                }
            }
        });

        this.variant_4 = frappe.ui.form.make_control({
            parent: me.$variant4,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'variant_4',
                label: __("Variant Active Version 4"),
                options: 'Article Version',
                reqd: 0,
                get_query: () => {
                    let filters = {'recipe_item_code': cur_frm.doc.name, 'name': ['not in', [me.active_field.get_value(), me.select_field.get_value(), me.variant_2.get_value(), me.variant_3.get_value(), me.variant_1.get_value()]]};
                    if (this.search_by_group_field.get_value() == "") {
                        return {
                            filters: filters
                        };
                    } else {
                        filters['article_group'] = this.search_by_group_field.get_value();
                        return {
                            filters: filters
                        };
                    };
                },
                onchange: () => {
                    let val = me.variant_4.get_value();
                    let field = me.variant_4.df.fieldname;
                    let header = me.variant_4.df.label
                    if (val) {
                        me.get_active_receipe(val, field, header);
                        let current_active_version = val.split('V')[1].split('-')[1]
                        this.group_4_selected.set_value(current_active_version);
                        cur_frm.set_value('recipe_variant_4', this.variant_4.get_value());
                    } else {
                        this.group_4_selected.set_value("");
                        me.wrapper.find('.variant_4').hide();
                        cur_frm.set_value('recipe_variant_4', '');
                    }
                }
            }
        });

        this.active_field.set_value('');
    }

    setup_add_version() {
        let me = this;
        this.wrapper.find('.add-version button').click(() => {
            let d = new frappe.ui.Dialog({
                title: __("Add New Version"),
                fields: [
                    {
                        fieldname: 'group_name',
                        fieldtype: 'Link',
                        options: 'Group List',
                        label: __('Group'),
                        reqd: 1,
                        onchange: function() {
                            if (d.fields_dict.version.value == 'V1' || d.fields_dict.group_name.value == ''){
                                d.set_df_property("base_version", "read_only", 1);
                            }
                            else{
                                d.set_df_property("base_version","read_only", 0);
                            }
                            if (d.fields_dict.group_name && d.fields_dict.group_name.value) {
                                frappe.call({
                                    method: 'devit_customization.utils.get_last_version',
                                    args: {
                                        'current_item_code': cur_frm.doc.name,
                                        'selected_group': d.fields_dict.group_name.value,
                                    },
                                    callback: (datas) => {
                                        if (datas.message.version == 'V1') {
                                            d.set_value('base_version', '');
                                            d.set_df_property('base_version', "read_only", 1);
                                            d.set_value('version', cur_frm.doc.name + '-' + datas.message.version + '-' + d.fields_dict.group_name.value);
                                        }
                                        else {
                                            d.set_df_property('base_version', "read_only", 0);
                                            d.set_value('version',cur_frm.doc.name + '-' + 'V' + datas.message.version + '-' + d.fields_dict.group_name.value);
                                            d.set_value('base_version',cur_frm.doc.name + '-' + 'V' + datas.message.base_version + '-' + d.fields_dict.group_name.value);
                                        }
                                    }
                                })
                            }
						}
                    },
                    {
                        "fieldname": "base_version",
                        "fieldtype": "Link",
                        "options": "Article Version",
                        "label": __("Base Version"),
                        "reqd": 0,
                        "get_query": () => {
                            return {
                                filters: {
                                    'recipe_item_code': cur_frm.doc.name,
                                    'article_group': d.fields_dict.group_name.value,
                                }
                            }
                        }
                    },
                    {
                        "fieldname": "version",
                        "fieldtype": "Data",
                        "label": __("Version"),
                        "reqd": 1,
			            "read_only": 1
                    },
                    {
                        "fieldname":"calculation_based_on",
                        "label": __("Calculation Based On"),
                        "fieldtype": "Select",
                        "options": ["Amount In Grams", "Percentage"],
                        "default": "Percentage",
                        "reqd": 1
                    },
                    {
                        "fieldname":"total_amount",
                        "label": __("Total Amount"),
                        "fieldtype": "Int",
                        "mandatory_depends_on": "eval:doc.calculation_based_on=='Percentage'",
                        "read_only_depends_on": "eval:doc.calculation_based_on=='Amount In Grams'",
                    }
                ],

                primary_action_label: __("Save"),
                primary_action(values) {
                    frappe.call({
                        method: 'devit_customization.utils.insert_recipe',
                        args: {
                            'item_code': cur_frm.doc.name,
                            'version': values.version,
                            'base_version': values.base_version,
                            'group':values.group_name,
                            'article_version_id':  values.version,
                            'calculation_based_on': values.calculation_based_on,
                            'total_amount': values.total_amount
                        },
                        freeze: true,
                        callback: (r) => {
                            if(r.message) {
                                me.active_recipe = r.message;
                                if(me.active_recipe) {
                                    if (!values.base_version) {
                                        cur_frm.set_value('active_recipe_version', r.message.name)
                                        me.active_field.set_value(r.message.version);
                                        me.select_field.set_value('');
                                    } else {
                                        cur_frm.set_value('selected_recipe_version', r.message.name)
                                        me.select_field.set_value(r.message.name);
                                        me.active_recipe = r.message;
                                    }
//                                    if (!me.active_field) {
//                                        me.active_field.set_value(r.message.name);
////                                        me.select_field.set_value(r.message.name);
//                                    } else {
//                                        me.select_field.set_value(r.message.version);
//                                    }
                                    me.wrapper.find('.recipe-data').show();
                                    if(!me.active_recipe.allow_item_edit)
                                        me.wrapper.find('.recipe-data .add-recipe-item').hide();
                                    else
                                        me.wrapper.find('.recipe-data .add-recipe-item').show();
                                    me.setup_recipe_items();
                                }
                            }
                            d.hide();
                        }
                    })
                }
            });
            d.show();
            if (!me.active_recipe || !me.active_recipe.version || !d.fields_dict.group_name.value) {
                d.set_value('version', '');
            }
        })
    }
    get_active_receipe(version, current_field, header) {
        let me = this;
        frappe.call({
            method: 'devit_customization.utils.get_recipe_detail',
            args: {
                item_code: cur_frm.doc.name,
                version: version
            },
            callback: function(r) {
                if(r.message) {
                    me.active_recipe = r.message;
                    if(me.active_recipe) {
                        if(!version) {
//                            me.active_field.set_value(cur_frm.doc.active_recipe_version);
//                            me.select_field.set_value(r.message.version);
                              me.active_field.set_value(r.message.version);
                        }
                        console.log("\n=====current_field", current_field)
                        if(current_field != "active_version") {
                            let table = "." + current_field
                            console.log("\n=====current_field", me.wrapper.find(table))
                            let tbody = current_field
                            let tbody_id = "#" + tbody
                            me.wrapper.find(table).show();
                            me.wrapper.find(table).html(`
                                <h5>${header}:11</h5>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>${__("Article Code")}</th>
                                            <th>${__("Article Name")}</th>
                                            <th>${__("Article Type")}</th>
                                            <th>${__("Amount in grams")}</th>
                                            <th>${__("Percentage")}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id=${tbody}>
                                    </tbody>
                                </table>
                            `);
                            let total_grams = 0;
                            let total_percentage = 0;
                            if(me.active_recipe.items && me.active_recipe.items.length > 0) {
                                me.active_recipe.items.map(item => {
                                    total_grams += parseFloat(item.amount_in_grams)
                                    total_percentage += item.percentage
                                    let row = $(`<tr data-id="${item.name}" data-idx="${item.idx}">
                                        <td>${item.item_code}</td>
                                        <td>${item.item_name}</td>
                                        <td>${item.article_type}</td>
                                        <td class="text-right">${item.amount_in_grams}</td>
                                        <td class="text-right">${item.percentage}</td>
                                        <td>${''}</td>
                                    </tr>`);
                                    me.wrapper.find(tbody_id).append(row);
                                });
                            }
                            me.wrapper.find(tbody_id).append(`<tr>
                                <td><b>${__("Total")}</b></td>
                                <td></td>
                                <td></td>
                                <td class="text-right"><b>${total_grams}</b></td>
                                <td class="text-right"><b>${total_percentage}</b></td>
                                <td style="width: 15%;padding: 10px;"></td>
                            </tr>`);
                        } else if (current_field == "active_version") {
                            me.wrapper.find('.recipe-data').show();
                            me.wrapper.find('.select_version').show();
                            me.wrapper.find('.variant_1').hide();
                            me.wrapper.find('.variant_2').hide();
                            me.wrapper.find('.variant_3').hide();
                            me.wrapper.find('.variant_4').hide();
                            if(!me.active_recipe.allow_item_edit) {
                                me.wrapper.find('.recipe-data .add-recipe-item').hide();
                            } else {
                                me.wrapper.find('.recipe-data .add-recipe-item').show();
                            }
                            me.setup_recipe_items();
                        }
                    }
                }
            }
        })
    }

    setup_recipe_items() {
        if(this.active_recipe.items && this.active_recipe.items.length > 0) {
            this.wrapper.find('.active-version-class').html('');
            var total_grams = 0;
            let total_percentage = 0;
            this.active_recipe.items.map(item => {
                total_grams += parseFloat(item.amount_in_grams)
                total_percentage += item.percentage
                let btn = `<button id="btn_edit" class="btn btn-warning btn-sm">${__("Edit")}</button>
                        <button id="btn_delete" class="btn btn-danger btn-sm">${__("Delete")}</button>`;
                let row = $(`<tr data-id="${item.name}" data-idx="${item.idx}">
                        <td>${item.item_code}</td>
                        <td>${item.item_name}</td>
                        <td>${item.article_type}</td>
                        <td class="text-right">${item.amount_in_grams}</td>
                        <td class="text-right">${item.percentage}</td>
                        <td style="width: 15%;padding: 10px;vertical-align: middle;">
                            ${this.active_recipe.allow_item_edit == 1 ? btn : ''}
                        </td>
                    </tr>`);
                row.find('#btn_edit').click(() => {
                    let _row_html = this.section_fields(item, 'devit_customization.utils.update_recipe_item', 'edit');
                    this.wrapper.find('.active-version-class tr[data-id="' + item.name +'"]').html(_row_html);
                })
                row.find('#btn_delete').click(() => {
                    frappe.confirm(__("Do you really want to delete this item?"),
                        () => {
                            // Start Delete Calculation
                        let total_grams_value = 0;
                        for (var i = 0; i < this.active_recipe.items.length; i++) {
                            let each = this.active_recipe.items[i];
                            if (each.item_code != item.item_code) {
                                total_grams_value = total_grams_value + each.amount_in_grams;
                            }
                        }
                        let new_values = [];
                        for (var i = 0; i < this.active_recipe.items.length; i++) {
                            let each = this.active_recipe.items[i];
                            let amount_grams = 0; let percentage = 0;
                            if (each.item_code != item.item_code) {
                                if (this.active_recipe.calculation_based_on == "Percentage") {
                                    amount_grams = (this.active_recipe.total_amount * each.percentage) / 100;
                                    percentage = each.percentage;
                                } else {
                                    percentage = (100 * each.amount_in_grams) / total_grams_value;
                                    amount_grams = each.amount_in_grams;
                                }
                                let each_value = {
                                    'item_code': each.item_code,
                                    'item_name': each.item_name,
                                    'article_type': each.article_type,
                                    'amount_in_grams': amount_grams,
                                    'name': each.name,
                                    'parent': each.parent,
                                    'parentfield': each.parentfield,
                                    'parenttype': each.parenttype,
                                    'percentage': percentage.toFixed(3),
                                };
                                new_values.push(each_value);
                            }
                        }
                        // End Delete Calculation
                        frappe.call({
                            method: 'devit_customization.utils.delete_recipe_item',

                            args: {
                                docname: item.name,
                                parent: item.parent,
                                doc: new_values
                            },
                            freeze: true,
                            callback: (r) => {
                                if(r.message) {
                                    this.active_recipe = r.message;
                                    this.setup_recipe_items();
                                    cur_frm.update_recipe = 1;
                                }
                                else {
                                    this.active_recipe = r.message;
                                    this.setup_recipe_items();
                                    cur_frm.update_recipe = 1;
                                }
                            }
                        })
                        //  racipe Calculation on Delete
                        if (new_values.length != 0){
                            var tot_in_gram = 0;
                            for (let each = 0; each < new_values.length; each++) {
                                tot_in_gram += new_values[each].amount_in_grams
                            }
                            let rm_kcal = 0; let total_kcal = 0;
                            for (let i = 0; i < new_values.length; i++) {
                                frappe.call({
                                    method: 'devit_customization.utils.set_attributes_calculation',
                                    args: {
                                        total_in_grams: tot_in_gram,
                                        lines: new_values
                                    },
                                    callback: function(r) {
                                        if(r.message) {
                                            cur_frm.set_value("kcal", r.message.global_kcal);
                                            cur_frm.set_value("fat", r.message.global_fat);
                                            cur_frm.set_value("protein", r.message.global_protein);
                                            cur_frm.set_value("carbohydrates", r.message.global_carbohydrates);
                                            cur_frm.set_value("whereof_sugar", r.message.global_whereof_sugar);
                                            cur_frm.set_value("whereof_saturated_fat", r.message.global_whereof_saturated_fat);
                                            cur_frm.set_value("salt", r.message.global_salt);
                                            cur_frm.set_value("fibre", r.message.global_fibre);
                                            cur_frm.set_value("iron_per_100g", r.message.global_iron_per_100g);
                                            cur_frm.set_value("zinc_per_100g", r.message.global_zinc_per_100g);
                                            cur_frm.set_value("calcium_per_100g", r.message.global_calcium_per_100g);
                                            cur_frm.set_value("magnesium_per_100g", r.message.global_magnesium_per_100g);
                                            cur_frm.set_value("iodine_per_100g", r.message.global_iodine_per_100g);
                                            cur_frm.set_value("fluoride_per_100g", r.message.global_fluoride_per_100g);
                                            cur_frm.set_value("potassium_per_100g", r.message.global_potassium_per_100g);
                                        }
                                    }
                                })
                                frappe.call({
                                    method: 'devit_customization.utils.set_attributes_allergens',
                                    args: {
                                        lines: new_values
                                    },
                                    callback: function(r) {
                                        if(r.message) {
                                            let allergens_list = ['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites',
                               'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270',
                               'e_300', 'e_330', 'sol', 'leach', 'vegan', 'vegeterian']
                                            for(let i=0; i < allergens_list.length; i++) {
                                                cur_frm.set_value(allergens_list[i], r.message[allergens_list[i]]);
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        if (new_values.length == 0){
                            let all_field_list = ['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites',
                               'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270',
                               'e_300', 'e_330', 'sol', 'leach', 'vegan', 'vegeterian', 'kjoule', 'kcal', 'fat', 'protein', 'carbohydrates',
                               'whereof_sugar', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g',
                               'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g']
                               for(let i=0; i < all_field_list.length; i++) {
                                    cur_frm.set_value(all_field_list[i], 0);
                                }
                        }
                        }
                    )
                })
                this.wrapper.find('.active-version-class').append(row);
            });
            if (total_percentage >= 99.50 && total_percentage <= 100.50) {
                total_percentage = 100;
            }
            if (this.active_recipe.calculation_based_on == "Percentage") {
                if (total_grams != this.active_recipe.total_amount) {
                    this.wrapper.find('.active-version-class').append(`<tr style="background-color:#ffb630;">
                        <td><b>${__("Total")}</b></td>
                        <td></td>
                        <td></td>
                        <td class="text-right"><b>${this.active_recipe.total_amount}</b></td>
                        <td class="text-right"><b>${total_percentage}</b></td>
                        <td></td>
                    </tr>`);
                }
                else {
                    this.wrapper.find('.active-version-class').append(`<tr>
                        <td><b>${__("Total")}</b></td>
                        <td></td>
                        <td></td>
                        <td class="text-right"><b>${total_grams}</b></td>
                        <td class="text-right"><b>${total_percentage}</b></td>
                        <td></td>
                    </tr>`);
                }
            } else {
                this.wrapper.find('.active-version-class').append(`<tr>
                    <td><b>${__("Total")}</b></td>
                    <td></td>
                    <td></td>
                    <td class="text-right"><b>${total_grams}</b></td>
                    <td class="text-right"><b>${total_percentage}</b></td>
                    <td></td>
                </tr>`);
            }
        } else {
            this.wrapper.find('.active-version-class').html(`<tr>
                    <td colspan="5">${__("No records found!")}</td>
                </tr>`);
        }
    }
    setup_add_recipe_item() {
        this.wrapper.find('.add-recipe-item').click(() => {
            let selected_version = this.select_field.get_value();
            let cls = '.active-version-class';
            if(selected_version) {
                cls = '#select_version'
            } else {
                if(this.active_recipe && this.active_recipe.items && this.active_recipe.items.length == 0) {
                    this.wrapper.find('.active-version-class').html('');
                }
            }
            let row = this.section_fields(null, 'devit_customization.utils.insert_recipe_item', 'add');
            let row_html = $(`<tr class="add-row"></tr>`);
            row_html.append(row);
            this.wrapper.find(cls).prepend(row_html);
        })
    }

    section_fields(values, url, type) {
        let me = this;

        let row = $(`
                <td>
                    <div data-fieldname="item_code"></div>
                </td>
                <td>
                    <div data-fieldname="item_name"></div>
                </td>
                <td>
                    <div data-fieldname="article_type"></div>
                </td>
                <td>
                    <div data-fieldname="amount_in_grams"></div>
                </td>
                <td>
                    <div data-fieldname="percentage"></div>
                </td>
                <td style="width: 15%;padding: 10px;vertical-align: middle;">
                    <button id="btn_save" class="btn btn-primary btn-sm">${__("Save")}</button>
                    <button id="btn_cancel" class="btn btn-default btn-sm">${__("Cancel")}</button>
                </td>
            `);
        let fields = {};

        recipe_item_df.map(f => {
            if(f.fieldname == 'item_code') {
                f['get_query'] = function () {
						return {
							filters: [
								["name", "!=", cur_frm.doc.name], ['article_type', "not in", ["Retail good", "Einzelhandelswaren"]]
							]
						};
					},
                f.onchange = () => {
                    frappe.call({
                        method: 'frappe.client.get_value',
                        args: {
                            doctype: 'Item',
                            filters: {
                                name: fields['item_code'].get_value()
                            },
                            fieldname: ['item_name', 'article_type', 'article_name_english']
                        },
                        freeze: true,
                        callback: (r) => {
                            if(r.message) {
                                fields['item_name'].set_value(r.message.article_name_english);
                                if(r.message.article_type)
                                    fields['article_type'].set_value(r.message.article_type);
                            }
                        }
                    })
                }
            }
            if (me.active_recipe.calculation_based_on == "Percentage" && f.fieldname == 'amount_in_grams') {
                var input = frappe.ui.form.make_control({
                    parent: row.find('div[data-fieldname="' + f.fieldname + '"]').css('pointer-events', 'none'),
                    render_input: true,
                    df: f
                });
            } else if (me.active_recipe.calculation_based_on == "Amount In Grams" && f.fieldname == 'percentage') {
                var input = frappe.ui.form.make_control({
                    parent: row.find('div[data-fieldname="' + f.fieldname + '"]').css('pointer-events', 'none'),
                    render_input: true,
                    df: f
                });
            }
            else {
                var input = frappe.ui.form.make_control({
                    parent: row.find('div[data-fieldname="' + f.fieldname + '"]'),
                    render_input: true,
                    df: f
                });
            }
            if(values && values[f.fieldname])
                input.set_value(values[f.fieldname])
            fields[f.fieldname] = input;
        });
        row.find('#btn_save').click(() => {
            if(type == 'add') {
                values = {
                    'doctype': 'Recipe Item',
                    'parent': me.active_recipe.name,
                    'parenttype': 'Recipe',
                    'parentfield': 'items',
                    '__islocal': 1,
                    '__unsaved': 1,
                    'idx': (me.active_recipe.items.length || 0) + 1
                }
            }
            let cond_checked = true;
            for(var i = 0; i < recipe_item_df.length; i++) {
                let df = recipe_item_df[i];
                values[df.fieldname] = fields[df.fieldname].get_value();
                if(df.reqd && !values[df.fieldname])
                    cond_checked = false;
            }
            let total_grams_value = 0;
            let new_values = [];
            for (var i = 0; i < me.active_recipe.items.length; i++) {
                let each = me.active_recipe.items[i];
                total_grams_value += each.amount_in_grams
            }
            // Recipe Calculation Start
            if (type == 'add') {
                if (me.active_recipe.calculation_based_on == "Percentage") {
                    let amount_grams = (me.active_recipe.total_amount * values['percentage']) / 100;
                    values['amount_in_grams'] = amount_grams;
                    new_values.push(values)
                    values = new_values
                }
                else {
                    total_grams_value = total_grams_value + values['amount_in_grams']
                    let percentage = (100 * values['amount_in_grams']) / total_grams_value;
                    values['percentage'] = percentage.toFixed(3);
                    new_values.push(values)
                    values = new_values
                }
            }
            for (var i = 0; i < me.active_recipe.items.length; i++) {
                let each = me.active_recipe.items[i];
                let amount_grams = 0; let percentage = 0;
                if (me.active_recipe.calculation_based_on == "Percentage") {
                    amount_grams = (me.active_recipe.total_amount * each.percentage) / 100;
                    percentage = each.percentage;
                } else {
                    percentage = (100 * each.amount_in_grams) / total_grams_value;
                    amount_grams = each.amount_in_grams;
                }
                let each_value = {
                    'item_code': each.item_code,
                    'item_name': each.item_name,
                    'article_type': each.article_type,
                    'amount_in_grams': amount_grams,
                    'name': each.name,
                    'parent': each.parent,
                    'parentfield': each.parentfield,
                    'parenttype': each.parenttype,
                    'percentage': percentage.toFixed(3),
                };
                new_values.push(each_value);
            }
            if (type == 'edit') {
                values = new_values;
            }
//            START - Attribute Value
            var tot_in_gram = 0;
            for (let each = 0; each < values.length; each++) {
                tot_in_gram += values[each].amount_in_grams
            }
            let rm_kcal = 0; let total_kcal = 0;
            for (let i = 0; i < values.length; i++) {
                frappe.call({
                    method: 'devit_customization.utils.set_attributes_calculation',
                    args: {
                        total_in_grams: tot_in_gram,
                        lines: values
                    },
                    callback: function(r) {
                        if(r.message) {
                            cur_frm.set_value("kcal", r.message.global_kcal);
                            cur_frm.set_value("fat", r.message.global_fat);
                            cur_frm.set_value("protein", r.message.global_protein);
                            cur_frm.set_value("carbohydrates", r.message.global_carbohydrates);
                            cur_frm.set_value("whereof_sugar", r.message.global_whereof_sugar);
                            cur_frm.set_value("whereof_saturated_fat", r.message.global_whereof_saturated_fat);
                            cur_frm.set_value("salt", r.message.global_salt);
                            cur_frm.set_value("fibre", r.message.global_fibre);
                            cur_frm.set_value("iron_per_100g", r.message.global_iron_per_100g);
                            cur_frm.set_value("zinc_per_100g", r.message.global_zinc_per_100g);
                            cur_frm.set_value("calcium_per_100g", r.message.global_calcium_per_100g);
                            cur_frm.set_value("magnesium_per_100g", r.message.global_magnesium_per_100g);
                            cur_frm.set_value("iodine_per_100g", r.message.global_iodine_per_100g);
                            cur_frm.set_value("fluoride_per_100g", r.message.global_fluoride_per_100g);
                            cur_frm.set_value("potassium_per_100g", r.message.global_potassium_per_100g);
                        }
                    }
                })
                frappe.call({
                    method: 'devit_customization.utils.set_attributes_allergens',
                    args: {
                        lines: values
                    },
                    callback: function(r) {
                        if(r.message) {
                            let allergens_list = ['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites',
               'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270',
               'e_300', 'e_330', 'sol', 'leach', 'vegan', 'vegeterian']
                            for(let i=0; i < allergens_list.length; i++) {
                                cur_frm.set_value(allergens_list[i], r.message[allergens_list[i]]);
                            }
                        }
                    }
                })
            }
//            END - Attribute Value

            if(cond_checked) {
                frappe.call({
                    method: url,
                    args: {
                        doc: JSON.stringify(values)
                    },
                    callback: (r) => {
                        if(r.message) {
                            if(type == 'add')
                                me.wrapper.find('.active-version-class tr.add-row').remove();
                            me.active_recipe = r.message;
                            me.setup_recipe_items();
                            cur_frm.update_recipe = 1;
                            cur_frm.dirty();
                        }
                    }
                })
            }
        });
        row.find('#btn_cancel').click(() => {
            if(type == 'add') {
                me.wrapper.find('.active-version-class tr.add-row').remove();
                if(me.active_recipe.items.length == 0) {
                    me.wrapper.find('.active-version-class').html(`<tr>
                            <td colspan="5">${__("No records found!")}</td>
                        </tr>`);
                }
            } else {
                me.setup_recipe_items();
            }            
        });
        return row;
    }
}

let recipe_item_df = [
    {
        'fieldname': 'item_code',
        'fieldtype': 'Link',
        'label': __('Article Code'),
        'reqd': 1,
        'options': 'Item'
    },
    {
        'fieldname': 'item_name',
        'fieldtype': 'Data',
        'label': __('Article Name')
    },
    {
        'fieldname': 'article_type',
        'fieldtype': 'Link',
        'label': __('Article Type'),
        'options': 'Article Type',
        'reqd': 1
    },
    {
        'fieldname': 'amount_in_grams',
        'fieldtype': 'Float',
        'label': __('Amount in grams'),
        'reqd': 0
    },
    {
        'fieldname': 'percentage',
        'fieldtype': 'Percent',
        'label': __('Percentage'),
        'reqd': 0
    }
]
