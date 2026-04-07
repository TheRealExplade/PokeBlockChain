const contract = require("../utils/blockchain");

exports.getUserCards = async (req, res) => {
  try {
    const { address } = req.params;

    const cards = await contract.getUserCards(address);

    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};