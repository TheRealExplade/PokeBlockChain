module.exports = {
  getUserCards: async (address) => {
    return [
      {
        cardId: 1,
        name: "Pikachu",
        attack: 25,
        defense: 10,
        rarity: "Rare"
      },
      {
        cardId: 2,
        name: "Charizard",
        attack: 40,
        defense: 20,
        rarity: "Legendary"
      },
      {
        cardId: 3,
        name: "Greninja",
        attack: 40,
        defense: 20,
        rarity: "Legendary"
      }
    ];
  },

  getRandomNumber: async () => {
    return Math.floor(Math.random() * 100);
  },

  submitMatchResult: async (matchId, winner) => {
    console.log(`Mock: Match ${matchId} winner ${winner}`);
  },

  getCard: async (cardId) => {
    const cards = {
        1: { name: "Pikachu", attack: 25, defense: 10, hp: 100 },
        2: { name: "Charizard", attack: 40, defense: 20, hp: 120 },
        3: { name: "Greninja", attack: 40, defense: 20, hp: 110 }
    };

    return cards[cardId];
    },

  buyCard: async () => {
    return {
      wait: async () => console.log("Mock purchase complete")
    };
  }
};