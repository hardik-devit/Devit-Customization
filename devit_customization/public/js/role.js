frappe.ui.form.on('Role', {
refresh: function(frm) {
// gets the html of the custom field
let wrapper = frm.fields_dict.custom_html.wrapper;
// construct custom html
//Call python method for get doctypes and groups

//on_load: (frm) => {
//		frappe.call({
//            method: 'devit_customization.utils.get_user_groups_doctype',
//            async: false,
//            callback: function(r) {
//            if (!r.message || r.message.length == 0) return;
//                var a=r.message;
//                console.log("\n=======", a)
//                var group_list = a[0];
//                var doctype_list = a[1];
//            }
//        });
//},

let html = $(`<div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <table id="datatable" class="table table-bordered   w-100">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>
                                                        <input type="text" class="form-control" name="" id="group_list">
                                                    </th>
                                                    <th>
                                                        <input type="text" class="form-control" name="" id="doctype_list">
                                                    </th>
                                                    <th>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="select-all">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </th>
                                                </tr>
                                            <tr>
                                                <th>#</th>
                                                <th>Group</th>
                                                <th>Document Type</th>
                                                <th>Level</th>
                                                <th>Select</th>
                                                <th>Read</th>
                                                <th>Write</th>
                                                <th>Create</th>
                                                <th>Delete</th>
                                                <th>Email</th>
                                                <th>Export</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td><a href="javascript: void(0);" class="text-body fw-bold">Bookkeeping</a> </td>
                                                    <td>Assets</td>
                                                    <td>0</td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="read">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="form-check font-size-16">
                                                            <input class="form-check-input" type="checkbox" id="transactionCheck02">
                                                            <label class="form-check-label" for="transactionCheck02"></label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
`).appendTo(wrapper);

// add click function to the button in custom html
html.find('.btn-primary').click(() => {
frappe.msgprint("Button clicked");
})
}
})