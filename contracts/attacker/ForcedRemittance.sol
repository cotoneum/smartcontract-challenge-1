pragma solidity 0.7.6;

contract ForcedRemittance {
    constructor(address payable _target) payable {
        require(address(this).balance != 0, "rule: send at least one wei");
        selfdestruct(_target);
    }
}
