pragma solidity ^0.4.17

library SafeMath {

    function mul(uint a, uint b) internal pure returns (uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function div(uint a, uint b) internal pure returns (uint) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    function sub(uint a, uint b) internal pure returns (uint) {
        assert(b <= a);
        return a - b;
    }

    function add(uint a, uint b) internal pure returns (uint) {
        uint c = a + b;
        assert(c >= a);
        return c;
    }
}

contract oneWinsAll {

	using SafeMath for uint;

	event purchased(address indexed _user,  unit _tiktid);
    event rewrdpaid(address indexed _winner,uint _tiktid, uint256 _amount);

    uint public price =  5;
    uint public maxid = 25;

    address[26] public ticketmapping;
    uint public sold = 0;

    modifier allsold() {
     require(sold == ntikt);
     _;
    }

    function() payable public {
        revert();
    }

    function join(unit _tikt) payable public returns (bool) {
        require(msg.value == price);
        require(_tikt >=1 && _tikt <= maxid);
        require(ticketmapping[_tikt] == address[0]);
        require(sold < maxid);

        address user = msg.sender;
        sold += 1;
        ticketmapping[_tikt] = user;
        emit purchased(user, _tikt);

        if (sold == maxid) {
            sendrwrd();
        }
        return true;
    }

    function sendrwrd() public allsold returns (address) {
        uint winnertikt= picker();
        address winner = ticketmapping[winnertikt];
        uint256 amount = mul(maxid, price);
        
    }
}