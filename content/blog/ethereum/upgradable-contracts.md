---
layout: Post
title: Smart Contracts 2.0 - Exploring Upgradable Contracts on Ethereum
description: While smart contracts have revolutionized the way we interact with blockchain, their immutability has posed a challenge for developers who need to update or upgrade their contracts.
date: '2023-04-03'
tags:
  - ethereum
images:
  - src: /photos/blog-smart-contracts-2.0.png
    alt: smart-contracts-2.0
featured: true
---
# Smart Contracts 2.0: Exploring Upgradable Contracts on Ethereum

Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They exist across a decentralized blockchain network, such as Ethereum. While smart contracts have revolutionized the way we interact with blockchain, their immutability has posed a challenge for developers who need to update or upgrade their contracts. In this article, we will explore the concept of upgradable smart contracts and discuss the advantages, challenges, and solutions associated with this technology.

## Understanding Upgradable Smart Contracts

Traditional smart contracts are immutable, which means once they're deployed, their code cannot be altered. This can be problematic if there is a need to fix bugs, add new features, or make other changes. Upgradable smart contracts are designed to address this issue by allowing developers to make changes to their contracts after deployment.

The concept of upgradable smart contracts involves separating the contract's logic from its storage. A proxy contract is used to delegate calls to the actual implementation contract, and a separate storage contract is used to store the contract's data. This allows developers to change the logic by deploying a new implementation contract and updating the proxy contract's reference, without affecting the contract's storage.

## Advantages of Upgradable Smart Contracts

1 - **Bug fixes:** If there are any bugs or vulnerabilities discovered in a smart contract, upgradable contracts allow developers to fix them by deploying an updated version.

2 - **Feature enhancements:** Developers can add new features and functionality to their contracts as needed, improving the overall utility of the smart contract.

3 - **Reduced risks:** The ability to upgrade contracts provides a safety net for developers, reducing the risks associated with deploying faulty or incomplete code.

4 - **Protocol upgrades:** As the Ethereum network evolves, upgradable contracts can be adapted to new changes and improvements in the underlying protocols.

## Challenges of Upgradable Smart Contracts

1 - **Increased complexity:** Implementing upgradable smart contracts requires additional planning and development effort, as well as a solid understanding of the proxy pattern and storage management.

2 - **Centralization risks:** Upgradable contracts may introduce centralization risks if the upgrade process is controlled by a single entity or a small group, potentially undermining the trustless nature of blockchain.

3 - **Gas costs:** Delegating calls through a proxy contract can increase gas costs, making interactions with the smart contract more expensive for users.

## Implementing Upgradable Smart Contracts

### 1. Proxy Contract

The proxy contract is responsible for forwarding function calls to the implementation contract. It uses the `delegatecall` opcode to execute the function in the context of the proxy contract, ensuring that the storage remains with the proxy contract. 

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    address internal _implementation;

    function implementation() public view returns (address) {
        return _implementation;
    }

    function upgradeTo(address newImplementation) public {
        // Add upgrade logic here
        _implementation = newImplementation;
    }

    fallback() external payable {
        address impl = implementation();
        require(impl != address(0), "Implementation not set");
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize())
            let result := delegatecall(gas(), impl, ptr, calldatasize(), 0, 0)
            let size := returndatasize()
            returndatacopy(ptr, 0, size)

            switch result
            case 0 { revert(ptr, size) }
            default { return(ptr, size) }
        }
    }
}
```

### 2. Implementation Contract

The implementation contract contains the actual business logic. It can be upgraded by deploying a new version of the contract and updating the proxy's reference.

Here's a basic example:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Implementation {
    uint256 public number;

    function setNumber(uint256 _number) public {
        number = _number;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}
```

### 3. Storage Contract

The storage contract contains the state variables of the smart contract. The data in this contract remains intact, even if the implementation contract is upgraded.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Storage {
    uint256 public number;
}
```

In this example, when you want to upgrade the `Implementation` contract, you deploy a new version, and then call the `upgradeTo` function on the `Proxy` contract to point to the new implementation. The `Proxy` contract will now forward all calls to the new `Implementation`, but the state will remain in the `Storage` contract.

## Solutions to Upgradable Smart Contract Challenges

1 - **Minimizing complexity:** The use of well-established patterns and libraries, like OpenZeppelin's Upgrades Plugins, can help minimize the complexity of implementing upgradable contracts.

2 - **Mitigating centralization risks:** The upgrade process can be controlled by a decentralized autonomous organization (DAO) or a multisig wallet to prevent any single entity from unilaterally changing the contract.

3 - **Optimizing gas costs:** Careful contract design and optimization techniques can help mitigate the increase in gas costs.

In conclusion, upgradable smart contracts provide a powerful way to manage and improve smart contracts post-deployment. They can mitigate risks, allow for continuous improvement, and adapt to changes in the underlying blockchain protocol. However, they also come with their own set of challenges, which need to be carefully managed to fully reap their benefits.