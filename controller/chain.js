import http from 'http';
import Web3 from 'Web3';

//free etherium node https://main-light.eth.linkpool.io
const web3 = new Web3(new Web3.providers.HttpProvider("https://main-light.eth.linkpool.io"));

export const getBlockNumber = () => {
    let latest_block_number = ""
    //get latest block number
    web3.eth.getBlockNumber(function(err, result){
        latest_block_number = result;
        console.log(latest_block_number);

        web3.eth.getBlockTransactionCount(latest_block_number, function(error, res){
            console.log(res)
        }) 
        web3.eth.getBlock(latest_block_number, false, function(error, res){
            console.log(res.miner);
            console.log(res.totalDifficulty);
        });
        return latest_block_number
    })
    console.log('getBlocknumber')
}