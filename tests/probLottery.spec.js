const path = require('path');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/probLottery.json');
const { interface, bytecode } = require(contractPath);

// 2. 配置 provider
// const options = { gasLimit: 1e18 };
// const provider = ganache.provider(options);
// const web3 = new Web3(provider);
const web3 = new Web3(ganache.provider())

let accounts;
let contract;

describe('contract', () => {
    // 3. 每次跑单测时需要部署全新的合约实例，起到隔离的作用
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        console.log('合约部署账户：', accounts[2]);

        contract = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode })
            .send({ from: accounts[2], gas: '1000000' });
        console.log('合约部署成功：', contract.options.address);
    });

    // 4. 编写单元测试
    it('deploy a contract', () => {
        assert.ok(contract.options.address);
    });

    it('has initial sold variable as 0', async () => {
        var temp = await contract.methods.sold().call();
        assert.equal(temp, 0);
    });

    // it('can be joined', async () => {
    //     var temp = await contract.methods.sold().call();
    //     await contract.methods.join().send({ from: accounts[3], value: '500' });
    //     var aftr = await contract.methods.sold().call();
    //     assert.equal(parseInt(temp+1), parseInt(aftr));
    // });

});
