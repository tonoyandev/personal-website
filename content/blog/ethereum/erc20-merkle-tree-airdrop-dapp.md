---
layout: Post
title: So, You Want to Build an ERC20 Merkle Tree Airdrop Dapp?
description: 
date: '2023-5-17'
tags:
  - ethereum
images:
  - src: /photos/blog-erc20-merkle-tree-airdrop-dapp.png
    alt: blog-erc20-merkle-tree-airdrop-dapp
featured: true
---


# So, You Want to Build an ERC20 Merkle Tree Airdrop Dapp?

Ever woken up one fine morning and thought to yourself, "Oh, I wish I could build an ERC20 Merkle Tree Airdrop Dapp today"? No? Just me? Well, if you're still here, I'll assume you're mildly interested. Strap in, because we're about to embark on a roller coaster of JavaScript, Solidity, and some good ol' crypto jargon!

By the way, I hope you've had your coffee, because we're diving straight into the deep end.

<img src="https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif" alt="Deep end GIF" width="500" />

## Step 1: Understand What the Heck We're Building 

Okay, let's break it down: 

- **ERC20:** This is a standard for creating tokens on the Ethereum blockchain. No, not the kind you get at the arcade. More like digital assets with value. 

- **Merkle Tree:** Not a weird plant species. It's a structure in computer science that helps verify large data sets efficiently.

- **Airdrop:** No, not the one on your iPhone. In the crypto world, an airdrop means distributing tokens (often for free) to multiple wallet addresses.

- **Dapp:** Short for Decentralized Application. It's an app, but it's, like, totally off the grid, man.

With that out of the way, let's start with the first big step: writing our Solidity contract.

## Step 2: Writing the Solidity Contract

First, we need to install Solidity. But what's that? You don't have Solidity installed? Oh, you joker! Let's fix that:

```bash
npm install -g solc
```

Now, let's get down to business and write our contract. We'll call it `AirdropToken.sol`:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/cryptography/MerkleProof.sol";

contract AirdropToken is ERC20 {
    bytes32 public root;
    mapping(address => bool) public claimed;

    constructor(bytes32 _root) ERC20("Airdrop Token", "DROP") {
        root = _root;
    }

    function claim(uint256 index, address account, uint256 amount, bytes32[] calldata proof) external {
        bytes32 node = keccak256(abi.encodePacked(index, account, amount));

        require(claimed[account] == false, "Drop already claimed!");
        require(MerkleProof.verify(proof, root, node), "Invalid proof.");

        claimed[account] = true;
        _mint(account, amount);
    }
}
```

Our `claim` function lets a user provide a Merkle proof. If the proof is correct, we mint them some sweet, sweet tokens.

<img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif" width="500" />

## Step 3: Setting Up Our React.js Frontend

Let's create our frontend with React.js. If you haven't got it installed, it's time for some good old command line action:

```bash
npx create-react-app airdrop-dapp
```

We'll use ethers.js to interact with Ethereum. Install it with:

```bash
npm install --save ethers
```

Now, let's create a simple form to claim our tokens. We'll call this file `ClaimTokens.js`:

```javascript


import React, { useState } from 'react';
import { ethers } from 'ethers';

function ClaimTokens() {
    const [index, setIndex] = useState(0);
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [proof, setProof] = useState([]);

    async function claimTokens() {
        // Load the contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract('your_contract_address', ['function claim(uint256, address, uint256, bytes32[])'], provider);

        // Check if already claimed
        const hasClaimed = await contract.claimed(account);
        if (hasClaimed) {
            alert('Already claimed!');
            return;
        }

        // Claim tokens
        const tx = await contract.claim(index, account, amount, proof);
        await tx.wait();

        alert('Claim successful!');
    }

    return (
        // Insert your form here. Don't forget to use the setters!
    );
}

export default ClaimTokens;
```

Don't forget to replace `'your_contract_address'` with the actual address of your deployed contract!

<img src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif" alt="Coding end GIF" width="500" />


## Step 4: Creating the Merkle Tree with Node.js

Let's whip up a quick Node.js script to generate the Merkle root. We'll use the `merkletreejs` and `keccak256` libraries. Install them with:

```bash
npm install --save merkletreejs keccak256
```

Then, create `generateMerkleRoot.js`:

```javascript
const fs = require('fs');
const MerkleTree = require('merkletreejs');
const keccak256 = require('keccak256');

const rawData = fs.readFileSync('data.json');
const data = JSON.parse(rawData);

const leaves = data.map(item => keccak256(JSON.stringify(item)));
const tree = new MerkleTree(leaves, keccak256);
const root = tree.getRoot().toString('hex');

console.log('Your Merkle Root:', root);
```

Just pass your data as a JSON array of objects, each with an `address` and an `amount` field, in a file named `data.json`. The script will spit out your Merkle root!

<img src="https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif" alt="Magic GIF" width="500" />

## Step 5: Celebrate!

Congrats! You've built an ERC20 Merkle Tree Airdrop Dapp with React.js and Solidity! Give yourself a pat on the back, crack open a cold one, or do a happy dance.

<img src="https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif" alt="Happy dance GIF" width="500" />

Remember, folks: if it compiles, it's good. If it runs, it's perfect! Until next time, happy coding!