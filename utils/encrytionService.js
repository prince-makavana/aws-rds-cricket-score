const crypto = require('crypto');

const encryptData = async (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', 'mysecretkey');
    let encrypted = cipher.update(text.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const decryptData = async (encryptedText) => {
    const decipher = crypto.createDecipher('aes-256-cbc', 'mysecretkey');
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return parseInt(decrypted);
}

module.exports = {
    encryptData,
    decryptData
}
