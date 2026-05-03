import { refreshDropdowns } from "./DropDownController.js";


import {
    addItemData,
    updateItemData,
    deleteItemData,
    getItemData,
    getItemDataByIndex,
    getItemDataById
} from '../model/ItemModel.js';


/* Load Table */
const loadItemTbl = () => {
    $('#item_tbody').empty();

    let item_db = getItemData();

    item_db.map((item, index) => {
        let row = `
        <tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.unit}</td>
            <td>${item.price}</td>
            
    
           
        </tr>
        `;
        $('#item_tbody').append(row);
    });
}

/* Clean */
const cleanItemForm = () => {
    $('#item_reset_btn').click();
}

/* Row Click */
$('#item_tbody').on('click', 'tr', function () {

    let index = $(this).attr("data-index");
    let obj = getItemDataByIndex(index);

    $('#item_id_input').val(obj.id);
    $('#item_name_input').val(obj.name);
    $('#item_qty_input').val(obj.qty);
    $('#item_unit_input').val(obj.unit);
    $('#item_price_input').val(obj.price);
});
/* Save */
$('#item_save_btn').on('click', function () {

    let id = $('#item_id_input').val();
    let name = $('#item_name_input').val();
    let qty = $('#item_qty_input').val();
    let unit = $('#item_unit_input').val();
    let price = $('#item_price_input').val();

    // validation stop
    if (id == "") {
        Swal.fire({icon:"error", title:"Invalid ID"});
        return;
    }


    if (getItemDataById(id)) {
        Swal.fire({icon:"error", title:"ID already exists"});
        return;
    }

    if (name == "") {
        Swal.fire({icon:"error", title:"Invalid Name"});
        return;
    }

    if (qty == "") {
        Swal.fire({icon:"error", title:"Invalid qty"});
        return;
    }

    if (unit == "") {
        Swal.fire({icon:"error", title:"Invalid unit"});
        return;
    }

    if (price == "") {
        Swal.fire({icon:"error", title:"Invalid price"});
        return;
    }

    addItemData(id, name, qty, unit,price);

    loadItemTbl();
    cleanItemForm();

    refreshDropdowns();

    Swal.fire({icon:"success", title:"Item Saved"});

});

/* Update */
$('#item_update_btn').on('click', function () {
    let id = $('#item_id_input').val();
    let name = $('#item_name_input').val();
    let qty = $('#item_qty_input').val();
    let unit = $('#item_unit_input').val();
    let price = $('#item_price_input').val();

    (id == "") ? Swal.fire({icon:"error",title:"Invalid ID"}) :
        (!(getItemDataById(id))) ? Swal.fire({icon:"error",title:"Item not found"}) :
            (name == "") ? Swal.fire({icon:"error",title:"Invalid Name"}) :
                (qty == "") ? Swal.fire({icon:"error",title:"Invalid Quantity"}) :
                    (unit == "") ? Swal.fire({icon:"error",title:"Invalid Unit"}) :
                        (price == "") ? Swal.fire({icon:"error",title:"Invalid price"}) :
                        updateItemData(id,name,qty,unit,price);

    cleanItemForm();
    loadItemTbl();

    Swal.fire({icon:"success",title:"Item Updated"});
});


/* Delete */
$('#item_delete_btn').on('click', function () {
    let id = $('#item_id_input').val();

    Swal.fire({
        title: "Are you sure?",
        text: "Delete Item?",
        icon: "warning",
        showCancelButton: true
    }).then((result)=>{
        if(result.isConfirmed){
            deleteItemData(id);
            cleanItemForm();
            loadItemTbl();
            Swal.fire({icon:"success",title:"Item Deleted"});
        }
    });
});

$(document).ready(function () {
    loadItemTbl();
});