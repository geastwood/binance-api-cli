# Auto trading wrapping around Binance

# Setup
run `fat config` to specify the *apiKey* and *secret* for accessing the full
feature

# Commands

* symbol -> provide exchange infos [GET]
* account -> provide account info [GET] // TODO
* balance -> provide your current balance [GET]
* config -> setup secret and apiKey

## excamples
* `node dist/index.js exchange|version|help`

### Exchange
* `node dist/index.js exchange --base=ADA` => find asset ADA
* `node dist/index.js exchange` => print summary of exchange

### Account
* `node dist/index.js account` => get account meta and balances
* `node dist/index.js account --hideSmall --smallThreshold` => filtering balances
    --threshold[=0]

### Price
* `node dist/index.js price --symbol=ETHBTC` => get current price of a symbol

### Trade

* node dist/index.js trade --symbol=NANOBTC --format=short --orderId=35083389
* --symbol
* --format => specify format summary* | short
* --orderId => filter by orderId


## TODOs
* [ ] handle error in api module
* [ ] add account info
* [ ] estimate balance in BTC
* [x] filter symbol list with one symbol

## Calculation

Given you bought C1/BTC with price P1 for quantity of Q1

the total cost is the sum of V1 and transaction cost T1

* V1 = (P1 * Q1) - T1 * PBNB
