import utils from 'web3-utils';

export const getBankroll = (coinToss, keys) => {
    if (coinToss.bankroll && keys.bankroll && coinToss.bankroll[keys.bankroll]) {
        const value = coinToss.bankroll[keys.bankroll].value;

        if (value) {
            return utils.fromWei(coinToss.bankroll[keys.bankroll].value.toString());
        } else {
            return 0;
        }
    } else {
        return 0;
    }
};

export const getCounter = (coinToss, keys) => {
    if (coinToss.counter && keys.counter && coinToss.counter[keys.counter]) {
        return coinToss.counter[keys.counter].value;
    } else {
        return -1;
    }
};
