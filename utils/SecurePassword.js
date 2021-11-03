const crypto = require('crypto');


exports.SecurePassword = (plainpassword , salt) => {
    var password = crypto.createHmac('sha256', salt)
    .update(plainpassword)
    .digest('hex');
    return password
}