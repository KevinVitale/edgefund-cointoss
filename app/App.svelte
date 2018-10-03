{#if provider}
    {#if loading}
        <p>Loading...</p>
    {:else}
        <CoinToss
            keys={keys}
            on:getData
            on:placeBet
            on:fundContract
            on:resolveBet
            coinToss={state.contracts.CoinToss}
            transactions={state.transactions}
        />
    {/if}
{:else}
    <Modal/>
{/if}

<script>
    import Modal from './components/Modal/Modal.svelte';
    import CoinToss from './components/CoinToss/CoinToss.svelte';

    export default {
        data() {
            return {
                loading: true,
                provider: null,
                keys: {}
            };
        },
        components: {
            Modal,
            CoinToss
        }
    };
</script>
