frappe.ui.form.on("Translation Terms", {
    "module_name": function(frm) {
        frm.fields_dict['sub_module'].get_query = function(doc) {
        return {
            filters: { "module": cur_frm.doc.module_name }
               }
        }
        cur_frm.refresh_field('sub_module');
    }
});