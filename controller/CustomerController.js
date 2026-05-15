import { refreshDropdowns } from "./DropDownController.js";


import {
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    getCustomerData,
    getCustomerDataByIndex,
    getCustomerDataById
} from '../model/CustomerModel.js';

import {
    check_customer_phone
} from '../utils/regex_utils.js';

/* Load Table */
const loadCustomerTbl = () => {
    $('#customer_tbody').empty();

    let customer_db = getCustomerData();

    customer_db.map((item, index) => {
        let row = `
        <tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
        </tr>
        `;
        $('#customer_tbody').append(row);
    });
}

/* Clean */
const cleanCustomerForm = () => {
    $('#customer_reset_btn').click();
}

/* Row Click */
$('#customer_tbody').on('click', 'tr', function () {

    let index = $(this).attr("data-index");
    let obj = getCustomerDataByIndex(index);

    $('#customer_id_input').val(obj.id);
    $('#customer_name_input').val(obj.name);
    $('#customer_phone_input').val(obj.phone);
    $('#customer_address_input').val(obj.address);
});
/* Save */
$('#customer_save_btn').on('click', function () {

    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let phone = $('#customer_phone_input').val();
    let address = $('#customer_address_input').val();


    if (id == "") {
        Swal.fire({icon:"error", title:"Invalid ID"});
        return;
    }


    if (getCustomerDataById(id)) {
        Swal.fire({icon:"error", title:"ID already exists"});
        return;
    }

    if (name == "") {
        Swal.fire({icon:"error", title:"Invalid Name"});
        return;
    }

    if (!check_customer_phone(phone)) {
        Swal.fire({icon:"error", title:"Invalid Phone"});
        return;
    }

    if (address == "") {
        Swal.fire({icon:"error", title:"Invalid Address"});
        return;
    }

    addCustomerData(id, name, phone, address);
    loadCustomerTbl();
    cleanCustomerForm();


    refreshDropdowns();

    Swal.fire({icon:"success",title:"Customer Saved"});



});

/* Update */
$('#customer_update_btn').on('click', function () {
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let phone = $('#customer_phone_input').val();
    let address = $('#customer_address_input').val();

    (id == "") ? Swal.fire({icon:"error",title:"Invalid ID"}) :
        (!(getCustomerDataById(id))) ? Swal.fire({icon:"error",title:"Customer not found"}) :
            (name == "") ? Swal.fire({icon:"error",title:"Invalid Name"}) :
                (!check_customer_phone(phone)) ? Swal.fire({icon:"error",title:"Invalid Phone"}) :
                    (address == "") ? Swal.fire({icon:"error",title:"Invalid Address"}) :
                        updateCustomerData(id,name,phone,address);

    cleanCustomerForm();
    loadCustomerTbl();
    Swal.fire({icon:"success",title:"Customer Updated"});
});


/* Delete */
$('#customer_delete_btn').on('click', function () {
    let id = $('#customer_id_input').val();

    Swal.fire({
        title: "Are you sure?",
        text: "Delete customer?",
        icon: "warning",
        showCancelButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            deleteCustomerData(id);
            cleanCustomerForm();
            loadCustomerTbl();
            Swal.fire({icon:"success",title:"Customer Deleted"});
        }
    });
});

$(document).ready(function () {
    loadCustomerTbl();
});