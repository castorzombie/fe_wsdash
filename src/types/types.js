
export const types = {

    authCheck: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',

    addSetting: '[setting] Add new setting',
    updateSetting: '[setting] Update setting',

    coinsLoaded : '[coins] Load selected coin list',
    addCoin: '[coins] Add new coin to list',
    deleteCoin: '[coins] Remove coin from list',
    activeCoin: '[coins] set active coin',

    historicalPair: '[dashboard] historical pair coin data',
    wsTrade: '[dashboard] websoket trade events',
    wsFullVolume: '[dashboard] websoket Full Volume events',
    wsSubscribe: '[dashboard] Subscribe to channel',
    wsUnsubscribe: '[dashboard] Unsubscribe from channel',

};