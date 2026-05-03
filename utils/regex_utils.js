const customer_phone_regex = new RegExp("^0[0-9]{9}$");

const check_customer_phone = (phone) => {
    return customer_phone_regex.test(phone);
}

export {  check_customer_phone };