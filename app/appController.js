import coinTossEvents from './components/CoinToss/coinTossEvents';

function init(app, drizzle, drizzleStore) {
    app.on(coinTossEvents.GET_DATA, () => {
        const keys = {};
        const bankrollKey = drizzle.contracts.CoinToss.methods.bankroll.cacheCall();

        keys.bankroll = bankrollKey;

        app.set({ keys });
    });

    app.on(coinTossEvents.PLACE_BET, async (bet) => {
        const account = drizzleStore.getState().accounts[0];
        const value = drizzle.web3.utils.toWei(bet.amount.toString(), 'ether');

        if (!account) {
            try {
                await ethereum.enable();
            } catch (error) {
                return;
            }
        }

        drizzle.contracts.CoinToss.methods.placeBet.cacheSend(
            bet.heads,
            { from: account, value }
        );
    });

    app.on(coinTossEvents.FUND_CONTRACT, async (amount) => {
        const account = drizzleStore.getState().accounts[0];
        const value = drizzle.web3.utils.toWei(amount, 'ether');

        if (!account) {
            try {
                await ethereum.enable();
            } catch (error) {
                return;
            }
        }

        drizzle.contracts.CoinToss.methods.fund.cacheSend({ from: account, value });
    });
}

export default {
    init
};
