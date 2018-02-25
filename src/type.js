/* @flow */
/* eslint-disable */

declare type TCommand = 'symbol' | 'help' | 'version' | 'balance' | 'price' | 'trade' | 'config'

declare type TCommandSupported = Array<TCommand>

declare type TCommandRunable = {|
    run: (args: any) => mixed,
|}

declare type TConfigtore = {|
    apiKey: string,
    secret: string,
|}
