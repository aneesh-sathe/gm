const main = async () => {
  const [owner, user] = await hre.ethers.getSigners();
  const gmContractFactory = await hre.ethers.getContractFactory("gm");
  const gmContract = await gmContractFactory.deploy({
    value: hre.ethers.utils.parseEther("100"),
  });
  await gmContract.deployed();
  console.log("contract deployed to -> ", gmContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    gmContract.address
  );
  console.log(hre.ethers.utils.formatEther(contractBalance));

  await gmContract.getGM();
  let sentGM = await gmContract.connect(user).sendGM();
  await sentGM.wait();
  await gmContract.getGM();
  await gmContract.getByAddress(user.address);

  contractBalance = await hre.ethers.provider.getBalance(gmContract.address);
  console.log(hre.ethers.utils.formatEther(contractBalance));
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
