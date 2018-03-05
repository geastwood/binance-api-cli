# Auto trading wrapping around Binance

# Setup
run `atcb config` to specify the *apiKey* and *secret* for accessing the full
feature

# Commands

* balance -> provide your current balance
* trade -> get trade and order info
* live -> use websocket to monitor selected symbols
* price -> get price for trade symbol
* config -> setup secret and apiKey
* symbol -> provide exchange infos [GET]

### Exchange
* `atcb symbol --base=ADA` => find asset ADA
* `atcb symbol` => print summary of exchange

### Account
* `atcb balance` => get account meta and balances
* `atcb balance --hideSmall --smallThreshold` => filtering balances --threshold[=0]
* `atcb balance --hideSmall --summary` => list your balance with attribution

### Price
* `atcb price --symbol=ETHBTC` => get current price of a symbol

### Trade
* `node dist/index.js trade --symbol=NANOBTC --format=short --orderId=35083389`
* --symbol
* --format => specify format summary* | short
* --orderId => filter by orderId


## TODOs
* [x] add monitor command, let use repeatly add order Id to moniter, use
    websocket if possible
* [ ] design a plugin/event system, websocket emit data, mutiple listners
    receive events
* [ ] prepare to open source ↑
* [ ] analyse candlestick
* [ ] run algorithm again historical data
* [ ] filter live by symbol ↓
* [ ] live -> one line verson ↓
* [x] ⌐ interactively choose order id via multiselect
* [x]   display win/loose on order/trade
* [ ] ⌙ handle exception not finding the order
* [x] ⌐ estimate balance in BTC
* [x] ⌙ nicely layout it's contribution
* [-] expose `help` in command interface, run command without args will show help section
* [ ] handle error in api module
* [ ] add account info ↡
