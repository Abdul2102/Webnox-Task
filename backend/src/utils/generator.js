const passwordGenerator = (length) => {
    let password = '';
    let numbers = "0987654321"

    for (let i=0; i < length; i++) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    };
    return password;
};

module.exports = {passwordGenerator};