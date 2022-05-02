frappe.ui.form.on('Item', {
    refresh: function(frm) {
        let wrapper = frm.fields_dict.production_process_html.wrapper;
        new production_process(wrapper);
//        let active_production_version = cur_frm.fields_dict.active_production_version.value;
        cur_frm.set_df_property("active_production_version", "hidden", 1);
        cur_frm.set_df_property("show_options_production", "hidden", 1);
        cur_frm.set_df_property("select_option_production", "hidden", 1);
        cur_frm.set_df_property("production_variant_1", "hidden", 1);
        cur_frm.set_df_property("production_variant_2", "hidden", 1);
        cur_frm.set_df_property("production_variant_3", "hidden", 1);
        cur_frm.set_df_property("production_variant_4", "hidden", 1);
        cur_frm.set_df_property("select_production_version", "hidden", 1);
    },
    onload: function(frm) {
        frm.dashboard.hide();
    },
    before_save(frm) {
        if (frm.doc.active_production_version) {
            frappe.call({
                method: 'devit_customization.utils.update_process_edit',
                args: {
                    active_production_version: frm.doc.name + '-' + frm.doc.active_production_version,
                    select_production_version: frm.doc.select_production_version,
                }
            })
        };
    }
})

var production_process = class ArticleProductionProcess {
    constructor(parent) {
        this.wrapper = $(parent).empty();
        this.active_process = {};
        this.make();
        if (cur_frm.doc.active_production_version) {
            this.active_field.set_value(cur_frm.doc.active_production_version);
        }
        if (cur_frm.doc.select_production_version) {
            this.select_field.set_value(cur_frm.doc.select_production_version);
        }
        else {
            this.get_active_process();
        }
        if (cur_frm.doc.show_options_production) {
            this.show_options.set_value(cur_frm.doc.show_options_production);
            this.select_options.set_value(cur_frm.doc.select_option_production);
            this.variant_version_1.set_value(cur_frm.doc.production_variant_1);
            this.variant_version_2.set_value(cur_frm.doc.production_variant_2);
            this.variant_version_3.set_value(cur_frm.doc.production_variant_3);
            this.variant_version_4.set_value(cur_frm.doc.production_variant_4);
        }
    }
    make() {
        $(`<div class="container-fluid">
            <div class="row" style="align-items: center;">
                <div class="col-md-4">
                    <div class="show_options"></div>
                </div>
                <div class="col-md-4">
                    <div class="select_options" style="display:none"></div>
                </div>
            </div>
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
            <div class="row" id="option1" style="align-items: center;" style="display: none;">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <div class="variant_version_1" id="varaint1" style="display: none;"></div>
                    <div class="variant_version_2" id="varaint2" style="display: none;"></div>
                    <div class="variant_version_3" id="varaint3" style="display: none;"></div>
                    <div class="variant_version_4" id="varaint4" style="display: none;"></div>
                </div>
                <div class="col-md-4"></div>
            </div>
            <div class="row production-process" style="display: none;">
                <div class="col-md-12">
                    <button type="button" class="btn btn-primary ellipsis btn-sm add-step">
                        ${__("Add Step")}
                    </button>
                    <br><br>
                    <div class="select_field_"></div>
                    <h5>Primary Active Version:</h5>
                        <table class="table table-bordered" style="font-size:13px;">
                            <thead>
                                <tr>
                                    <th>${__("Prio")}</th>
                                    <th>${__("Step")}</th>
                                    <th>${__("Temp.")}</th>
                                    <th>${__("Time(min)")}</th>
                                    <th>${__("Humidity(%)")}</th>
                                    <th>${__("Oven program")}</th>
                                    <th>${__("Slices / unit")}</th>
                                    <th>${__("Slices / Package")}</th>
                                    <th>${__("Package(G)")}</th>
                                </tr>
                            </thead>
                            <tbody class="active-version-class">
                                <tr>
                                    <td colspan="10">${__("No records found!")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="variant_version1_"></div>
                    <div class="variant_version2_"></div>
                    <div class="variant_version3_"></div>
                    <div class="variant_version4_"></div>
            </div>
        </div>`).appendTo(this.wrapper);
        this.$selectVersion = this.wrapper.find('.select-version');
        this.$activeVersion = this.wrapper.find('.active-version');
        this.$ShowOptions = this.wrapper.find('.show_options');
        this.$SelectOptions= this.wrapper.find('.select_options');
        this.$VariantVersion1 = this.wrapper.find('.variant_version_1');
        this.$VariantVersion2 = this.wrapper.find('.variant_version_2');
        this.$VariantVersion3 = this.wrapper.find('.variant_version_3');
        this.$VariantVersion4 = this.wrapper.find('.variant_version_4');
        this.setup_field();
        this.setup_add_version();
        this.setup_add_step();
    }

    setup_field(parent, df) {
        let me = this;
        this.select_field = frappe.ui.form.make_control({
            parent: me.$selectVersion,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'select_version_production',
                label: __("Select Version"),
                options: 'Production Process',
                reqd: 0,
                default: '',
                get_query: () => {
                    return {
                        filters: {
                            'item_code': cur_frm.doc.name,
//                            'version': ['!=', this.active_field.get_value()]
                        }
                    }
                },
                onchange: () => {
                    let val = me.select_field.get_value();
                    if (val){
                        let field = "select_field";
                        let header = me.select_field.df.label
                        cur_frm.set_value('select_production_version', val);
                        me.get_active_process(val, field, header);
                    }else{
                        me.wrapper.find('.select_field_').hide();
                        cur_frm.set_value('select_production_version', '');
                    }
                }
            }
        });
        var production_process_version_list = []
        frappe.call({
            method: 'devit_customization.utils.get_production_process_list',
            args: {
                'item_code': cur_frm.doc.name,
            },
            callback: (r) => {
                for (var process in r.message) {
                    production_process_version_list.push(r.message[process]['version'])
                }
            }
        })
        this.active_field = frappe.ui.form.make_control({
            parent: me.$activeVersion,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'active_version_production',
                label: __("Primary Active Version"),
                options: 'Process Version',
                reqd: 0,
                get_query: () => {
                    return {
                        filters: {
                            'id': ["not in", me.variant_version_1.get_value(), me.variant_version_2.get_value(), me.variant_version_3.get_value(), me.variant_version4.get_value()],
                            'name': ['In', production_process_version_list]
                        }
                    }
                },
                onchange: () => {
                    let val = me.active_field.get_value();
                    let field = "active_field";
                    if(val) {
                        cur_frm.set_value('active_production_version', val);
                        me.get_active_process(val, field);
                    }
                    else{
                        cur_frm.set_value('active_production_version', '');
                    }
                }
            }
        });
        this.show_options = frappe.ui.form.make_control({
            parent: me.$ShowOptions,
            render_input: true,
            df: {
                fieldtype: "Check",
                fieldname: 'show_options',
                label:__("Show Options"),
                onchange: function() {
                    if (me.show_options.get_value() == 0) {
                        me.wrapper.find('.select_options').hide();
                        me.wrapper.find('.variant_version_1').hide();
                        me.wrapper.find('.variant_version_2').hide();
                        me.wrapper.find('.variant_version_3').hide();
                        me.wrapper.find('.variant_version_4').hide();
                        me.wrapper.find('.variant_version1_').hide();
                        me.wrapper.find('.variant_version2_').hide();
                        me.wrapper.find('.variant_version3_').hide();
                        me.wrapper.find('.variant_version4_').hide();
                    }
                    else {
                        me.wrapper.find('.select_options').show();
//                        me.select_options.set_value('1');
                    }
                    cur_frm.set_value('show_options_production', me.show_options.get_value());
                }
            }
        })
        this.select_options = frappe.ui.form.make_control({
            parent: me.$SelectOptions,
            render_input: true,
            df: {
                fieldtype: "Select",
                fieldname: 'select_options',
                label: __("Select Options"),
                options: ["2", "3", "4", "5"],
                onchange: function(){
                    let val = me.select_options.get_value()
                    if (val){
                        cur_frm.set_value('select_option_production', me.select_options.get_value());
                        for (var i = 1; i < val; i++) {
                            let variant_class = '.variant_version_' + i.toString();
                            me.wrapper.find(variant_class).show();
                        }
                        for (var j = val; j < 5; j++){
                            let variant_class = '.variant_version_' + j.toString();
                            let variant_table = '.variant_version' + j + "_"
                            me.wrapper.find(variant_table).hide();
                            me.wrapper.find(variant_class).hide();
                        }
                    }else{
                        cur_frm.set_value('select_option_production', '');
                    }

                }
            }
        })
        this.variant_version_1 = frappe.ui.form.make_control({
            parent: me.$VariantVersion1,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'variant_version1',
                options: 'Process Version',
                label: __("Variant Active Version 1"),
                get_query: () => {
                    let filters = {"id": ["not in", [me.active_field.get_value(), me.variant_version_2.get_value(), me.variant_version_3.get_value(), me.variant_version4.get_value()]]};
                    return {
                        filters: filters,
                    }
                },
                onchange: function(){
                    let val = me.variant_version_1.get_value()
                    if(val) {
                        let field = me.variant_version_1.df.fieldname
                        let header = me.variant_version_1.df.label
                        me.get_active_process(val, field, header);
                        cur_frm.set_value('production_variant_1', me.variant_version_1.get_value());
                    }
                    else{
                        me.wrapper.find('.variant_version1_').hide();
                        cur_frm.set_value('production_variant_1', '');
                    }
                }
            }
        })
        this.variant_version_2 = frappe.ui.form.make_control({
            parent: me.$VariantVersion2,
            render_input: true,
            df: {
                fieldtype: 'Link',
                fieldname: 'variant_version2',
                options: 'Process Version',
                label: __("Variant Active Version 2"),
                get_query: () => {
                    let filters = {"id": ["not in", [me.active_field.get_value(), me.variant_version_1.get_value(), me.variant_version_3.get_value(), me.variant_version4.get_value()]]};
                    return {
                        filters: filters,
                    }
                },
                onchange: function(){
                    let val = me.variant_version_2.get_value()
                    if(val) {
                        let field = me.variant_version_2.df.fieldname
                        let header = me.variant_version_2.df.label
                        me.get_active_process(val, field, header);
                        cur_frm.set_value('production_variant_2', me.variant_version_2.get_value());
                    }
                    else{
                        me.wrapper.find('.variant_version2_').hide();
                        cur_frm.set_value('production_variant_2', '');
                    }
                }
            }
        })
        this.variant_version_3 = frappe.ui.form.make_control({
            parent: me.$VariantVersion3,
            render_input: true,
            df: {
                fieldtype: 'Link',
                options: 'Process Version',
                fieldname: 'variant_version3',
                label: __("Variant Active Version 3"),
                get_query: () => {
                    let filters = {"id": ["not in", [me.active_field.get_value(), me.variant_version_2.get_value(), me.variant_version_1.get_value(), me.variant_version4.get_value()]]};
                    return {
                        filters: filters,
                    }
                },
                onchange: function(){
                    let val = me.variant_version_3.get_value()
                    if(val) {
                        let field = me.variant_version_3.df.fieldname
                        let header = me.variant_version_3.df.label
                        me.get_active_process(val, field, header);
                        cur_frm.set_value('production_variant_3', me.variant_version_3.get_value());
                    }
                    else{
                        me.wrapper.find('.variant_version3_').hide();
                        cur_frm.set_value('production_variant_3', '');
                    }
                }
            }
        })
        this.variant_version_4 = frappe.ui.form.make_control({
            parent: me.$VariantVersion4,
            render_input: true,
            df: {
                fieldtype: 'Link',
                options: 'Process Version',
                fieldname: 'variant_version4',
                label: __("Variant Active Version 4"),
                get_query: () => {
                    let filters = {"id": ["not in", [me.active_field.get_value(), me.variant_version_2.get_value(), me.variant_version_3.get_value(), me.variant_version_1.get_value()]]};
                    return {
                        filters: filters,
                    }
                },
                onchange: function(){
                    let val = me.variant_version4.get_value()
                    if(val) {
                        let field = me.variant_version4.df.fieldname
                        let header = me.variant_version4.df.label
                        me.get_active_process(val, field, header);
                        cur_frm.set_value('production_variant_4', me.variant_version_4.get_value());
                    }
                    else{
                        me.wrapper.find('.variant_version4_').hide();
                        cur_frm.set_value('production_variant_4', '');
                    }
                }
            }
        })
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
                        "fieldtype": "Data",
                        "label": __("Base Version"),
                        "reqd": 0
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
                        method: 'devit_customization.utils.insert_process',
                        args: {
                            'item_code': cur_frm.doc.name,
                            'version': values.version,
                            'base_version': values.base_version
                        },
                        freeze: true,
                        callback: (r) => {
                            if(r.message) {
                                me.active_process = r.message;
                                if(me.active_process) {
                                    if (!values.base_version) {
                                        cur_frm.set_value('active_production_version', r.message.name)
                                        me.active_field.set_value(r.message.version);
                                        me.select_field.set_value('');
                                    } else {
                                        cur_frm.set_value('select_production_version', r.message.name)
                                        me.select_field.set_value(r.message.name);
                                        me.active_recipe = r.message;
                                    }
                                    me.wrapper.find('.production-process').show();
                                    if(!me.active_process.allow_item_edit)
                                        me.wrapper.find('.production-process .add-step').hide();
                                    else
                                        me.wrapper.find('.production-process .add-step').show();
                                    me.setup_production_processes();
                                }
                            }
                            d.hide();
                        }
                    })
                }
            });
            d.show();
            if(me.active_process && me.active_process.version) {
                frappe.call({
                    method: 'devit_customization.utils.get_total_process_version_list',
                    args: {
                        'item_code': cur_frm.doc.name,
                    },
                    callback: (r) => {
                        let new_base_version = 'V' + r.message
                        d.set_value('base_version', new_base_version);
                        let current_version = new_base_version.toLowerCase().split('v')[1];
                        let new_version = parseInt(current_version) + 1;
                        d.set_value('version', `V${new_version}`);
                    }
                })
            } else {
                d.set_value('version', `V1`);
            }
        })
    }
    get_active_process(version, current_field, header) {
        let me = this;
        frappe.call({
            method: 'devit_customization.utils.get_process_detail',
            args: {
                item_code: cur_frm.doc.name,
                version: version
            },
            callback: function(r) {
                if(r.message) {
                    me.active_process = r.message;
                    if(me.active_process) {
                        if(!version){
                            me.active_field.set_value(r.message.version);
                        }
                        if(current_field != "active_field") {
                            let field_name = "." + current_field + "_"
                            let tbody = current_field
                            let tbody_id = "#" + tbody
                            me.wrapper.find(field_name).show();
                            me.wrapper.find(field_name).html(`
                                <h5>${header}:</h5>
                                <table class="table table-bordered" style="font-size:13px;">
                                    <thead>
                                        <tr>
                                            <th>${__("Prio")}</th>
                                            <th>${__("Step")}</th>
                                            <th>${__("Temp.")}</th>
                                            <th>${__("Time(min)")}</th>
                                            <th>${__("Humidity(%)")}</th>
                                            <th>${__("Oven program")}</th>
                                            <th>${__("Slices / unit")}</th>
                                            <th>${__("Slices / Package")}</th>
                                            <th>${__("Package(G)")}</th>
                                        </tr>
                                    </thead>
                                    <tbody id=${tbody}>
                                    </tbody>
                                </table>
                            `);
                            if(me.active_process.processes && me.active_process.processes.length > 0) {
                                me.active_process.processes.map(process => {
                                    let row = $(`<tr data-id="${process.name}" data-idx="${process.idx}">
                                        <td id="priority">${process.priority}</td>
                                        <td id="process_step">${process.process_step}</td>
                                        <td id="temperature">${process.temperature}</td>
                                        <td id="time_in_min">${process.time_in_min}</td>
                                        <td id="humidity_in_">${process.humidity_in_}</td>
                                        <td id="oven_program">${process.oven_program}</td>
                                        <td id="slices_per_unit">${process.slices_per_unit}</td>
                                        <td id="slices_per_package">${process.slices_per_package}</td>
                                        <td id="grams_per_package">${process.grams_per_package}</td>
                                        <th>${''}</th>
                                    </tr>`);
                                    me.wrapper.find(tbody_id).append(row);
                                    let fieldtofetch = ['time_in_min', 'temperature', 'humidity_in_', 'oven_program', 'slices_per_unit', 'slices_per_package', 'grams_per_package'];
                                    let rowProcessStep = row.find('#process_step').text();
                                    frappe.model.get_value('Process Step', {'process_step_german': rowProcessStep}, fieldtofetch, (fieldValues) => {
                                        for (var each in fieldValues) {
                                            if (fieldValues[each] == 0) {
                                                let rowFieldId = '#' + each;
                                                let rowColumn = row.find(rowFieldId)
                                                rowColumn.css('background', 'lightgray');
                                                rowColumn.html("--");
                                            }
                                        }
                                    });
                                });
                            }
                        } else if (current_field == "active_field") {
                            me.wrapper.find('.production-process').show();
                            me.wrapper.find('.select_version_table').hide();
                            me.wrapper.find('.variant_version1_').hide();
                            me.wrapper.find('.variant_version2_').hide();
                            me.wrapper.find('.variant_version3_').hide();
                            me.wrapper.find('.variant_version4_').hide();
                            if(!me.active_process.allow_item_edit) {
                                me.wrapper.find('.production-process .add-step').hide();
                            } else {
                                me.wrapper.find('.production-process .add-step').show();
                            }
                            me.setup_production_processes();
                        } else {
                            me.active_process = r.message;
                            if(me.active_process) {
                                if(!version)
                                    me.active_field.set_value(r.message.version);
                            }
                        }
//                        else {
//                            me.active_process = r.message;
//                            if(me.active_process) {
//                                if(!version)
//                                    me.active_field.set_value(r.message.version);
//                            }
//                        }
                    }
                }
            }
        });
    }
    setup_production_processes() {
        if(this.active_process.processes && this.active_process.processes.length > 0) {
            this.wrapper.find('.active-version-class').html('');
            this.active_process.processes.map(process => {
                let btn = `<button class="btn btn-warning btn-sm"><svg class="icon icon-sm">
                            <use class="" href="#icon-edit"></use>
                        </svg></button>
                        <button class="btn btn-danger btn-sm">
                        <svg class="icon icon-sm" style="font-size:5px;">
                            <use class="" href="#icon-delete"></use>
                        </svg>
                        </button>`;
                let row = $(`<tr data-id="${process.name}" data-idx="${process.idx}">
                        <td id="priority">${process.priority}</td>
                        <td id="process_step">${process.process_step}</td>
                        <td id="temperature">${process.temperature}</td>
                        <td id="time_in_min">${process.time_in_min}</td>
                        <td id="humidity_in_">${process.humidity_in_}</td>
                        <td id="oven_program">${process.oven_program}</td>
                        <td id="slices_per_unit">${process.slices_per_unit}</td>
                        <td id="slices_per_package">${process.slices_per_package}</td>
                        <td id="grams_per_package">${process.grams_per_package}</td>
                        <td style="width: 10%;padding: 5px;vertical-align: middle;">
                            ${this.active_process.allow_item_edit == 1 ? btn : ''}
                        </td>
                    </tr>`);
                row.find('.btn-warning').click(() => {
                    let _row_html = this.section_fields(process, 'devit_customization.utils.update_process_step', 'edit');
                    this.wrapper.find('.active-version-class tr[data-id="' + process.name +'"]').html(_row_html);
                })
                row.find('.btn-danger').click(() => {
                    frappe.confirm(__("Do you really want to delete this process?"),
                        () => {
                            frappe.call({
                                method: 'devit_customization.utils.delete_process_step',
                                args: {
                                    docname: process.name,
                                    parent: process.parent
                                },
                                freeze: true,
                                callback: (r) => {
                                    if(r.message) {
                                        this.active_process = r.message;
                                        this.setup_production_processes();
                                        cur_frm.update_process = 1;
                                    }
                                }
                            })
                        }
                    )
                })
                let fieldtofetch = ['time_in_min', 'temperature', 'humidity_in_', 'oven_program', 'slices_per_unit', 'slices_per_package', 'grams_per_package'];
                let rowProcessStep = row.find('#process_step').text();
                frappe.model.get_value('Process Step', {'process_step_german': rowProcessStep}, fieldtofetch, (fieldValues) => {
                    for (var each in fieldValues) {
                        if (fieldValues[each] == 0) {
                            let rowFieldId = '#' + each;
                            let rowColumn = row.find(rowFieldId)
                            rowColumn.css('background', 'lightgray');
                            rowColumn.html("--");
                        }
                    }
                });
                this.wrapper.find('.active-version-class').append(row);
            });
        } else {
            this.wrapper.find('.active-version-class').html(`<tr>
//                      <td colspan="9">${__("No records found!")}</td>
                </tr>`);
        }
    }
    setup_add_step() {
        this.wrapper.find('.add-step').click(() => {
            if(this.active_process && this.active_process.processes.length == 0) {
                this.wrapper.find('.active-version-class').html('');
            }
            let row = this.section_fields(null, 'devit_customization.utils.insert_process_step', 'add');
            let row_html = $(`<tr class="add-row"></tr>`);
            row_html.append(row);
            this.wrapper.find('.active-version-class').prepend(row_html);
        })
    }
    section_fields(values, url, type) {
        let me = this;
        let row = $(`
                <td id="priority">
                    <div data-fieldname="priority"></div>
                </td>
                <td id="process_step">
                    <div data-fieldname="process_step"></div>
                </td>
                <td id="temperature">
                    <div data-fieldname="temperature"></div>
                </td>
                <td id="time_in_min">
                    <div data-fieldname="time_in_min"></div>
                </td>
                <td id="humidity_in_">
                    <div data-fieldname="humidity_in_"></div>
                </td>
                <td id="oven_program">
                    <div data-fieldname="oven_program"></div>
                </td>
                <td id="slices_per_unit">
                    <div data-fieldname="slices_per_unit" ></div>
                </td>
                <td id="slices_per_package">
                    <div data-fieldname="slices_per_package"></div>
                </td>
                <td id="grams_per_package">
                    <div data-fieldname="grams_per_package"></div>
                </td>
                <td style="width: 15%;padding: 10px;vertical-align: middle;">
                    <button class="btn btn-primary btn-sm">${__("Save")}</button>
                    <button class="btn btn-default btn-sm">${__("Cancel")}</button>
                </td>
            `);
        let fields = {};
        production_process_df.map(f => {
            if(f.fieldname == 'process_step') {
                f.onchange = () => {
                    frappe.call({
                        method: 'frappe.client.get_value',
                        args: {
                            doctype: 'Process Step',
                            filters: {
                                name: fields['process_step'].get_value()
                            },
                            fieldname: ['temperature', 'time_in_min', 'humidity_in_', 'oven_program', 'slices_per_unit', 'slices_per_package', 'grams_per_package']
                        },
                        freeze: true,
                        callback: (r) => {
                            for (var process in r.message) {
                                if (r.message[process] == 0) {
                                    row.find('div[data-fieldname="' + process + '"]').hide();
                                    var x = document.getElementById(process);
                                    x.style.backgroundColor = "lightgray";
                                } else {
                                    row.find('div[data-fieldname="' + process + '"]').show();
                                }
                            }
                        }
                    })
                }
            }
            var input = frappe.ui.form.make_control({
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
                    'doctype': 'Production Process Table',
                    'parent': me.active_process.name,
                    'parenttype': 'Production Process',
                    'parentfield': 'processes',
                    '__islocal': 1,
                    '__unsaved': 1,
                    'idx': (me.active_process.processes.length || 0) + 1
                }
            }
            let cond_checked = true;
            for(var i = 0; i < production_process_df.length; i++) {
                let df = production_process_df[i];
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
                                me.wrapper.find('.active-version-class tr.add-row').remove();
                            me.active_process = r.message;
                            me.setup_production_processes();
                            cur_frm.update_process = 1;
                            cur_frm.dirty();
                        }
                    }
                })
            }
        });
        row.find('.btn-default').click(() => {
            if(type == 'add') {
                me.wrapper.find('.active-version-class tr.add-row').remove();
                if(me.active_process.processes.length == 0) {
                    me.wrapper.find('.active-version-class').html(`<tr>
                            <td colspan="9">${__("No records found!")}</td>
                        </tr>`);
                }
            } else {
                me.setup_production_processes();
            }
        });
        return row;
    }
}
let production_process_df = [
    {
        'fieldname': 'priority',
        'fieldtype': 'Int',
//        'label': __(''),
        'reqd': 0,
    },
    {
        'fieldname': 'process_step',
        'fieldtype': 'Link',
//        'label': __(''),
        'options': 'Process Step',
        'reqd': 0,
    },
    {
        'fieldname': 'temperature',
        'fieldtype': 'Float',
//        'label': __(''),
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Resting' || doc.process_step == 'Baking' || doc.process_step == 'Pouring' || doc.process_step == 'Kneading' || doc.process_step == 'Unit fermentation' || doc.process_step == 'Fermentation retardation' || doc.process_step == 'Deep-freezing'"
    },
    {
        'fieldname': 'time_in_min',
        'fieldtype': 'Float',
//        'label': __(''),
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Baking' || doc.process_step == 'Mixing' || doc.process_step == 'Stirring' || doc.process_step == 'Resting' || doc.process_step == 'Kneading' || doc.process_step == 'Processing' || doc.process_step == 'Unit fermentation' || doc.process_step == 'Fermentation retardation' || doc.process_step == 'Long-term control'"
    },
    {
        'fieldname': 'humidity_in_',
        'fieldtype': 'Float',
//        'label': __(''),
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Resting' || doc.process_step == 'Baking' || doc.process_step == 'Unit fermentation' || doc.process_step == 'Fermentation retardation'"
    },
    {
        'fieldname': 'oven_program',
        'fieldtype': 'Link',
//        'label': __(''),
        'options': 'Oven Program',
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Baking'"
    },
    {
        'fieldname': 'slices_per_unit',
        'fieldtype': 'Int',
//        'label': __(''),
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Cutting'"
    },
    {
        'fieldname': 'slices_per_package',
        'fieldtype': 'Int',
//        'label': __(''),
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Packing'"
    },
    {
        'fieldname': 'grams_per_package',
        'fieldtype': 'Float',
//        'label': __(''),
        'reqd': 0,
        'depends_on':"eval:doc.process_step == 'Packing'"
    }
]
