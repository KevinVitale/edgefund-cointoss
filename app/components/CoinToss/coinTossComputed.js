export const getProperty = (coinToss, keys, property) => {
    if (coinToss[property] && keys[property] && coinToss[property][keys[property]]) {
        const value = coinToss[property][keys[property]].value;

        if (!value) {
            return 0;
        }

        return coinToss[property][keys[property]].value.toString();
    } else {
        return 0;
    }
};
