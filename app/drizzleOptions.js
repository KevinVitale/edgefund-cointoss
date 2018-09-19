import CoinToss from '@edgefund/core/build/contracts/CoinToss';

export default {
    contracts: [
        CoinToss
    ],
    events: {
        CoinToss: ['betPlaced', 'bankRollFunded']
    },
    polls: {
        accounts: 5000,
        blocks: 1000
    }
};
