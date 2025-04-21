// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
  struct Project {
    uint id;
    string title;
    string description;
    address creator;
    uint goalAmount;
    uint deadline;
    uint amountRaised;
    bool isActive;
  }

  uint public projectCount;
  mapping(uint => Project) public projects;

  event ProjectCreated(uint id, string title, address creator);
  event ProjectFunded(uint id, address backer, uint amount);
  event FundsWithdrawn(uint id, address creator, uint amount);

  function createProject(
    string memory _title,
    string memory _description,
    uint _goalAmount,
    uint _deadline
  ) public payable {
    require(_deadline > block.timestamp, "Deadline must be in future");
    require(msg.value > 0, "Must send some Ether to create a project");

    projectCount++;
    projects[projectCount] = Project(
        projectCount,
        _title,
        _description,
        msg.sender,
        _goalAmount,
        _deadline,
        msg.value, // Initialize amountRaised with the Ether sent
        true
    );
    emit ProjectCreated(projectCount, _title, msg.sender);
  }

  function fundProject(uint _id) public payable {
    Project storage project = projects[_id];
    require(project.isActive, "Project is not active");
    project.amountRaised += msg.value;
    emit ProjectFunded(_id, msg.sender, msg.value);
  }

  function withdrawFunds(uint _id) public {
    Project storage project = projects[_id];
    require(project.creator == msg.sender, "Only creator can withdraw");
    project.isActive = false;
    payable(msg.sender).transfer(project.amountRaised);
    emit FundsWithdrawn(_id, msg.sender, project.amountRaised);
  }

  function getAllProjects() public view returns (Project[] memory) {
    Project[] memory allProjects = new Project[](projectCount);
    for (uint i = 1; i <= projectCount; i++) {
        allProjects[i - 1] = projects[i];
    }
    return allProjects;
  }
}