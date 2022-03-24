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
        this.perm_list = ['Select', 'Read', 'Write', 'Create', 'Delete', 'Submit', 'Amend', 'Print', 'Email', 'Report', 'Import', 'Export', 'Share', 'Set User Permissions'];

        this.make_html();
        this.setup();
    }
    make_html() {
        let html = $(`
            <div id="role-div">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="2" style="vertical-align: middle;"></th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Group")}</th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Document Type")}</th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Level")}</th>
                            <th colspan="${this.perm_list.length}" style="text-align: center;">${__("Permissions")}</th>
                            <th rowspan="2"></th>
                        </tr>
                        <tr class="permission"></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="${this.perm_list.length + 5}" style="text-align: center;">${__("No records found!")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <style>
                #role-div .table th, #role-div .table td {
                    padding: 8px 5px;
                }
                #role-div .checkbox {
                    text-align: center;
                }
                #role-div tr[data-parent-type="module"] {
                    display: none;
                }
            </style>
        `).appendTo(this.wrapper);
        this.perm_list.map(p => {
            this.wrapper.find('thead .permission').append(`<th>${__(p)}</th>`);
        })
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
        let me = this;
        if(this.modules_list.length > 0) {
            this.wrapper.find('tbody').html('');
            this.modules_list.map((module, i) => {
                let row = $(`<tr data-idx="${i}" data-mod="${module.name}">
                    <td>
                        <div>
                            <svg class="icon  icon-md icon-down" style="cursor: pointer;">
                                <use class="" href="#icon-down"></use>
                            </svg>
                            <svg class="icon icon-md icon-up" style="display: none;cursor: pointer;">
                                <use class="" href="#icon-up-line"></use>
                            </svg>
                        </div>
                    </td>
                    <td>${__(module.name)}</td>
                    <td></td><td></td>
                </tr>`);
                row.find('.icon-down').click(() => {
                    this.wrapper.find('tbody tr[data-parent="' + module.name + '"]').slideDown();
                    row.find('.icon-down').hide();
                    row.find('.icon-up').show();
                    this.wrapper.find('tr[data-mod="' + module.name +'"]').find('.checkbox').css('display', 'block');
                });
                row.find('.icon-up').click(() => {
                    this.wrapper.find('tbody tr[data-parent="' + module.name + '"]').slideUp();
                    row.find('.icon-up').hide();
                    row.find('.icon-down').show();
                    this.wrapper.find('tr[data-mod="' + module.name +'"]').find('.checkbox').css('display', 'none');
                })
                this.perm_list.map(p => {
                    let ptype = p.toLowerCase().replace(/ /g, '_');
                    let check = $(`<td>
                        <div class="checkbox" style="display: none;">
                            <label>
                                <span class="input-area"><input type="checkbox" autocomplete="off" class="input-with-feedback" data-fieldtype="Check" data-fieldname="${ptype}" placeholder="" data-doctype="Role" data-type="module"></span>
                                <span class="disp-area" style="display: none;"><input type="checkbox" disabled="" class="disabled-selected"></span>
                            </label>
                        </div>
                    </td>`);
                    check.find('input[type="checkbox"][data-fieldname="' + ptype + '"]').change(() => {
                        let is_checked = check.find('input[type="checkbox"][data-fieldname="' + ptype + '"][data-type="module"]').is(':checked');
                        let dt_list = [];
                        this.wrapper.find('tr[data-parent="' + module.name + '"]').find('input[type="checkbox"][data-fieldname="' + ptype + '"]').each(function() {
                            $(this).prop('checked', is_checked ? true : false);

                            dt_list.push({
                                'name': $(this).attr('data-doctype'),
                                'permlevel': $(this).attr('data-level')
                            })
                        })
                        this.update_permission_bulk(dt_list, ptype, (is_checked ? 1 : 0));
                    })
                    row.append(check);
                });
                row.append(`<td></td>`);
                this.wrapper.find('tbody').append(row);
                module.doctypes.map(dt => {
                    let dt_row = '';
                    if(!dt.permissions || dt.permissions.length == 0) {
                        dt_row = $(`<tr data-parent="${module.name}" data-idx="0" data-dt="${dt.name}" data-parent-type="module">
                            <td></td>
                            <td>
                                <div class="checkbox" style="display: none">
                                    <label>
                                        <span class="input-area"><input type="checkbox" autocomplete="off" class="input-with-feedback" data-fieldtype="Check" data-fieldname="check_row" placeholder="" data-doctype="Role"></span>
                                        <span class="disp-area" style="display: none;"><input type="checkbox" disabled="" class="disabled-selected"></span>
                                    </label>
                                </div>
                            </td>
                            <td>${__(dt.name)}</td>
                            <td class="text-center">0</td>
                        </tr>`);
                        dt_row = this.setup_checkboxes(dt_row, dt.name);
                        dt_row.append(`<td>
                            <button class="btn btn-primary btn-sm">
                                <svg class="icon icon-sm">
                                    <use class="" href="#icon-add"></use>
                                </svg>
                            </button>
                        </td>`);                        
                    }
                    dt.permissions.map((perm, k) => {
                        dt_row = $(`<tr data-parent="${module.name}" data-idx="${k}" data-dt="${dt.name}" data-parent-type="module">
                            <td></td>
                            <td>
                                <div class="checkbox" style="display: none">
                                    <label>
                                        <span class="input-area"><input type="checkbox" autocomplete="off" class="input-with-feedback" data-fieldtype="Check" data-fieldname="check_row" placeholder="" data-doctype="Role"></span>
                                        <span class="disp-area" style="display: none;"><input type="checkbox" disabled="" class="disabled-selected"></span>
                                    </label>
                                </div>
                            </td>
                            <td>${__(dt.name)}</td>
                            <td class="text-center">${perm.permlevel}</td>
                        </tr>`);
                        dt_row = this.setup_checkboxes(dt_row, dt.name, perm);
                        if(perm.permlevel == 0) {
                            dt_row.append(`<td>
                                <button class="btn btn-primary btn-sm">
                                    <svg class="icon icon-sm">
                                        <use class="" href="#icon-add"></use>
                                    </svg>
                                </button>
                            </td>`);
                        } else {
                            dt_row.append(`<td></td>`);
                        }
                    });
                    dt_row.find('.btn-primary').click(function() {
                        me.add_new_perm(dt.name);
                    })
                    this.wrapper.find('tbody').append(dt_row);
                });
            })
        }
    }
    setup_checkboxes(row_html, dt, permissions) {
        this.perm_list.map(p => {
            let perm = p.toLowerCase().replace(/ /g, '_');
            let level = 0;
            if(permissions)
                level = permissions.permlevel || 0;
            if(level == 0 || (has_common([perm], ['read', 'write']))) {
                let ch = $(`<td>
                    <div class="checkbox">
                        <label>
                            <span class="input-area"><input type="checkbox" autocomplete="off" class="input-with-feedback" data-fieldtype="Check" data-fieldname="${perm}" placeholder="" data-doctype="${dt}" data-level="${level}"></span>
                            <span class="disp-area" style="display: none;"><input type="checkbox" disabled="" class="disabled-selected"></span>
                        </label>
                    </div>
                </td>`);
                if(permissions && permissions[perm] == 1)
                    ch.find('input[type="checkbox"][data-fieldname="' + perm + '"]').prop('checked', true);
                ch.find('input[type="checkbox"][data-fieldname="' + perm + '"]').change(() => {
                    let is_checked = ch.find('input[type="checkbox"][data-fieldname="' + perm + '"]').is(':checked');
                    this.update_permission(dt, level, perm, (is_checked ? 1 : 0));
                })
                row_html.append(ch);
            } else {
                row_html.append(`<td></td>`);
            }            
        });
        return row_html;
    }
    update_permission(dt, plevel, ptype, value, reload_value) {
        let me = this;
        frappe.call({
            method: 'devit_customization.utils.update_permission',
            args: {
                doctype: dt,
                role: me.role,
                permlevel: plevel,
                ptype: ptype,
                value: value
            },
            freeze: true,
            callback: function(r) {
                if(reload_value) {
                    me.get_doctype_data();
                }
            }
        })
    }
    update_permission_bulk(dt_list, ptype, value) {
        let me = this;
        frappe.call({
            method: 'devit_customization.utils.bulk_update_permission',
            args: {
                dt_list: dt_list,
                role: me.role,
                ptype: ptype,
                value: value
            },
            freeze: true
        })
    }
    add_new_perm(dt) {
        let me = this;
        let dialog = new frappe.ui.Dialog({
            title: __("Add New Rule"),
            fields: [
                {
                    'fieldtype': 'Data',
                    'read_only': 1,
                    'label': __('Document Type'),
                    'default': dt,
                    'fieldname': 'doctype'
                },
                {
                    'fieldtype': 'Data',
                    'read_only': 1,
                    'label': __('Role'),
                    'default': dt,
                    'fieldname': 'Role'
                },
                {
                    'fieldtype': 'Select',
                    'fieldname': 'permlevel',
                    'label': __('Permission Level'),
                    'options': '0\n1\n2\n3\n4\n5\n6\n7\n8\n9',
                    'reqd': 1
                }
            ],
            primary_action_label: __('Save'),
            primary_action: (value) => {
                me.update_permission(dt, value.permlevel, 'read', 1, true);
                dialog.hide();
            }
        })
        dialog.show();
    }
}