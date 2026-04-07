const verifySignature = require("../utils/verifySignature");

exports.login = async (req, res) => {
  const { address, signature } = req.body;

  const message = "Login to Blockchain Game";

  const recoveredAddress = await verifySignature(message, signature);

  if (!recoveredAddress || recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  res.json({
    message: "Login successful",
    address
  });
};