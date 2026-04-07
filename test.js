import { contract } from "./config/contract.js";

async function main() {
  const to = "0xC54d72eb55656a638744461F0774f516601ff7A0"; // your MetaMask address

  console.log("Minting NFT to:", to);

  try {
    // ✅ call correct function from ABI
    const tx = await contract.mint(
      to,
      "https://my-nft-metadata.com/1.json" // dummy metadata URL
    );

    console.log("TX sent:", tx.hash);

    await tx.wait();

    console.log("NFT Minted ✅");
  } catch (err) {
    console.error("Error minting NFT ❌");
    console.error(err);
  }
}

main();