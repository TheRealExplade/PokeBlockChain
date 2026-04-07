# Blockchain-Based Trading Card Game Backend

## Overview
This project is a backend for a turn-based trading card game where each card is treated as a blockchain asset (NFT).

## Features
- Turn-based battle system
- Deck management
- Card stats (attack, defense, HP)
- Matchmaking system
- Mock blockchain integration (ready for smart contract integration)

## Tech Stack
- Node.js
- Express.js
- Ethers.js (for blockchain integration)

## API Endpoints

### Create Match
POST /api/game/create

### Start Match
POST /api/game/start

### Attack
POST /api/game/attack

### Get Cards
GET /api/cards/:address

## Setup

```bash
npm install
node server.js