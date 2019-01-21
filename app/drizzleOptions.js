import CoinToss from '../../edgefund-core/build/contracts/CoinToss';

export default {
    contracts: [
        CoinToss
    ],
    events: {
        CoinToss: ['betPlaced', 'coinTossed']
    },
    polls: {
        accounts: 1000,
        blocks: 1000
    }
};
