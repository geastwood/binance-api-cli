# Auto trading wrapping around Binance

# Commands

* symbol -> provide exchange infos [GET]
* account -> provide account info [GET] // TODO
* balance -> provide your current balance [GET]

## excamples
* `node src/index.js exchange|version|help`

### Exchange
* `node src/index.js exchange --base=ADA` => find asset ADA
* `node src/index.js exchange` => print summary of exchange

### Account
* `node src/index.js account` => get account meta and balances
* `node src/index.js account --hideSmall --smallThreshold` => filtering balances
    --threshold[=0]

### Price
* `node src/index.js price --symbol=ETHBTC` => get current price of a symbol


## TODOs
* [ ] add account info
* [ ] estimate balance in BTC
* [ ] filter symbol list with one symbol
