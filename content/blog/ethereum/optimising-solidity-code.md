---
layout: Post
title: Optimising solidity code
description: Welcome again to the world of Solidity, where every gas unit saved is a victory. But how does one ensure that their Solidity code is optimised, clean, and gas-efficient? In this article, we will delve into some key concepts and practices to do just that, while sticking closely to the Solidity Style Guide.
date: '2023-06-02'
tags:
  - ethereum
images:
  - src: /photos/blog-optimising-solidity-code.png
    alt: optimising-solidity-code
featured: true
---

## Optimising Solidity Code: How to Get It Right

Welcome again to the world of Solidity, where every gas unit saved is a victory. But how does one ensure that their Solidity code is optimised, clean, and gas-efficient? In this article, we will delve into some key concepts and practices to do just that, while sticking closely to the Solidity Style Guide. Grab a cup of coffee and let's get started!

#### The Art of Variable Declaration

Variables are the backbone of your code. Handle with care, or you'll pay the price (literally) in gas.

**NO:**
```solidity
uint256 public foo = 10;
address public contractAddress;
```
Public state variables create automatic getter functions, costing gas each time they're invoked.

**YES:**
```solidity
uint256 internal _foo = 10;
address private _contractAddress;

function getFoo() external view returns (uint256) {
    return _foo;
}

function getContractAddress() external view returns (address) {
    return _contractAddress;
}
```
By making variables internal or private and creating specific getter functions, you limit external access, potentially saving gas.

#### Refining the Use of Structs

Structs should be sleek and efficient. The right order can save you from gas wastage.

**NO:**
```solidity
struct BadExample {
    uint8 smallValue;
    address addr;
    uint256 bigValue;
}
```
This poorly arranged struct can result in storage padding, wasting gas.

**YES:**
```solidity
struct GoodExample {
    address addr;
    uint256 bigValue;
    uint8 smallValue;
}
```
Placing variables in descending order by size ensures efficient storage use, saving on gas.

#### Mastering Loops

Just like in a symphony, every loop in Solidity needs to hit the right note to avoid any dissonance.

**NO:**
```solidity
for (uint256 i = 0; i < expensiveArray.length; i++) {
    // Complex operations
}
```
This loop can cause an outrageous gas bill, especially with large arrays and complex operations.

**YES:**
```solidity
uint256 len = expensiveArray.length;
for (uint256 i = 0; i < len; i++) {
    // Complex operations
}
```
By storing the array length in memory, you can save gas since memory reading is cheaper than storage reading.

#### Elevating Function Calls

Functions are the lifeblood of your contract. Ensure they flow well without bleeding gas unnecessarily.

**NO:**
```solidity
function calculateAndStore() public {
    uint256 calcResult = complexCalculation();
    expensiveArray.push(calcResult);
}

function complexCalculation() public returns (uint256) {
    // Complex operations
}
```
Every public function call has a cost. If a function doesn't need to be public, it shouldn't be.

**YES:**
```solidity
function calculateAndStore() public {
    uint256 calcResult = _complexCalculation();
    expensiveArray.push(calcResult);
}

function _complexCalculation() internal returns (uint256) {
    // Complex operations
}
```
By making function calls internal when possible, you can save gas since they don't create a new EVM (Ethereum Virtual Machine) context.

#### Embracing Libraries

Libraries are a gift, make sure to unwrap them.

For example, consider using OpenZeppelin's SafeERC20 library when dealing with token transfers to help with gas optimization and safer code:

```solidity
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract MyContract {
    using SafeERC20 for IERC20;

    function safeTransfer(
        address token,
        address recipient,
        uint256 amount
    ) external {
        IERC20(token).safeTransfer(recipient, amount);
    }
}
```
Utilizing well-tested libraries not only provides gas optimization but also prevents potential bugs and vulnerabilities.

#### Efficient Use of Events

Events can provide important insights but shouldn't be used excessively. 

**NO:**
```solidity
event HighGasUsageEvent(uint256 indexed value);

function emitEvent(uint256 _value) public {
    emit HighGasUsageEvent(_value);
}
```
This event is emitted every time the function is called, which can be gas-intensive.

**YES:**
```solidity
event EfficientEvent(uint256 indexed value);

function emitEventIfNeeded(uint256 _value) public {
    if (_value > threshold) {
        emit EfficientEvent(_value);
    }
}
```
Emitting events conditionally can save gas when the conditions aren't met.

#### Reduce Redundant Variable Assignments

Assigning and storing unnecessary variables can increase gas costs.

**NO:**
```solidity
uint256 public _bar = 10;
function setBar(uint256 _value) public {
    _bar = _value;
    _bar = _bar * 2;
}
```
The redundant assignment increases gas costs.

**YES:**
```solidity
uint256 public _bar = 10;
function setBar(uint256 _value) public {
    _bar = _value * 2;
}
```
By eliminating redundant assignments, you save gas.

#### Short-circuiting in Conditionals

By ordering conditions appropriately, we can optimize the code for gas usage.

**NO:**
```solidity
if (complexOperation() && simpleOperation()) {
    // do something
}
```
Here, the complex operation is always executed, consuming gas even if the simple operation is false.

**YES:**
```solidity
if (simpleOperation() && complexOperation()) {
    // do something
}
```
By performing the simple operation first, we can short-circuit the condition if it's false, saving gas.

#### Avoiding Expensive Operations

Operations like `SSTORE` and `SLOAD` are quite expensive and should be avoided when possible.

**NO:**
```solidity
uint256 public _foo = 10;

function expensiveOperation() public {
    _foo = _foo + 1;
    _foo = _foo - 1;
}
```
This function performs unnecessary `SSTORE` operations.

**YES:**
```solidity
uint256 public _foo = 10;

function cheaperOperation() public {
    uint256 newFoo = _foo + 1;
    newFoo = newFoo - 1;
    if (newFoo != _foo) {
        _foo = newFoo;
    }
}
```
By minimizing storage operations, you can save a considerable amount of gas.

#### Caching Contract Addresses

Reading external contract addresses from the blockchain is expensive.

**NO:**
```solidity
function getExternalContractBalance() public view returns (uint256) {
    IERC20 token = IERC20(externalContractAddress);
    return token.balanceOf(address(this));
}
```
This function calls an external contract address directly, consuming more gas.

**YES:**
```solidity
IERC20 private _token = IERC20(externalContractAddress);

function getCachedContractBalance() public view returns (uint256) {
    return _token.balanceOf(address(this));
}
```
Caching external contract instances can help to reduce gas costs significantly.

Absolutely! Here are five more points for Solidity code optimization:

#### Utilize Bitwise Shifting Over Multiplication/Division

Using bitwise shifting can save gas over traditional multiplication or division.

**NO:**
```solidity
uint256 public _foo = 10;

function expensiveCalculation() public {
    _foo = _foo * 2; // Multiply by 2
    _foo = _foo / 2; // Divide by 2
}
```
Multiplication and division operations consume more gas.

**YES:**
```solidity
uint256 public _foo = 10;

function cheaperCalculation() public {
    _foo = _foo << 1; // Multiply by 2
    _foo = _foo >> 1; // Divide by 2
}
```
Bitwise shifting can serve as a cheaper alternative for multiplying or dividing by powers of 2.

#### Take Advantage of Function Modifiers

Proper use of function modifiers can simplify code and save gas.

**NO:**
```solidity
function performAction() public {
    require(msg.sender == owner, "Not the contract owner");
    // action
}
```
Every function call performs the ownership check, wasting gas if the sender is not the owner.

**YES:**
```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _;
}

function performAction() public onlyOwner {
    // action
}
```
By using function modifiers, we can streamline common checks, making the code cleaner and more gas-efficient.

#### Optimize Array Usage

Managing array size and eliminating redundancy can save significant gas.

**NO:**
```solidity
uint256[] public _array;

function addToArray(uint256 _value) public {
    _array.push(_value);
}

function removeFromArray() public {
    _array.pop();
}
```
Adding and removing elements at the end of an array consumes more gas.

**YES:**
```solidity
uint256[] public _array;

function addToArray(uint256 _value) public {
    _array[_array.length] = _value;
}

function removeFromArray(uint256 index) public {
    delete _array[index];
}
```
By deleting an element, we leave a "gap" in the array which consumes less gas than resizing the array.

#### Favor `bytes32` Over `string`

`bytes32` consumes less gas compared to `string` for smaller, fixed-sized strings.

**NO:**
```solidity
string public _name = "Bob";
```
String types are more gas-intensive due to their dynamic nature.

**YES:**
```solidity
bytes32 public _name = "Bob";
```
`bytes32` is a fixed-size type and is cheaper to use when appropriate.

#### Leverage Delegatecall

Using `delegatecall` helps keep call data within the context of the calling contract, thus saving gas.

**NO:**
```solidity
function externalCall() public {
    externalContractAddress.call(
        abi.encodeWithSignature("externalFunction()")
    );
}
```
External calls consume more gas and don't keep the execution context.

**YES:**
```solidity
function delegateCallToExternalFunction() public {
    externalContractAddress.delegatecall(
        abi.encodeWithSignature("externalFunction()")
    );
}
```
`delegatecall` can reduce gas costs by sharing the calling contract's context, including storage.

As always, while these tips should help you write more gas-efficient code, remember that readability and security should never be sacrificed in the pursuit of optimization. Happy coding!

-----

As a final note, always remember to strive for a balance between readable, efficient, and secure code. Optimising your Solidity code is an art, and like any form of art, it requires practice and creativity. So, get your hands dirty, make some mistakes, and eventually, you will craft your own masterpiece. Happy coding!