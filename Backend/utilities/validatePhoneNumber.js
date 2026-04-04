
const validatePhoneNumber = (phoneNumber) => {

    //check if the phone number is 11 digits long
    if(phoneNumber.length !== 11) return false;
    
    // first 3 digits that match with Bangladeshi phone numbers
    const first2Digits = phoneNumber.substring(0, 2);
    const thirdDigit = phoneNumber.charAt(2);
    const validThirdDigits = ["3", "5", "6", "7", "8", "9"];
    if(first2Digits !== "01" || !validThirdDigits.includes(thirdDigit)) return false;
    
    return true;
}
export default validatePhoneNumber;