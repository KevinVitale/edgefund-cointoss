import coinTossEvents from './components/CoinToss/coinTossEvents';
import eventViewerEvents from './components/EventViewer/eventViewerEvents';

function init(app, drizzle, drizzleStore) {
    app.on(coinTossEvents.GET_DATA, () => {
        const keys = {};
        const bankrollKey = drizzle.contracts.CoinToss.methods.bankroll.cacheCall();
        const account = drizzleStore.getState().accounts[0];

        getAccount(account);

        keys.bankroll = bankrollKey;

        app.set({ keys });
    });

    app.on(coinTossEvents.PLACE_BET, async (bet) => {
        const value = drizzle.web3.utils.toWei(bet.amount.toString(), 'ether');
        const account = drizzleStore.getState().accounts[0];
        const accountUnlocked = await getAccount(account);

        if (!accountUnlocked) { return; }

        setTimeout(() => {
            const account = drizzleStore.getState().accounts[0];

            drizzle.contracts.CoinToss.methods.placeBet.cacheSend(
                bet.heads,
                { from: account, value }
            );
        }, 2000);
    });

    app.on(coinTossEvents.FUND_CONTRACT, async (amount) => {
        const value = drizzle.web3.utils.toWei(amount, 'ether');
        const account = drizzleStore.getState().accounts[0];
        const accountUnlocked = await getAccount(account);

        if (!accountUnlocked) { return; }

        setTimeout(() => {
            const account = drizzleStore.getState().accounts[0];

            drizzle.contracts.CoinToss.methods.fund.cacheSend(
                { from: account, value }
            );
        }, 2000);
    });

    app.on(eventViewerEvents.RESOLVE_BET, async (id) => {
        const account = drizzleStore.getState().accounts[0];

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
