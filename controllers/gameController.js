const contract = require("../utils/blockchain");

let matches = {}; // temporary storage

exports.createMatch = (req, res) => {
  const { player1, player2 } = req.body;

  const matchId = Date.now();

  matches[matchId] = {
    player1,
    player2,

    decks: {
      [player1]: [1, 2, 3],
      [player2]: [2, 3, 1]
    },

    activeCard: {
      [player1]: null,
      [player2]: null
    },

    cardState: {},

    turn: player1,
    status: "waiting"
  };

  res.json({ matchId });
};

exports.startMatch = async (req, res) => {
  try {
    const { matchId } = req.body;
    const match = matches[matchId];

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    // set first cards
    match.activeCard[match.player1] = match.decks[match.player1][0];
    match.activeCard[match.player2] = match.decks[match.player2][0];

    // initialize HP from blockchain
    const p1Card = await contract.getCard(match.activeCard[match.player1]);
    const p2Card = await contract.getCard(match.activeCard[match.player2]);

    const p1CardId = match.activeCard[match.player1];
    const p2CardId = match.activeCard[match.player2];

    match.cardState[p1CardId] = { hp: p1Card.hp };
    match.cardState[p2CardId] = { hp: p2Card.hp };

    match.status = "active";

    res.json({ message: "Match started", match });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.attack = async (req, res) => {
  try {
    const { matchId, attacker } = req.body;
    const match = matches[matchId];

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    if (match.turn !== attacker) {
      return res.status(400).json({ error: "Not your turn" });
    }

    if (match.status !== "active") {
        return res.status(400).json({ error: "Match not started" });
    }

    const opponent =
      attacker === match.player1 ? match.player2 : match.player1;

    const attackerCardId = match.activeCard[attacker];
    const defenderCardId = match.activeCard[opponent];

    const attackerCard = await contract.getCard(attackerCardId);
    const defenderCard = await contract.getCard(defenderCardId);

    // 🔥 damage formula
    const baseDamage = attackerCard.attack - defenderCard.defense;
    const random = await contract.getRandomNumber();

    const crit = random % 5 === 0 ? 2 : 1; // 20% crit chance
    const damage = Math.max(baseDamage * crit, 5);

    // apply damage
    const defenderState = match.cardState[defenderCardId];

    if (!defenderState) {
    return res.status(500).json({
        error: "Card state not initialized",
        defenderCardId
    });
    }

    defenderState.hp -= damage;

    let result = {
      damage,
      crit: crit === 2,
      remainingHP: match.cardState[defenderCardId].hp
    };

    // check if card is dead
    if (match.cardState[defenderCardId].hp <= 0) {
      // remove card from deck
      match.decks[opponent].shift();

      if (match.decks[opponent].length === 0) {
        match.status = "finished";

        await contract.submitMatchResult(matchId, attacker);

        result.winner = attacker;
      } else {
        // switch to next card
        const nextCardId = match.decks[opponent][0];
        const nextCard = await contract.getCard(nextCardId);

        match.activeCard[opponent] = nextCardId;
        match.cardState[nextCardId] = { hp: nextCard.hp };

        result.nextCard = nextCardId;
      }
    }

    // switch turn
    match.turn = opponent;

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};