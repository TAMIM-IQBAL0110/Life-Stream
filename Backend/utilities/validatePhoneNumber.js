const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return false;

    // remove spaces and dashes
    phoneNumber = phoneNumber.replace(/[\s-]/g, "");

    // handle +880 or 880
    if (phoneNumber.startsWith("+880")) {
        phoneNumber = phoneNumber.slice(3);
    } 
    else if (phoneNumber.startsWith("880")) {
        phoneNumber = phoneNumber.slice(2);
    }

    // check length (should be 11 digits after removing country code)
    if (phoneNumber.length !== 11) return false;

    // must be all digits
    if (!/^\d+$/.test(phoneNumber)) return false;

    // must start with 01
    if (!phoneNumber.startsWith("01")) return false;

    // valid operator digits
    const validThirdDigits = ["3", "5", "6", "7", "8", "9"];
    if (!validThirdDigits.includes(phoneNumber[2])) return false;

    return true;
};

export default validatePhoneNumber;