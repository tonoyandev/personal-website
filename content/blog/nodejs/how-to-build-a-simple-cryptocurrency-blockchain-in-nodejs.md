---
layout: Post
title: How To Build A Simple Cryptocurrency Blockchain In Node.js
description: Hello, readers! Have you ever been sitting at your computer, gazing out the window, and thought, "Gosh, wouldn't life be grand if I could build a cryptocurrency blockchain in Node.js?" Well, today's your lucky day, my friend!
date: '2023-04-24'
tags:
  - node-js
images:
  - src: /photos/blog-how-to-build-a-simple-cryptocurrency-blockchain-in-nodejs.png
    alt: how-to-build-a-simple-cryptocurrency-blockchain-in-nodejs
featured: true
---
# **How To Build A Simple Cryptocurrency Blockchain In Node.js: Your Unnecessarily-Entertaining Guide**

Hello, readers! Have you ever been sitting at your computer, gazing out the window, and thought, "Gosh, wouldn't life be grand if I could build a cryptocurrency blockchain in Node.js?" Well, today's your lucky day, my friend! Get ready for a rollercoaster ride that's going to take you from the ordinary world of API endpoints to the mysterious realm of decentralized ledger technology. It's time to chain some blocks together and create our very own crypto! For this tutorial, let's call our cryptocurrency "NodeCoin".

![Coder getting ready](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

*Yes, exactly like that.*

## **Step 1: Setting the stage**

First off, you're going to need Node.js and npm installed. If you haven't done that yet, check out the [official Node.js download page](https://nodejs.org/en/download/). You're also going to need your favorite text editor. If you don't have one, that's okay; I'll wait while you take this existential journey to find your favorite. Ready? Alright, let's move on!

## **Step 2: Initializing our Project**

Create a new folder for our project and initialize it with npm. Hop into your terminal or command prompt and do the following:

```bash
mkdir NodeCoin
cd NodeCoin
npm init -y
```

## **Step 3: Installation of Dependencies**

We're going to need 'crypto-js' for creating our hashes, and 'express' for our HTTP server. Install them by running:

```bash
npm install crypto-js express
```

## **Step 4: Creating our Blockchain**

In the root of your project, create a file named 'blockchain.js'. In this file, we're going to design our simple blockchain. 

```javascript
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2023", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
```
Now that's one good-looking blockchain! We've got our basic `Block` class, complete with a `calculateHash()` method, and our `Blockchain` class, with a genesis block maker and a block adder.

## **Step 5: Testing our Blockchain**

Now, let's test our blockchain to see if it holds up.

```javascript
let NodeCoin = new Blockchain();
NodeCoin.addBlock(new Block(1, "10/05/2023", { amount: 4 }));
NodeCoin.addBlock(new Block(2, "12/05/2023", { amount: 10 }));

console.log(JSON.stringify(NodeCoin, null, 4));
```

Run your script with:

```bash
node blockchain.js
```

If you see

 a beautiful JSON representation of your blockchain in your console, give yourself a pat on the back!

## **Step 6: Adding Proof of Work (Mining)**

Right now, our blockchain is a bit too simple, and blocks can be added all willy-nilly. Let's introduce a proof-of-work algorithm, or as crypto folk like to call it, "mining".

```javascript
class Block {
    // ... previous code ...

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain {
    // ... previous code ...

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
}
```
Now, whenever a block is added, it has to be mined, which requires computational power and makes it harder to tamper with the blockchain.

## **Step 7: Building an API**

We're going to create an API for our blockchain. Create a new file, 'main.js', and initialize a simple Express server:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`NodeCoin listening at http://localhost:${port}`);
});
```

Run your server:

```bash
node main.js
```

If you see the console message, then congrats! You're a master of Express servers!

![Party coder](https://media.giphy.com/media/xTiTnHXbRoaZ1B1Mo8/giphy.gif)

*You right now.*

## **Step 8: Interacting with our Blockchain**

To interact with our blockchain, we're going to need endpoints. Let's start by viewing our blockchain and adding a new block:

```javascript
app.get('/blockchain', (req, res) => {
    res.send(JSON.stringify(NodeCoin, null, 4));
});

app.post('/mineBlock', (req, res) => {
    let block = new Block(req.body.index, req.body.timestamp, req.body.data);
    NodeCoin.addBlock(block);
    res.send(`Block #${req.body.index} has been added to the blockchain!`);
});
```

Now you have the power to view your blockchain in all its glory and add new blocks to it through a simple API.

And there you have it, folks! You've successfully built a simple cryptocurrency blockchain in Node.js. Yes, it's a basic blockchain, but it's a start. And like any good developer, you're only limited by your imagination (and, well, computational power). So, go ahead and build the next Bitcoin. Or Dogecoin. Or NodeCoin. Or... well, you get the point.

![Success coder](https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif)

*You when NodeCoin takes over the world.*

Happy coding!