// SPDX-License-Identifer: UNLICENSED
pragma solidity ^0.8.17;
import "hardhat/console.sol";
contract gm{
    uint256 gmNum;
    uint256 private random;
    mapping(address => uint256) public timeElapsed;
    mapping(address => uint256) public addrFrequency;
    constructor() payable {
        console.log(unicode"GM!🌤️");
        random = (block.timestamp + block.difficulty) % 100;
        
    }

    function sendGM() public {
        require(timeElapsed[msg.sender] + 10 minutes < block.timestamp, "try later...");
        timeElapsed[msg.sender] = block.timestamp;
        console.log(msg.sender,unicode"has GM'ed 🌤️ you!" );
        gmNum +=1;
        addrFrequency[msg.sender]+=1;
        random = (block.timestamp + block.difficulty + random) % 100;
        if(random <= 50){

            uint256 ethAirDrop = 0.001 ether;
            require(ethAirDrop <= address(this).balance, "insufficient contract funds");
            (bool success, ) = (msg.sender).call{value: ethAirDrop}("");
            require(success, "transaction failed");
        }
       
    }

    function getGM() view public returns(uint256){
        console.log(unicode"GM's 🌤️ Received : %d", gmNum);
        return gmNum;
    }

    function getByAddress(address _add) view public returns(uint256){
        console.log(_add, unicode"has GM'ed 🌤️ to you ", addrFrequency[_add], " times!");
        return addrFrequency[_add];
    }


}

