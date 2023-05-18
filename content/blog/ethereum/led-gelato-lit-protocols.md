---
layout: Post
title: Using Web3 Functions - LED by Chainlink, Gelato, and Lit Protocol
description: We'll explore some fascinating Web3 functions, brought to you by the likes of Chainlink, Gelato, and Lit protocol. Get ready for some fun, laughter, and... yes, code. Lots of code.
date: '2023-05-15'
tags:
  - ethereum
images:
  - src: /photos/blog-led-gelato-lit-protocols.png
    alt: led-gelato-lit-protocols
featured: true
---

# Using Web3 Functions - LED by Chainlink, Gelato, and Lit Protocol

Hello, code-slinging comrades! Buckle up because we're about to embark on a thrill-packed, mind-bending escapade through the vast expanse of Web3. This isn't your average walk in the park. We're diving deep into the oceanic depths of Chainlink, Gelato, and Lit protocol. If you thought our previous journey was fun, you ain't seen nothing yet.

## Chainlink - The Oracle of All Oracles

First up, Chainlink - the oracle that has other oracles checking under their beds at night. Chainlink connects your Ethereum-based smart contracts to the external world in a secure and reliable way. Let's delve into a more advanced example that involves Chainlink VRF (Verifiable Random Function) to generate provably fair random numbers:

```solidity
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract ChainlinkVRFExample is VRFConsumerBase {
  
  bytes32 internal keyHash;
  uint256 internal fee;
  
  uint256 public randomResult;
  
  constructor() VRFConsumerBase(
    0xf0d54349aDdcf704F77AE15b96510dEA15cb7952, // VRF Coordinator
    0x514910771AF9Ca656af840dff83E8264EcF986CA  // LINK Token
  ) public {
    keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
    fee = 0.1 * 10 ** 18; // 0.1 LINK
  }
  
  function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
    return requestRandomness(keyHash, fee, userProvidedSeed);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    randomResult = randomness;
  }
}
```

This contract uses Chainlink VRF to generate a random number, which is then stored in `randomResult`. The real fun begins when `requestRandomness` is called. It's the function that communicates with the VRF Coordinator to initiate the process.

## Gelato - The Blockchain's Personal Assistant

Next, we have Gelato - the Alfred to your Batman; the Jarvis to your Iron Man. Gelato is all about automation, making your smart contract operations run smoothly. Let's explore a more complex use-case where Gelato helps to automate the process of yield farming:

```solidity
pragma solidity ^0.6.2;

import "@gelatonetwork/core/contracts/gelato_core/GelatoCore.sol";
import "@uniswap/v2-periphery/contracts/UniswapV2Router02.sol";

contract GelatoYieldFarmingExample {

  GelatoCore public gelato;
  UniswapV2Router02 public uniswap;
  
  constructor(address _gelatoAddress, address _uniswapAddress) public {
    gelato = GelatoCore(_gelatoAddress);
    uniswap = UniswapV2Router02(_uniswapAddress);
  }

  function automateYieldFarming(address[] memory _path, uint256 _amountIn, uint256 _amountOutMin) public {
    bytes memory data = abi.encodeWithSelector(uniswap.swapExactTokensForTokens.selector, _amountIn, _

amountOutMin, _path, address(this), block.timestamp);
    gelato.execTransaction(address(uniswap), data, 0, 0, 21000, tx.gasprice, address(0), address(this), block.timestamp + 1 days);
  }
}
```

This contract uses Gelato to automate yield farming. It swaps tokens using Uniswap at regular intervals to maximize returns. The `automateYieldFarming` function encodes the Uniswap function call and sends it to Gelato for execution.

## Lit Protocol - A Beacon in the Dark

Finally, we arrive at Lit protocol, our beacon in the blockchain wilderness. Lit protocol provides us with a secure way to share data. Let's see how we can use Lit protocol to create a decentralized social network:

```solidity
pragma solidity ^0.7.4;

import "@litprotocol/contracts/contracts/LitEntry.sol";

contract LitSocialNetworkExample {

  LitEntry public litEntry;

  struct Post {
    address author;
    bytes32 content;
  }

  Post[] public posts;

  constructor(address _litAddress) public {
    litEntry = LitEntry(_litAddress);
  }

  function createPost(bytes32 _content) public {
    litEntry.write(_content);
    posts.push(Post(msg.sender, _content));
  }

  function getPost(uint256 _index) public view returns (address, bytes32) {
    Post memory post = posts[_index];
    return (post.author, litEntry.read(post.content));
  }
}
```

This contract creates a basic social network using the Lit protocol. Users can create posts, and these posts can be read by anyone. The `createPost` function writes data to the Lit protocol, and `getPost` function retrieves it.

## That's All Folks

Phew! That was a rollercoaster ride of code, logic, and blockchain. We've delved deeper into Chainlink, Gelato, and Lit protocol, exploring advanced features and complex use-cases. I hope you've enjoyed this journey as much as I have.

Remember, Web3 is a gigantic, thrilling universe. There's always more to explore, more to learn, and more to code. So keep hacking, keep learning, and most importantly, keep laughing. Blockchain is not just about decentralization and security; it's also about creativity, innovation, and the occasional chuckle.

Until our next coding adventure, happy trails!