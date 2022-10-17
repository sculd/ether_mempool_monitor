// For Node >= v13 / es module environments
import BlocknativeSdk from 'bnc-sdk'
import Web3 from 'web3'
import WebSocket from 'ws' // only neccessary in server environments
import * as dotenv from 'dotenv'
dotenv.config()

// create options object
const options = {
  dappId: process.env.BLOCKNATIVE_API_KEY,
  networkId: 1,
  system: 'ethereum', // optional, defaults to ethereum
  transactionHandlers: [event => console.log(event.transaction)],
  ws: WebSocket, // only neccessary in server environments 
  name: 'Instance name here', // optional, use when running multiple instances
  onerror: (error) => {console.log(error)} //optional, use to catch errors
}

// initialize and connect to the api
const blocknative = new BlocknativeSdk(options)

var hash = "0x47b97bdb7f167801863ab5c3ca6c0371b057524ff532156a76bfb0006c14773b"
var address = '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f'

// call with the transaction hash of the
// transaction that you would like to receive status updates for
const { emitter } = blocknative.transaction(address)

// listen to some events
emitter.on('txPool', transaction => {
  console.log(`Sending ${transaction.value} wei to ${transaction.to}`)
})

emitter.on('txConfirmed', transaction => {
  console.log('Transaction is confirmed!')
})

// catch every other event that occurs and log it
emitter.on('all', transaction => {
  console.log(`Transaction event: ${transaction.eventCode}`)
})