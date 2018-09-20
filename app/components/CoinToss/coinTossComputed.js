import utils from 'web3-utils';

export const getBankroll = (coinToss, keys) => {
    if (coinToss.bankroll && keys.bankroll && coinToss.bankroll[keys.bankroll]) {
        const value = coinToss.bankroll[keys.bankroll].value;

        if (!value) {
            return 0;
        }

        return utils.fromWei(coinToss.bankroll[keys.bankroll].value.toString());
    } else {
        return 0;
    }
};
