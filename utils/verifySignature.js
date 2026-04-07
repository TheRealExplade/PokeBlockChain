const { ethers } = require("ethers");

const verifySignature = async (message, signature) => {
  try {
    const address = ethers.verifyMessage(message, signature);
    return address;
  } catch (err) {
    return null;
  }
};

module.exports = verifySignature;