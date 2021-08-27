// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract CampaignFactory {
    address[] public deployedContracts;

    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedContracts.push(newCampaign);

        emit CampaignFactoryAction("New campaign deployed via CampaignFactory");
    }

    function getDeployedContracts() public view returns (address[] memory) {
        

        return deployedContracts;
    }

    event CampaignFactoryAction(string actionTaken);
}

contract Campaign {
    event CampaignAction(string actionTaken);

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(address => bool) public approvals;
    uint256 public approversCount;

    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
    }

    Request[] public requests;

    constructor(uint256 _minimumContribution, address creator) {
        manager = creator;
        minimumContribution = _minimumContribution;

        emit CampaignAction("Campaign was created");
    }

    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "You must contribute a minimum amount of wei"
        );

        approvers[msg.sender] = true;

        approversCount++;

        emit CampaignAction("Contribution was made");
    }

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
        Request storage request = requests[_index];

        require(
            !approvals[msg.sender],
            "You can't approve request more than once"
        );

        request.approvalCount++;

        addApprovals(msg.sender);

        emit CampaignAction("Approval request sent");
    }

    function addApprovals(address approver) private {
        approvals[approver] = true;
    }

    function finalizeRequest(uint256 _index) public onlyApprover {
        //using storage keyword to show that we are looking at the same Request that already exist in storage
        Request storage request = requests[_index];

        require(
            !request.complete,
            "You can't finalize a request more than once!"
        );
        require(
            request.approvalCount > (approversCount / 2),
            "At least 50% of the approvers must have approved this request before it can be finalized"
        );

        request.complete = true;
        request.recipient.transfer(request.value);

        emit CampaignAction("Request was finalized");
    }

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

    modifier onlyApprover() {
        require(approvers[msg.sender], "Your must be an approver");
        _;
    }

    modifier onlyOwner() {
        require(
            manager == msg.sender,
            "Only the owner can perform this action!"
        );
        _;
    }
}
