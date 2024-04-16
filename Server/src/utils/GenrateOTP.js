import otpGenerator from "otp-generator";

function genrateOTP() {
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    console.log(otp)
    return otp
}

export default genrateOTP;

