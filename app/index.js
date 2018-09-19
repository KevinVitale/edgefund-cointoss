import { Drizzle, generateStore } from 'drizzle';
import options from './drizzleOptions';
import App from './App.svelte';
import appController from './appController';
import utils from 'web3-utils';

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const app = new App({
    target: document.getElementById('main'),
    data: { loading: true, provider: window.web3 }
});

drizzle.web3.utils = utils;
appController.init(app, drizzle, drizzleStore);

drizzleStore.subscribe(() => {
    const state = drizzleStore.getState();

    if (state.drizzleStatus.initialized) {
        app.set({ loading: false, state });
    }
});

window.drizzle = drizzle;
window.store = drizzleStore;
