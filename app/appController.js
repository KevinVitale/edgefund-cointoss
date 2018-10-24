import coinTossEvents from './components/CoinToss/coinTossEvents';
import eventViewerEvents from './components/EventViewer/eventViewerEvents';

function init(app, drizzle, drizzleStore) {
    app.on(coinTossEvents.GET_DATA, () => {
        const keys = {};
        const bankrollKey = drizzle.contracts.CoinToss.methods.bankroll.cacheCall();
        const account = drizzleStore.getState().accounts[0];

        if (!getAccount(drizzleStore)) { return; }

        const balance = drizzle.web3.utils.fromWei(drizzleStore.getState().accountBalances[account]);

        keys.bankroll = bankrollKey;

        app.set({ keys });
        app.set({ wallet: Number(balance).toFixed(2) });
    });

    app.on(coinTossEvents.PLACE_BET, async (bet) => {
        const value = drizzle.web3.utils.toWei(bet.amount.toString(), 'ether');
        const account = drizzleStore.getState().accounts[0];

        if (!getAccount(account)) { return; }

        drizzle.contracts.CoinToss.methods.placeBet.cacheSend(
            bet.heads,
            { from: account, value }
        );
    });

    app.on(coinTossEvents.FUND_CONTRACT, async (amount) => {
        const value = drizzle.web3.utils.toWei(amount, 'ether');
        const account = drizzleStore.getState().accounts[0];

        if (!getAccount(account)) { return; }

        drizzle.contracts.CoinToss.methods.fund.cacheSend(
            { from: account, value }
        );
    });

    app.on(eventViewerEvents.RESOLVE_BET, async (id) => {
        const account = drizzleStore.getState().accounts[0];

        if (!getAccount(account)) { return; }

        console.log('Resolving Bet: ', id);
        drizzle.contracts.CoinToss.methods.resolveBet.cacheSend(
            id, { from: account, gas: 70000 }
        );
    });
}

async function getAccount(account) {
    if (!account) {
        try {
            await ethereum.enable();

            return true;
        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    init
};
