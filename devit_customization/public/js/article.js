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

		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], ["Finished good", "Fertigware"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
        frm.toggle_display(['netto_weight_in_kg', 'brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley', 'retours', 'retourenartikel', 'empty_retours', 'retourenanteilsberechnung'], ["Finished good", "Fertigware"].includes(frm.doc.article_type));
		frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['unit_measure'], ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], ["Finished good", "Beendet gut"].includes(frm.doc.article_type) || ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], !["Raw material", "Rohmaterial"].includes(frm.doc.article_type))
		frm.toggle_enable(['kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g', 'kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
    frm.toggle_enable(['kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], !["Finished good", "Fertigware"].includes(frm.doc.article_type) && !["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type) && !["Dough", "Teig"].includes(frm.doc.article_type) && !["Raw material", "Rohmaterial"].includes(frm.doc.article_type))
      frm.toggle_enable(['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type))
        let wrapper = frm.fields_dict.recipe_html.wrapper;
        new recipe(wrapper);
    },

    article_type(frm){
		frm.toggle_display(['discount_group', 'kg_price', 'preisschild', 'verrechnung', 'package_amount_in_kg', 'vat'], ["Finished good", "Fertigware"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
        frm.toggle_display(['netto_weight_in_kg', 'brutto_weight_in_kg', 'baked_weight_in_kg', 'nr_of_items_on_plate', 'plates_per_trolley', 'retours', 'retourenartikel', 'empty_retours', 'retourenanteilsberechnung'], ["Finished good", "Fertigware"].includes(frm.doc.article_type));
		frm.toggle_display(['minimal_production_amount', 'maximal_production_amount'], ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['unit_measure'], ['Retail good', 'Einzelhandelsware'].includes(frm.doc.article_type));
		frm.toggle_display(['purchasing_production', 'production_costs', 'replacement_in_hours'], ["Finished good", "Fertigware"].includes(frm.doc.article_type) || ["Dough", "Teig"].includes(frm.doc.article_type));
		frm.toggle_display(['average_nutritions_per_slice_', 'minerals'], ["Finished good", "Fertigware"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_enable(['kcal', 'protein', 'carbohydrates', 'whereof_sugar', 'fat', 'whereof_saturated_fat', 'salt', 'fibre', 'iron_per_100g', 'zinc_per_100g', 'calcium_per_100g', 'magnesium_per_100g', 'iodine_per_100g', 'fluoride_per_100g', 'potassium_per_100g'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type));
		frm.toggle_enable(['kcal_slice', 'protein_custom', 'carbohydrates_custom', 'fibre_custom', 'fat_custom', 'whereof_saturated_fat_custom', 'salt_custom', 'iron', 'zinc', 'calcium', 'magnesium', 'iodine', 'fluoride', 'potassium'], !["Finished good", "Fertigware"].includes(frm.doc.article_type) && !["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type) && !["Dough", "Teig"].includes(frm.doc.article_type) && !["Raw material", "Rohmaterial"].includes(frm.doc.article_type))
        frm.toggle_enable(['gluten', 'milk_or_lactose', 'lupins', 'crustaceans', 'nuts', 'molluscs', 'egg', 'celery', 'fish', 'mustard', 'peanut_', 'sesame_seeds', 'sojbeans', 'sulfur_oxide_and_sulfites', 'glute', 'milk_or_lactos', 'lupin', 'crustacean', 'nut', 'mollusc', 'eg', 'celer', 'fis', 'mustar', 'peanu', 'sesame_seed', 'sojbean', 'sulfur_oxide_and_sulfite', 'e_260', 'e_270', 'e_300', 'e_330', 'vegan', 'vegeterian', 'sol', 'leach'], ["Raw material", "Rohmaterial"].includes(frm.doc.article_type) || ["Retail good", "Einzelhandelsware"].includes(frm.doc.article_type))
    },

    set_mandatory_fields(frm) {
        frm.call('get_unique_value_for_item_code').then(res => {
			if (res){
		        frm.set_value("item_code", parseInt(res.message));
			}
		});
    },

    before_save(frm) {
        if(frm.update_recipe) {
            frappe.call({
                method: 'devit_customization.utils.update_recipe_edit',
                args: {
                    item_code: frm.doc.name,
                }
            })
        }
    }
})

var recipe = class ArticleRecipe {
    constructor(parent) {
        this.wrapper = $(parent).empty();
        this.active_recipe = {};

        this.make();
        this.get_active_receipe();
    }
    make() {
        $(`<div class="container-fluid">
            <div class="row" style="align-items: center;">
                <div class="col-md-4">
                    <div class="select-version"></div>
                </div>
                <div class="col-md-4">
                    <div class="active-version"></div>
                </div>
                <div class="col-md-4">
                    <div class="add-version">
                        <button type="button" class="btn btn-default ellipsis btn-sm">
                            ${__("Add Version")}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row recipe-data" style="display: none;">
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary ellipsis btn-sm add-recipe-item">
                        ${__("Add Article")}
                    </button>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>${__("Item Code")}</th>
                                <th>${__("Item Name")}</th>
                                <th>${__("Article Type")}</th>
                                <th>${__("Amount in grams")}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="5">${__("No records found!")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`).appendTo(this.wrapper);
        this.$selectVersion = this.wrapper.find('.select-version');
        this.$activeVersion = this.wrapper.find('.active-version');

        this.setup_field();
        this.setup_add_version();
        this.setup_add_recipe_item();
    }
    setup_field(parent, df) {
        let me = this;
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
                    return {
                        filters: {
                            'item_code': cur_frm.doc.name
                        }
                    }
                },
                onchange: () => {
                    let val = me.select_field.get_value();
                    if(val) {
                        me.get_active_receipe(val);
                    }
                }
            }
        });
        this.active_field = frappe.ui.form.make_control({
            parent: me.$activeVersion,
            render_input: true,
            df: {
                fieldtype: 'Data',
                fieldname: 'active_version',
                label: __("Active Version"),
                reqd: 0,
                read_only: 1
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
                        "fieldname": "base_version",
                        "fieldtype": "Link",
                        "options": "Article Version",
                        "label": __("Base Version"),
                        "reqd": 1
                    },
                    {
                        "fieldname": "version",
                        "fieldtype": "Data",
                        "label": __("Version"),
                        "reqd": 1
                    }
                ],
                primary_action_label: __("Save"),
                primary_action(values) {
                    frappe.call({
                        method: 'devit_customization.utils.insert_recipe',
                        args: {
                            'item_code': cur_frm.doc.name,
                            'version': values.version,
                            'base_version': values.base_version
                        },
                        freeze: true,
                        callback: (r) => {
                            if(r.message) {
                                me.active_recipe = r.message;
                                if(me.active_recipe) {
                                    me.active_field.set_value(r.message.version);
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
            if(me.active_recipe) {
                d.set_value('base_version', me.active_recipe.version);
                let current_version = me.active_recipe.version.toLowerCase().split('v')[1];
                let new_version = parseInt(current_version) + 1;
                d.set_value('version', `V${new_version}`);
            }
        })
    }
    get_active_receipe(version) {
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
                        if(!version)
                            me.active_field.set_value(r.message.version);
                        me.wrapper.find('.recipe-data').show();
                        if(!me.active_recipe.allow_item_edit) {
                            me.wrapper.find('.recipe-data .add-recipe-item').hide();
                        } else {
                            me.wrapper.find('.recipe-data .add-recipe-item').show();
                        }                            
                        me.setup_recipe_items();
                    }                        
                }
            }
        })
    }
    setup_recipe_items() {
        if(this.active_recipe.items && this.active_recipe.items.length > 0) {
            this.wrapper.find('tbody').html('');
            let total_grams = 0;
            this.active_recipe.items.map(item => {
                total_grams += parseFloat(item.amount_in_grams)
                let btn = `<button class="btn btn-warning btn-sm">${__("Edit")}</button>
                        <button class="btn btn-danger btn-sm">${__("Delete")}</button>`;
                let row = $(`<tr data-id="${item.name}" data-idx="${item.idx}">
                        <td>${item.item_code}</td>
                        <td>${item.item_name}</td>
                        <td>${item.article_type}</td>
                        <td class="text-right">${item.amount_in_grams}</td>
                        <td style="width: 15%;padding: 10px;vertical-align: middle;">
                            ${this.active_recipe.allow_item_edit == 1 ? btn : ''}
                        </td>
                    </tr>`);
                row.find('.btn-warning').click(() => {
                    let _row_html = this.section_fields(item, 'devit_customization.utils.update_recipe_item', 'edit');
                    this.wrapper.find('tbody tr[data-id="' + item.name +'"]').html(_row_html);
                })
                row.find('.btn-danger').click(() => {
                    frappe.confirm(__("Do you really want to delete this item?"),
                        () => {
                            frappe.call({
                                method: 'devit_customization.utils.delete_recipe_item',
                                args: {
                                    docname: item.name,
                                    parent: item.parent
                                },
                                freeze: true,
                                callback: (r) => {
                                    if(r.message) {
                                        this.active_recipe = r.message;
                                        this.setup_recipe_items();
                                        cur_frm.update_recipe = 1;
                                    }
                                }
                            })
                        }
                    )
                })
                this.wrapper.find('tbody').append(row);
            });
            this.wrapper.find('tbody').append(`<tr>
                <td><b>${__("Total")}</b></td>
                <td></td>
                <td></td>
                <td class="text-right"><b>${total_grams}</b></td>
                <td></td>
            </tr>`);
        } else {
            this.wrapper.find('tbody').html(`<tr>
                    <td colspan="5">${__("No records found!")}</td>
                </tr>`);
        }
    }
    setup_add_recipe_item() {
        this.wrapper.find('.add-recipe-item').click(() => {
            if(this.active_recipe && this.active_recipe.items.length == 0) {
                this.wrapper.find('tbody').html('');
            }
            let row = this.section_fields(null, 'devit_customization.utils.insert_recipe_item', 'add');
            let row_html = $(`<tr class="add-row"></tr>`);
            row_html.append(row);
            this.wrapper.find('tbody').prepend(row_html);
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
                <td style="width: 15%;padding: 10px;vertical-align: middle;">
                    <button class="btn btn-primary btn-sm">${__("Save")}</button>
                    <button class="btn btn-default btn-sm">${__("Cancel")}</button>
                </td>
            `);
        let fields = {};
        recipe_item_df.map(f => {
            if(f.fieldname == 'item_code') {
                f.onchange = () => {
                    frappe.call({
                        method: 'frappe.client.get_value',
                        args: {
                            doctype: 'Item',
                            filters: {
                                name: fields['item_code'].get_value()
                            },
                            fieldname: ['item_name', 'article_type']
                        },
                        freeze: true,
                        callback: (r) => {
                            if(r.message) {
                                fields['item_name'].set_value(r.message.item_name);
                                if(r.message.article_type)
                                    fields['article_type'].set_value(r.message.article_type);
                            }
                        }
                    })
                }
            }
            let input = frappe.ui.form.make_control({
                parent: row.find('div[data-fieldname="' + f.fieldname + '"]'),
                render_input: true,
                df: f
            });
            if(values && values[f.fieldname])
                input.set_value(values[f.fieldname])
            fields[f.fieldname] = input;
        });
        row.find('.btn-primary').click(() => {
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
            if(cond_checked) {
                frappe.call({
                    method: url,
                    args: {
                        doc: JSON.stringify(values)
                    },
                    callback: (r) => {
                        if(r.message) {
                            if(type == 'add')
                                me.wrapper.find('tbody tr.add-row').remove();
                            me.active_recipe = r.message;
                            me.setup_recipe_items();
                            cur_frm.update_recipe = 1;
                        }
                    }
                })
            }
        });
        row.find('.btn-default').click(() => {
            if(type == 'add') {
                me.wrapper.find('tbody tr.add-row').remove();
                if(me.active_recipe.items.length == 0) {
                    me.wrapper.find('tbody').html(`<tr>
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
        'label': __('Item Code'),
        'reqd': 1,
        'options': 'Item'
    },
    {
        'fieldname': 'item_name',
        'fieldtype': 'Data',
        'label': __('Item Name')
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
        'reqd': 1
    }
]