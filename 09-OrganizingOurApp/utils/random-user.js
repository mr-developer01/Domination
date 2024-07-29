const crypto = require("crypto")
module.exports = () => {
    let bytes = crypto.randomBytes(8)
    return bytes.toString("hex")
}