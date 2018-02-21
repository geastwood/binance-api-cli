# Auto trading wrapping around Binance

# run the script
* `node src/index.js exchange|version|help`

## Exchange
* `node src/index.js exchange --base=ADA` => find asset ADA
* `node src/index.js exchange` => print summary of exchange

## Account
* `node src/index.js account` => get account meta and balances
* `node src/index.js account --hideSmall --threshold` => filtering balances
    --threshold[=0]


# Todos

* [x] parse symbols

