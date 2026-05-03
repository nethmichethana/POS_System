import { customer_db } from '../db/db.js';

class Customer {
    constructor(id, name, phone, address) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
    }
}

/* CRUD */
const addCustomerData = (id, name, phone, address) => {
    customer_db.push(new Customer(id, name, phone, address));
}

const updateCustomerData = (id, name, phone, address) => {
    let c = customer_db.find(i => i.id == id);
    if (c) {
        c.name = name;
        c.phone = phone;
        c.address = address;
    }
}

const deleteCustomerData = (id) => {
    let index = customer_db.findIndex(i => i.id == id);
    if (index !== -1) customer_db.splice(index, 1);
}

const getCustomerData = () => customer_db;
const getCustomerDataById = (id) => customer_db.find(i => i.id == id);
const getCustomerDataByIndex = (i) => customer_db[i];

export {
    addCustomerData,
    updateCustomerData,
    deleteCustomerData,
    getCustomerData,
    getCustomerDataById,
    getCustomerDataByIndex
};

