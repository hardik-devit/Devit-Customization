// Copyright (c) 2022, Hardik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Article Type', {
	 refresh: function(frm) {
        if (frappe.boot.lang == 'de'){
            frm.page.set_title(frm.doc.article_type_german)
        }
        if (frappe.boot.lang == 'it'){
            frm.page.set_title(frm.doc.article_type_italian)
        }
        else{
            frm.page.set_title(frm.doc.article_type_english)
        }
	 }
});
