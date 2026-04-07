const contract = require("../utils/blockchain");

exports.buyCard = async (req, res) => {
  try {
    const { cardId } = req.body;

    const tx = await contract.buyCard(cardId);

    await tx.wait();

    res.json({ message: "Card purchased!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};