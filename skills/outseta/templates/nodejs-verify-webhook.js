const crypto = require("crypto");

exports.verifyOutsetaSignature = (signature = "", bodyAsString = "", keyAsHex = "") => {
  const key = Buffer.from(keyAsHex, "hex");
  const payloadToSign = Buffer.from(bodyAsString, "utf-8");
  const calculatedSignature = crypto.createHmac("sha256", key).update(payloadToSign).digest("hex");
  return signature === "sha256=" + calculatedSignature;
};
