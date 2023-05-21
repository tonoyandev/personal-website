---
layout: Post
title: The Magical World of Multisig Wallets - A Developer's Guide to the EVM Blockchain
description: Today, we're going to dive into the thrilling world of multisig wallets on EVM (Ethereum Virtual Machine) blockchains. These wallets are like your private digital vault, guarded by not just one key (or signature), but multiple!
date: '2023-05-21'
tags:
  - ethereum
images:
  - src: /photos/blog-multisig-wallets.png
    alt: multisig-wallets
featured: true
---

# A Developer's Guide to Multisig Wallets on EVM Blockchains

Hello, intrepid developers! Today, we're going to dive into the thrilling world of multisig wallets on EVM (Ethereum Virtual Machine) blockchains. These wallets are like your private digital vault, guarded by not just one key (or signature), but multiple! If you're looking to level up your blockchain development skills or add an extra layer of security to your transactions, buckle up! We're in for a wild ride. 🚀

<img src="https://media.giphy.com/media/mi6DsSSNKDbUY/giphy.gif" width="500px" />

## What is a Multisig Wallet?

Multisig (short for multi-signature) wallets require more than one private key to authorize a transaction. Think of it like a nuclear launch protocol in a spy movie - you need the agreement of multiple parties before sending your crypto off into the blockchain ether.

These wallets are particularly handy for decentralization, collaboration, and added security. They're also essential when it comes to safely handling more complex types of transactions, such as those used by Gnosis Safe Wallet. Now, let's dive into the nuts and bolts of creating a multisig wallet in any EVM blockchain!

## Creating a Multisig Wallet

For our code examples, we'll use Solidity, the most common smart contract language for EVM blockchains. We will also assume that the version of Solidity being used is 0.8.0 or higher. 

Let's start by defining our multisig wallet contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultisigWallet {

    // Event that will be emitted whenever a transaction is proposed
    event TransactionProposed(address proposer, uint transactionId, address to, uint value, bytes data);
    // Event that will be emitted whenever a transaction is executed
    event TransactionExecuted(address executor, uint transactionId);
    // Event that will be emitted whenever a transaction is approved
    event TransactionApproved(address approver, uint transactionId);

    struct Transaction {
        address to;
        uint value;
        bytes data;
        uint numApprovals;
        bool executed;
        mapping(address => bool) approvals;
    }

    address[] public owners;
    uint public numApprovalsRequired;

    mapping(uint => Transaction) public transactions;
    uint public transactionCount;

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "not an owner");
        _;
    }

    modifier transactionExists(uint _transactionId) {
        require(_transactionId < transactionCount, "transaction does not exist");
        _;
    }

    modifier notExecuted(uint _transactionId) {
        require(!transactions[_transactionId].executed, "transaction already executed");
        _;
    }

    modifier notApproved(uint _transactionId) {
        require(!transactions[_transactionId].approvals[msg.sender], "transaction already approved");
        _;
    }

    constructor(address[] memory _owners, uint _numApprovalsRequired) {
        require(_owners.length >= _numApprovalsRequired, "number of approvals required should be less than or equal to the number of owners");
        owners = _owners;
        numApprovalsRequired = _numApprovalsRequired;
    }

    // Allow owners to propose transactions
    function proposeTransaction(address _to, uint _value, bytes memory _data) onlyOwner public returns (uint) {
        uint transactionId = transactionCount;
        transactions[transactionId]

 = Transaction(_to, _value, _data, 0, false);
        transactionCount++;

        emit TransactionProposed(msg.sender, transactionId, _to, _value, _data);
        return transactionId;
    }

    // Allow owners to approve transactions
    function approveTransaction(uint _transactionId) onlyOwner transactionExists(_transactionId) notExecuted(_transactionId) notApproved(_transactionId) public {
        Transaction storage transaction = transactions[_transactionId];
        transaction.numApprovals++;
        transaction.approvals[msg.sender] = true;

        emit TransactionApproved(msg.sender, _transactionId);

        if (transaction.numApprovals >= numApprovalsRequired) {
            transaction.executed = true;
            (bool success,) = transaction.to.call{value: transaction.value}(transaction.data);
            require(success, "transaction failed");

            emit TransactionExecuted(msg.sender, _transactionId);
        }
    }
}
```

This contract allows owners to propose and approve transactions. When the number of approvals reaches the required threshold (`numApprovalsRequired`), the transaction is executed.

## Using the Multisig Wallet

Let's assume we have a deployed multisig wallet contract at address `multisigWalletAddress`. We'll use Web3.js to interact with the contract:

```javascript
// Import the Web3 library
const Web3 = require('web3');

// Connect to the blockchain
const web3 = new Web3('https://your-rpc-url.com');

// Define the ABI of the multisig wallet contract
const multisigWalletABI = [/* ... */];

// Create a new contract instance
const multisigWallet = new web3.eth.Contract(multisigWalletABI, multisigWalletAddress);

// Propose a transaction
const proposeTransaction = async (account, to, value, data) => {
  const gasPrice = await web3.eth.getGasPrice();
  const tx = multisigWallet.methods.proposeTransaction(to, value, data);
  const gas = await tx.estimateGas({ from: account.address });
  const txData = tx.encodeABI();

  const signedTx = await web3.eth.accounts.signTransaction({
    to: multisigWalletAddress,
    data: txData,
    gas,
    gasPrice,
  }, account.privateKey);

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

// Approve a transaction
const approveTransaction = async (account, transactionId) => {
  const gasPrice = await web3.eth.getGasPrice();
  const tx = multisigWallet.methods.approveTransaction(transactionId);
  const gas = await tx.estimateGas({ from: account.address });
  const txData = tx.encodeABI();

  const signedTx = await web3.eth.accounts.signTransaction({
    to: multisigWalletAddress,
    data: txData,
    gas,
    gasPrice,
  }, account.privateKey);

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};
```

The `proposeTransaction` and `approveTransaction` functions can be used by the owners of the multisig wallet to propose and approve transactions, respectively.

And there you have it! You've created a multisig wallet in an EVM-compatible blockchain and learned how to interact with it. This will add an extra layer of security and democratization to your transactions.

Don't forget, with great power comes great responsibility. Always keep your keys safe and never share them with anyone.

Happy coding! 🚀💻

<img src="https://media.giphy.com/media/Ws6T5PN7wHv3cY8xy8/giphy.gif" width="500px" />