/* @flow */
/* eslint-disable */

declare type TCommand = 'symbol' | 'help' | 'version' | 'balance' | 'price' | 'trade' | 'health'

declare type TCommandSupported = Array<TCommand>

declare type TCommandRunable = {|
    run: (args: any) => mixed,
|}
