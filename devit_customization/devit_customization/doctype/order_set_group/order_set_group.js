// Copyright (c) 2022, Hardik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Order Set Group', {
    onload: function(frm) {
        frm.get_field("order_sets").grid.cannot_add_rows = true;
        var df = frappe.meta.get_docfield("Order Set Table", "order_set_name", cur_frm.doc.name);
        df.read_only = 1;
    },
    refresh_button(frm) {
        let frm_list = frm.doc.order_sets;
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Order Sets',
                fields: ['*']
            },
            freeze: true,
            callback: (r) => {
                if(r.message) {
                    frm.doc.order_sets = []
                    if (frm.doc.order_sets) {
                        for (let i = 0; i < r.message.length; i++) {
                            let table = frm.add_child('order_sets')
                            table.order_set_ref = r.message[i]['name']
                            table.order_set_id = r.message[i]['order_set_id']
                            table.order_set_name = r.message[i]['order_set_name']
                            table.valid_from = r.message[i]['valid_from']
                            table.valid_to = r.message[i]['valid_to']
                            table.status = r.message[i]['status']
                            for (let j = 0; j < frm_list.length; j++) {
                                if (frm_list[j]['order_set_id'] == r.message[i]['order_set_id']) {
                                    table.can_be_ordered = frm_list[j]['can_be_ordered'];
                                }
                            }
                            refresh_field('order_sets')
                        }
                    }
                }
            }
        })
    }
});
