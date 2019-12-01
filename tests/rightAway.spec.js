const path = require('path');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/rightAway.json');
const { interface, bytecode } = require(contractPath);

// 2. 配置 provider
const web3 = new Web3(ganache.provider());

let accounts;
let contract;

describe('contract', () => {
    // 3. 每次跑单测时需要部署全新的合约实例，起到隔离的作用
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        console.log('合约部署账户：', accounts[0]);

        contract = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: bytecode  })
            .send({ from: accounts[0], gas: '1000000' });
        console.log('合约部署成功：', contract.options.address);
    });

    // 4. 编写单元测试
    it('deploy a contract', () => {
        assert.ok(contract.options.address);
    });

    it('has initial join variable as false', async () => {
        var temp = await contract.methods.join().call();
        assert.equal(temp, false);
    });

    it('can be joined', async () => {
        var guess = parseInt("5");
        let trial = function() {
            return contract.methods.play(guess).send({ from: accounts[0], value: '5' }).then( contract.methods.join().call() );
        }
        let tempvar = trial();
        tempvar.then(function() {
            assert.equal(tempvar, true);
        })

        // var guess = parseInt("5");
        // await contract.methods.play(guess).send({ from: accounts[0], value: '5' });
        // var temp = contract.methods.join().call();
        // assert.equal(temp, true);
    });
    // VM Exception thrown.

    // let AuthUser = function(data) {
    //   return google.login(data.username, data.password).then(token => { return token } )
    // }

    // let userToken = AuthUser(data)
    // console.log(userToken) // Promise { <pending> }

    // userToken.then(function(result) {
    //    console.log(result) // "Some User token"
    // })
});
