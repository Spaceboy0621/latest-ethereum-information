import React, {useEffect, useState} from "react";
import Link from "next/link";
import Footer from "components/Footers/Footer.js";
import { Row, Col, Button } from "reactstrap"
import http from 'http';
import Web3 from 'Web3';
import { objectPosition } from "tailwindcss/defaulttheme";
//free etherium node https://main-light.eth.linkpool.io
const web3 = new Web3(new Web3.providers.HttpProvider("https://main-light.eth.linkpool.io"));

export default function Index() {
  const [blocks, setBlocks] = useState([])
  const [btnstatue, setBtnstatue] = useState('false')

  let blocknumber = ""
  let transactionCount = ""
  let miner = ""
  let totalDifficulty = ""
  
  useEffect(() => {
    const interval = setInterval(() => {
      web3.eth.getBlockNumber(function(err, result){
        blocknumber = result
        web3.eth.getBlockTransactionCount(blocknumber, function(error, res){
          transactionCount = res
        }) 
        web3.eth.getBlock(blocknumber, false, function(error, resb){
          if (resb) {
            totalDifficulty = resb.totalDifficulty
            miner = resb.miner
          }
          
          const block = {
            blocknumber, miner, transactionCount, totalDifficulty
          }
          setBlocks(block)
        })
      })
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  console.log('block', blocks)

  const handlechangeState = (param) => {
    setBtnstatue(param)
  }

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          {
            btnstatue === 'false' ?
              <div className="starsContainer">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
              </div> :
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('img/Ether13.jpg')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-75 bg-black"
                ></span>
              </div> 
          }
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <h1 className="text-white text-4xl py-6">Latest Etherium Information</h1>
                <div className="text-white w-8/12 px-4 text-right">
                  <div className="flex flex-wrap">
                    <div className="md:w-2/12 w-2/12 px-4">
                      Block Number
                    </div>
                    <div className="md:w-4/12 w-4/12 px-4">
                      Miner
                    </div>
                    <div className="md:w-3/12 px-4 w-2/12">
                      TransactionCount
                    </div>
                    <div className="md:w-3/12 w-3/12 px-4">
                      TotalDifficulty
                    </div>
                  </div>
                </div>
                {
                  btnstatue === 'false' ?
                  <>
                    <div className="text-white w-8/12 px-4 text-right">
                      <div className="flex flex-wrap">
                        <div className="md:w-2/12 w-2/12 px-4">
                          {blocks.blocknumber}
                        </div>
                        <div className="md:w-4/12 w-4/12 px-4">
                          {blocks.miner}
                        </div>
                        <div className="md:w-3/12 w-2/12 px-4">
                          {blocks.transactionCount}
                        </div>
                        <div className="md:w-3/12 w-3/12 px-4">
                          {blocks.totalDifficulty}
                        </div>
                      </div>
                    </div>
                    </>: ""
                  }
                    <div className="mt-6 w-8/12 text-center px-4">
                        {btnstatue === 'false' ? 
                        <Button className="bg-red-600 text-white p-2" color='primary' onClick={() => handlechangeState('true')}>
                          Stop
                        </Button> :
                        <Button className="bg-lightBlue-400 text-white p-2" color='primary' onClick={() => handlechangeState('false')}>
                          Resume
                        </Button>
                        }
                    </div> 
                  
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
