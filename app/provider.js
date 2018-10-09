import W3 from 'Web3';

export const getProvider = () => {
    if (window.ethereum) {
        return new W3(window.ethereum);
    } else if (window.web3) {
        return new W3(window.web3.currentProvider);
    }
};
