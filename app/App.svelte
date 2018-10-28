<h1>Welcome to the EdgeFund CoinToss</h1>
{#if networkState.provider}
    {#await getNetwork}
        <p>Connecting...</p>
    {:then network}
        <Network network={network}></Network>
        {#if networkState.loading}
            <p>Loading...</p>
        {/if}
        {#if networkState.network}
            <CoinToss
                keys={keys}
                wallet={wallet}
                on:getData
                on:placeBet
                on:fundContract
                on:resolveBet
                coinToss={state.contracts.CoinToss}
                accounts={state.accounts}
                accountBalances={state.accountBalances}
                transactions={state.transactions}
            />
        {:else}
            <p>Sorry, the CoinToss Contract is not deployed to this network.</p>
        {/if}
    {:catch error}
        <p>Could not determine connected network.</p>
    {/await}
{:else}
    <Modal/>
{/if}

<script>
    import Modal from './components/Modal/Modal.svelte';
    import CoinToss from './components/CoinToss/CoinToss.svelte';
    import Network from './components/Network/Network.svelte';

    export default {
        data() {
            return {
                networkState: {},
                keys: {},
                state: {},
            };
        },
        computed: {
            getNetwork: ({ provider }) => provider && provider.eth.net.getNetworkType(),
        },
        components: {
            Modal,
            CoinToss,
            Network
        }
    };
</script>
