import { Drizzle, generateStore } from 'drizzle';
import { getProvider } from './provider';
import CoinToss from '../../edgefund-core/build/contracts/CoinToss';
import options from './drizzleOptions';
import App from './App.svelte';
import appController from './appController';
import utils from 'web3-utils';

const networkState = {
    'loading': true,
    'provider': false,
    'network': false
};

const provider = getProvider();

const app = new App({
    target: document.getElementById('main'),
    data: { networkState, provider }
});

if (provider) {
    networkState.provider = true;
    app.set({ networkState });

    provider.eth.net.getId().then((number) => {
        if (CoinToss.networks[number]) {
            const drizzleStore = generateStore(options);
            const drizzle = new Drizzle(options, drizzleStore);

            drizzle.web3.utils = utils;
            appController.init(app, drizzle, drizzleStore);

            drizzleStore.subscribe(() => {
                const state = drizzleStore.getState();

                if (state.drizzleStatus.initialized) {
                    networkState.loading = false;
                    networkState.network = true;

                    app.set({ networkState, state });
                }

                window.drizzle = drizzle;
                window.drizzleStore = drizzleStore;
            });
        } else {
            networkState.loading = false;
            networkState.network = false;

            app.set({ networkState });
        }
    });
}
