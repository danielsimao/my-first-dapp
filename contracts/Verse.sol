// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Verse {
    string verse;

    constructor(string memory _verse) {
        verse = _verse;
    }

    function setVerse(string memory _verse) public {
        verse = _verse;
    }

    function getVerse() public view returns (string memory) {
        return verse;
    }
}
