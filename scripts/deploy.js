const { ethers } = require("hardhat");

const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("deploying contract with account -> ", deployer.address);
  let balance = accountBalance.toString();
  balance = ethers.utils.formatEther(balance);

  console.log("account balance -> ", balance);

  const gmContractFactory = await hre.ethers.getContractFactory("gm");
  const gmContract = await gmContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await gmContract.deployed();

  console.log("contracted deployed to -> ", gmContract.address);
};

const run = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

run();
