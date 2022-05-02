// Copyright (c) 2022, Hardik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Order Sets', {
    onload: function(frm) {
        frm.get_field("articles").grid.cannot_add_rows = true;
        var df = frappe.meta.get_docfield("Order Set Articles","article_name", cur_frm.doc.name);
        df.read_only = 1;
    },
    refresh_button(frm) {
        let frm_list = frm.doc.articles;
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Item',
                fields: ['*']
            },
            freeze: true,
            callback: (r) => {
                if(r.message) {
                    frm.doc.articles = []
                    if (frm.doc.articles) {
                        for (let i = 0; i < r.message.length; i++) {
                            let articles_table = frm.add_child('articles')
                            articles_table.article_ref = r.message[i]['name']
                            articles_table.article_name = r.message[i]['article_name_german']
                            articles_table.article_id = r.message[i]['item_code']
                            articles_table.article_cwg = r.message[i]['cwg1']
                            articles_table.article_type = r.message[i]['article_type']
                            articles_table.article_group = r.message[i]['item_group']
                            refresh_field('articles')
                        }
                    }
                }
            }
        })
    }
});
