frappe.listview_settings['Translation Terms'] = {
    onload: function(doclist) {
        $('.btn-primary').hide();
    },
	refresh: function(doclist){
        $('.btn-primary').hide();
		doclist.page.clear_inner_toolbar();
        doclist.page.add_inner_button(__("Update Module Terms"), function() {
            frappe.call({
                method: 'devit_customization.devit_customization.doctype.translation_terms.translation_terms.update_all_modules',
                args: {},
                freeze: true,
                callback: () => {
                    frappe.show_alert({
                        message:__('Your request has been queued'),
                        indicator:'orange'
                    }, 5);
                }
            })            
        })
	},
    hide_name_column: true
}
