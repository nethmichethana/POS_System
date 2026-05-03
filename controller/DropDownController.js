import { getCustomerData } from "../model/CustomerModel.js";
import { getItemData } from "../model/ItemModel.js";

export const refreshDropdowns = () => {

    console.log("Dropdown loading...");

    $('#order_customer').empty();
    getCustomerData().forEach(c => {
        $('#order_customer').append(
            `<option value="${c.id}">${c.name}</option>`
        );
    });

    $('#order_item').empty();
    getItemData().forEach(i => {
        $('#order_item').append(
            `<option value="${i.id}">${i.name}</option>`
        );
    });
};