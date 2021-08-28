// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

//this contract creates campaigns and tracks the campaigns that have been deployed
contract CampaignFactory {
    //stores deployed campaigns in array
    address[] public deployedContracts;

    //creates campaign and adds it to the array for tracking
    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedContracts.push(newCampaign);

        emit CampaignFactoryAction("New campaign deployed via CampaignFactory");
    }

    //returns an array of deployed campaign contract addresses
    function getDeployedContracts() public view returns (address[] memory) {
        return deployedContracts;
    }

    event CampaignFactoryAction(string actionTaken);
}

contract Campaign {
    event CampaignAction(string actionTaken);

    //stores manager/contract creator
    address public manager;

    //stores min. contribution to create a Campaign
    uint256 public minimumContribution;

    //stores approvers/contributors
    mapping(address => bool) public approvers;
    mapping(address => bool) public approvals;

    //stores the number of approvers (used in the formula when determining if > 50% have approved request)
    uint256 public approversCount;

    //struct stores Request info
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
    }

    //stores array of campaign request
    Request[] public requests;

    //constructor requires a min. wei amount, and the creators eth address
    constructor(uint256 _minimumContribution, address creator) {
        manager = creator;
        minimumContribution = _minimumContribution;

        emit CampaignAction("Campaign was created");
    }

    //
    function contribute() public payable {
        //validates the minimum contribution amount is sent to the Campaign contract
        require(
            msg.value >= minimumContribution,
            "You must contribute a minimum amount of wei"
        );

        //adds the contributors address to the approver array and increments the approver count by 1
        approvers[msg.sender] = true;
        approversCount++;

        emit CampaignAction("Contribution was made");
    }

    //creates a campaign request only is the caller is the owner of the contract
    function createRequest(
        string memory _description,
        uint256 _value,
        address payable _recipient
    ) public onlyOwner {
        Request memory newRequest = Request({
            description: _description,
            value: _value,
            recipient: _recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);

        emit CampaignAction("Request created");
    }

    function approveRequest(uint256 _index) public onlyApprover {
        //retrieves the campaign request from the ethereum blockchain
        Request storage request = requests[_index];

        //makes sure contract caller does not approve request more than once
        require(
            !approvals[msg.sender],
            "You can't approve request more than once"
        );

        //increments the approvalCount by 1
        request.approvalCount++;
        addApprovals(msg.sender);

        emit CampaignAction("Approval request sent");
    }

    //helper function to add callers address to approvals mapping
    function addApprovals(address approver) private {
        approvals[approver] = true;
    }

    function finalizeRequest(uint256 _index) public onlyApprover {
        //using storage keyword to show that we are looking at the same Request that already exist in storage
        Request storage request = requests[_index];

        //validates request has not already been approved
        require(
            !request.complete,
            "You can't finalize a request more than once!"
        );

        //validates more than 50% of the approvers have approved te request
        require(
            request.approvalCount > (approversCount / 2),
            "At least 50% of the approvers must have approved this request before it can be finalized"
        );

        //sets the request as approved and transfers the ETH to the recipient address in the request 
        request.complete = true;
        request.recipient.transfer(request.value);

        emit CampaignAction("Request was finalized");
    }

    //returns a summary of the campaign request in a Result object
    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    //modifier to check if address is an approver
    modifier onlyApprover() {
        require(approvers[msg.sender], "Your must be an approver");
        _;
    }

    //modifier to check if the caller is the contract owner
    modifier onlyOwner() {
        require(
            manager == msg.sender,
            "Only the owner can perform this action!"
        );
        _;
    }
}
