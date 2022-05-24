
export const types = {

    authCheck: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

    addSetting: '[dashboard] Add new setting',
    updateSetting: '[dashboard] Update setting',

    coinsLoaded : '[dashboard] Load selected coin list',
    addCoin: '[dashboard] Add new coin to list',
    deleteCoin: '[dashboard] Remove coin from list',

    historicalPair: '[dashboard] historical  pair coin data',

    wsTrade: '[dashboard] websoket trade events',
    wsFullVolume: '[dashboard] websoket Full Volume events',
    wsSubscribe: '[dashboard] Subscribe to channel',
    wsUnsubscribe: '[dashboard] Unsubscribe from channel',

};