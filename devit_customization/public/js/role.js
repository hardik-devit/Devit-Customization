frappe.ui.form.on('Role', {
    refresh: function (frm) {
        frm.remove_custom_button('Role Permissions Manager');
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
                            <th></th>
                            <th>
                                <input type="text" id="modSearch" class="form-control" />
                            </th>
                            <th>
                                <input type="text" id="dtSearch" class="form-control" />
                            </th>
                            <th colspan="${this.perm_list.length + 1}"></th>
                        </tr>
                        <tr>
                            <th rowspan="2" style="vertical-align: middle;"></th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Group")}</th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Document Type")}</th>
                            <th rowspan="2" style="vertical-align: middle;">${__("Level")}</th>
                            <th colspan="${this.perm_list.length}" style="text-align: center;">${__("Permissions")}</th>
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
        });
        this.$module_search = this.wrapper.find('#modSearch');
        this.$doctype_search = this.wrapper.find('#dtSearch');
        this.setup_search();
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
            freeze: true,
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
                let row = $(`<tr data-idx="${i}" data-mod="${module.name}" data-type="module">
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
                this.wrapper.find('tbody').append(row);
                module.doctypes.map(dt => {                    
                    if(!dt.permissions || dt.permissions.length == 0) {
                        me.setup_columns(module.name, dt.name, 0, 0);
                    }
                    dt.permissions.map((perm, k) => {
                        me.setup_columns(module.name, dt.name, k, perm.permlevel, perm);
                    });
                });
            })
        }
    }
    setup_columns(module, dt, idx, permlevel, permission) {
        let me = this;
        let add_role_btn = `<button class="btn btn-sm add-permission">
                <svg class="icon icon-sm">
                    <use class="" href="#icon-add"></use>
                </svg>
            </button>`;
        let delete_btn = `<button class="btn btn-sm remove-permission">
                <svg class="icon icon-sm">
                    <use class="" href="#icon-delete"></use>
                </svg>
            </button>`;
        let dt_row = $(`<tr data-parent="${module}" data-idx="${idx}" data-dt="${dt}" data-parent-type="module">
                <td></td>
                <td class="text-center" style="vertical-align: center;">
                    ${permlevel == 0 ? add_role_btn : ''} ${delete_btn}
                </td>
                <td>${__(dt)}</td>
                <td class="text-center">${permlevel}</td>
            </tr>`);
        dt_row = this.setup_checkboxes(dt_row, dt, permlevel, permission);   
        dt_row.find('.add-permission').click(function() {
            me.add_new_perm(dt);
        });
        dt_row.find('.remove-permission').click(function() {
            me.delete_perm(dt, permlevel);
        });
        this.wrapper.find('tbody').append(dt_row);    
    }
    setup_checkboxes(row_html, dt, permlevel, permissions) {
        this.perm_list.map(p => {
            let perm = p.toLowerCase().replace(/ /g, '_');
            let level = 0;
            if(permissions)
                level = permissions.permlevel || 0;
            else if(permlevel)
                level = permlevel;
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
                    'default': this.role,
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
    delete_perm(dt, permlevel) {
        frappe.call({
            method: 'devit_customization.utils.remove_permission',
            args: {
                doctype: dt,
                role: this.role,
                permlevel: permlevel
            },
            freeze: true,
            callback: (r) => {
                this.get_doctype_data();
            }
        })
    }
    setup_search() {
        this.$module_search.on('keyup', (e) => {
            let txt = this.$module_search.val();
            txt = txt.toLowerCase();
            if(txt.length > 2) {
                let res = [];
                this.modules_list.map(m => {
                    if(m.name.toLowerCase().match(txt))
                        res.push(m.name);
                });
                this.wrapper.find('tbody tr').hide();
                if(res.length > 0) {
                    res.map(r => {
                        this.wrapper.find('tbody tr[data-mod="' + r + '"]').show();
                    })
                }
            } else if(!txt || txt == '') {
                this.wrapper.find('tbody tr[data-parent-type="module"]').hide();
                this.wrapper.find('tbody tr[data-type="module"]').show();
            }
        });
        this.$doctype_search.on('keyup', () => {
            let txt = this.$doctype_search.val();
            txt = txt.toLowerCase();
            if(txt.length > 2) {
                let res = [];
                this.modules_list.map(m => {
                    m.doctypes.map(d => {
                        if(d.name.toLowerCase().match(txt))
                            res.push(d.name);
                    })
                });
                this.wrapper.find('tbody tr').hide();
                if(res.length > 0) {
                    res.map(r => {
                        this.wrapper.find('tbody tr[data-dt="' + r + '"]').show();
                    })
                }
            } else if(!txt || txt == '') {
                this.wrapper.find('tbody tr[data-parent-type="module"]').hide();
                this.wrapper.find('tbody tr[data-type="module"]').show();
            }
        });
    }
}
