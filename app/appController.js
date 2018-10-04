import events from './components/CoinToss/CoinTossEvents';

function init(app, drizzle, drizzleStore) {
    app.on(events.GET_DATA, () => {
        const keys = {};
        const bankrollKey = drizzle.contracts.CoinToss.methods.bankroll.cacheCall();

        keys.bankroll = bankrollKey;

        app.set({ keys });
    });

    app.on(events.PLACE_BET, (bet) => {
        const account = drizzleStore.getState().accounts[0];
        const value = drizzle.web3.utils.toWei(bet.amount.toString(), 'ether');

        if (!account) { return; }

        drizzle.contracts.CoinToss.methods.placeBet.cacheSend(
            bet.heads,
            { from: account, value }
        );
    });

    app.on(events.FUND_CONTRACT, (amount) => {
        const account = drizzleStore.getState().accounts[0];
        const value = drizzle.web3.utils.toWei(amount, 'ether');

        if (!account) { return; }

        drizzle.contracts.CoinToss.methods.fund.cacheSend({ from: account, value });
    });

    app.on(events.RESOLVE_BET, (betId) => {
        const account = drizzleStore.getState().accounts[0];

        drizzle.contracts.CoinToss.methods.resolveBet.cacheSend(betId, { from: account });
    });
}

export default {
    init
};
