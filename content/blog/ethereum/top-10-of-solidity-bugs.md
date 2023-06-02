---
layout: Post
title: Top 10 Most Common Bugs in Smart Contracts
description: Below, I outline the top 10 most popular bugs in smart contracts that have been exploited by hackers to steal money, including code examples and prevention strategies.
date: '2022-12-10'
tags:
  - ethereum
images:
  - src: /photos/blog-top-10-smart-contracts-bugs.png
    alt: top-10-smart-contracts-bugs
featured: true
---

# Top 10 Most Common Bugs in Smart Contracts

Smart contracts are a cornerstone of the blockchain revolution, but they're not without their risks. Below, I outline the top 10 most popular bugs in smart contracts that have been exploited by hackers to steal money, including code examples and prevention strategies.

## 1. Reentrancy Attack

Perhaps the most infamous smart contract vulnerability, the reentrancy attack was used in the DAO hack. It occurs when a function calls an external contract before it resolves, allowing the called contract to loop back and reenter the calling function.

```solidity
function withdraw(uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    msg.sender.call.value(_amount)("");
    balances[msg.sender] -= _amount;
}
```

**Prevention:** Use the Checks-Effects-Interactions pattern, and update state before calling external contracts.

```solidity
function withdraw(uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    balances[msg.sender] -= _amount;
    msg.sender.call.value(_amount)("");
}
```

## 2. Integer Overflow and Underflow

Integer overflow and underflow occur when a uint256 variable goes beyond its maximum value and flips to zero (overflow), or when it goes below zero and flips to its maximum value (underflow).

```solidity
uint256 public totalSupply;

function mint(uint256 _amount) public {
    totalSupply += _amount;
}
```

**Prevention:** Use SafeMath library for arithmetic operations. 

```solidity
import "@openzeppelin/contracts/math/SafeMath.sol";

uint256 public totalSupply;
using SafeMath for uint;

function mint(uint256 _amount) public {
    totalSupply = totalSupply.add(_amount);
}
```

## 3. Unprotected SelfDestruct Function

SelfDestruct can be used to kill contracts and send their remaining funds to a specified address. If not properly secured, malicious actors can exploit this to destroy contracts and steal funds.

```solidity
function kill() public {
    selfdestruct(msg.sender);
}
```

**Prevention:** Implement an authorization check in the function.

```solidity
address public owner;

constructor() public {
    owner = msg.sender;
}

function kill() public {
    require(msg.sender == owner);
    selfdestruct(owner);
}
```

## 4. Unchecked Return Values

Some Solidity functions don’t throw an exception when they fail but return false instead. If these return values aren’t checked, it can lead to serious vulnerabilities.

```solidity
function transfer(address _to, uint256 _value) public {
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
}
```

**Prevention:** Always check the return value of non-view function calls.

```solidity
function safeTransfer(address _to, uint256 _value) public returns (bool) {
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
}
```

## 5. Improper Error Handling

Error handling is crucial in any programming language, and Solidity is no different. Properly implemented, it can help prevent loss of funds and other serious issues.

```solidity
function sendETH(address payable _to, uint256 _amount) public {
    (bool success, ) = _to.call.value(_amount)("");
}
```

**Prevention:** Always handle the return value of calls and use `revert()` with error messages.

```solidity
function sendETH(address payable _to, uint256 _amount) public {
    (bool success, ) = _to.call.value(_amount)("");
    if(!success) {
        revert("ETH transfer failed.");
    }
}
```

## 6. Front-Running

Front-running is a potential issue where a malicious actor can see a pending transaction and issue their own transaction with a higher gas price, causing it to be confirmed first.

```solidity
function bid(uint256 _amount) public {
    require(_amount > highestBid);
    highestBid = _amount;
    highestBidder = msg.sender;
}
```

**Prevention:** Implement commitment schemes to hide transaction information until it's confirmed.

```solidity
mapping(address => bytes32) public commitments;

function commitBid(bytes32 _commitment) public {
    commitments[msg.sender] = _commitment;
}

function revealBid(uint256 _amount, string memory _salt) public {
    require(keccak256(abi.encodePacked(_amount, _salt)) == commitments[msg.sender]);
    require(_amount > highestBid);
    highestBid = _amount;
    highestBidder = msg.sender;
}
```

## 7. Short Address Attack

A short address attack involves a hacker sending less data than expected by a function which can result in significant loss of funds.

```solidity
function transfer(address _to, uint256 _value) public {
    balances[msg.sender] -= _value;
    balances[_to] += _value;
}
```

**Prevention:** Always validate the input data length before proceeding with function execution.

```solidity
modifier onlyPayloadSize(uint256 size) {
    require(msg.data.length >= size + 4);
    _;
}

function transfer(address _to, uint256 _value) public onlyPayloadSize(2 * 32) {
    balances[msg.sender] -= _value;
    balances[_to] += _value;
}
```

## 8. Timestamp Dependency

Blockchain miners have some control over the block timestamp. Contracts using `block.timestamp` can be manipulated, allowing miners to potentially exploit a contract.

```solidity
function lottery() public {
    if(block.timestamp % 2 == 0) {
        msg.sender.transfer(address(this).balance);
    }
}
```

**Prevention:** Avoid reliance on `block.timestamp` for critical logic.

```solidity
function lottery(uint256 userProvidedSeed) public {
    bytes32 blockHash = blockhash(block.number - 1);
    uint256 randomNumber = uint(keccak256(abi.encodePacked(userProvidedSeed, blockHash)));
    if(randomNumber % 2 == 0) {
        msg.sender.transfer(address(this).balance);
    }
}
```

## 9. Incorrect Constructor Name

Prior to Solidity 0.4.22, a contract’s constructor was a function with the same name as the contract. If the contract’s name was changed without changing the constructor's name, the constructor function would not execute upon contract creation.

```solidity
contract MyContract {
    uint256 public x;

    function MyContract() public {
        x = 10;
    }
}
```

**Prevention:** Use the `constructor` keyword for constructor functions.

```solidity
contract MyContract {
    uint256 public x;

    constructor() public {
        x = 10;
    }
}
```

## 10. Inadequate Testing and Code Review

A lack of thorough testing and code review is a common cause of contract vulnerabilities. Complex contracts can have vulnerabilities that are not immediately apparent.

```solidity
contract ComplexContract {
    // Complex code with multiple dependencies and interactions
}
```

**Prevention:** Always thoroughly test your contracts and conduct peer reviews of the code. Use tools such as Truffle or Hardhat for testing, and consider professional auditing for high-value contracts.

```solidity
contract ComplexContract {
    // Complex code with multiple dependencies and interactions
}

// Example test in Truffle
contract('ComplexContract', (accounts) => {
    it('should pass all the tests', async () => {
        const complexContractInstance = await ComplexContract.deployed();
        // Write comprehensive test cases here
    });
});
```

Remember, every contract is unique, and new vulnerabilities can still emerge. Staying up-to-date with the latest security practices is a must for every Solidity developer.