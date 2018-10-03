<div>
    {#if transactionsArray.length > 0}
    <p>Transactions:</p>
    <table style="border: 1px solid black">
        <th>User</th>
        <th>Bet on Heads</th>
        <th>Bet</th>
        <th></th>
        {#each transactionsArray as key}
        {#if transactions[key].status == 'success'}
        {#if transactions[key].receipt.events.betPlaced}
        <tr>
            <td>{transactions[key].receipt.events.betPlaced.returnValues.user}</td>
            <td>{transactions[key].receipt.events.betPlaced.returnValues.isHeads}</td>
            <td>{transactions[key].receipt.events.betPlaced.returnValues.amount}</td>
            <td>
            <button
                type="submit"
                on:click="resolveBet(transactions[key])">Resolve Bet
            </button>
            </td>
        </tr>
        {/if}
        {/if}
        {/each}
    </table>
    {:else}
        <p>No Transactions</p>
    {/if}
</div>

<script>
    import events from '../CoinToss/CoinTossEvents';

    export default {
        data() {
            return {
                transactions: {}
            }
        },
        methods: {
            resolveBet(transaction) {
                const betId = transaction.receipt.events.betPlaced.returnValues.id;

                this.fire(events.RESOLVE_BET, betId);
            }
        },
        computed: {
            transactionsArray: ({ transactions }) => Object.keys(transactions)
        }
    }
</script>
