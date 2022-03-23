frappe.ui.form.on('Role', {
    refresh: function (frm) {
        // gets the html of the custom field
        let wrapper = frm.fields_dict.custom_html.wrapper;
        new roleMapping(wrapper, frm.doc.name);
    }
})

var roleMapping = class CustomRoleMapping {
    constructor(parent, role) {
        this.wrapper = $(parent).empty();
        this.role = role;
        this.modules_list = [];

        this.make_html();
        this.setup();
    }
    make_html() {
        let html = $(`
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="2" style="vertical-align: middle;"></th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Group")}</th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Document Type")}</th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Level")}</th>
                            <th colspan="10" style="text-align: center;">${__("Permissions")}</th>
                        </tr>
                        <tr>
                            <th>${__("Select")}</th>
                            <th>${__("Read")}</th>
                            <th>${__("Write")}</th>
                            <th>${__("Create")}</th>
                            <th>${__("Delete")}</th>
                            <th>${__("Submit")}</th>
                            <th>${__("Amend")}</th>
                            <th>${__("Print")}</th>
                            <th>${__("Report")}</th>
                            <th>${__("Export")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="14" style="text-align: center;">${__("No records found!")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `).appendTo(this.wrapper);
    }
    setup() {
        this.get_doctype_data()
    }
    get_doctype_data() {
        let me = this;
        frappe.call({
            method: 'devit_customization.utils.get_doctype_data',
            args: {
                role: me.role
            },
            callback: function(r) {
                if(r.message && r.message.length > 0){
                    me.modules_list = r.message;
                }
                me.map_html();
            }
        })
    }
    map_html() {
        if(this.modules_list.length > 0) {
            this.wrapper.find('tbody').html('');
            this.expanded_id = 0;
            this.modules_list.map((module, i) => {
                let row = $(`<tr data-idx="${i}" data-mod="${module.name}">
                    <td>
                        <div>
                            <svg class="icon  icon-md icon-down" style="cursor: pointer;">
                                <use class="" href="#icon-down"></use>
                            </svg>
                            <svg class="icon icon-md icon-up" style="display: none;cursor: pointer;">
                                <use class="" href="#icon-down"></use>
                            </svg>
                        </div>
                    </td>
                    <td>${__(module.name)}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`);
                this.wrapper.find('tbody').append(row);
            })
        }
    }
}