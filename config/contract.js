import { ethers } from "ethers";
import dotenv from "dotenv";
import artifact from "../artifacts/contracts/MyNFT.sol/MyNFT.json" assert { type: "json" };

dotenv.config();

// provider (Hardhat local network)
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

// wallet (from private key)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// contract instance ✅ USE artifact.abi
export const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  artifact.abi,
  wallet
);