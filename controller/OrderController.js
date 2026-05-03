import { refreshDropdowns } from "./DropDownController.js";
import { getCustomerData } from "../model/CustomerModel.js";
import { getItemData } from "../model/ItemModel.js";
import { order_db } from "../db/db.js";


let cart = [];

  /*  ADD ITEM TO CART */

$('#add_item_btn').on('click', function () {

    let itemId = $('#order_item').val();
    let qty = parseInt($('#order_qty').val());

    if (!itemId || !qty || qty <= 0) {
        alert("Select item and valid qty");
        return;
    }

    let item = getItemData().find(i => i.id == itemId);

    if (!item) return;

    let existing = cart.find(i => i.itemId == itemId);

    if (existing) {
        existing.qty += qty;
        existing.total = existing.qty * item.price;
    } else {
        cart.push({
            itemId: item.id,
            name: item.name,
            price: item.price,
            qty: qty,
            total: item.price * qty
        });
    }

    loadCart();
});

/* LOAD CART */
const loadCart = () => {

    $('#cart_tbody').empty();

    cart.forEach(i => {
        $('#cart_tbody').append(`
            <tr>
                <td>${i.name}</td>
                <td>${i.qty}</td>
                <td>${i.price}</td>
                <td>${i.total}</td>
            </tr>
        `);
    });

    let total = cart.reduce((sum, i) => sum + i.total, 0);
    $('#grand_total').text(total);
};

/* PLACE ORDER */
$('#place_order_btn').on('click', function (e) {

    e.preventDefault();

    let customerId = $('#order_customer').val();

    let customer = getCustomerData().find(c => c.id == customerId);

    if (!customer) {
        alert("Select customer");
        return;
    }

    if (cart.length === 0) {
        alert("Cart empty");
        return;
    }

    let order = {
        orderId: "ORD-" + Date.now(),
        customerId: customer.id,
        customerName: customer.name,
        items: [...cart],
        total: cart.reduce((sum, i) => sum + i.total, 0),
        date: new Date().toLocaleString()
    };

    order_db.push(order);

    cart = [];

    loadCart();
    loadOrderHistory();

    Swal.fire({icon:"success", title:"Order Placed Successfully"});
});


/*  ORDER HISTORY */
const loadOrderHistory = () => {

    $('#order_tbody').empty();

    order_db.forEach(o => {
        $('#order_tbody').append(`
            <tr>
                <td>${o.orderId}</td>
                <td>${o.customerName}</td>
                <td>${o.total}</td>
                <td>${o.date}</td>
            </tr>
        `);
    });
};

/* INIT */
$(document).ready(function () {
    refreshDropdowns();
    loadOrderHistory();
});