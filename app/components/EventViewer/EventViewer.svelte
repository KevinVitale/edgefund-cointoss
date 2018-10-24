<div>
    {#if transactionsArray.length > 0}
    <p>Transactions:</p>
    <table style="border: 1px solid black">
        <th>User</th>
        <th>Bet</th>
        <th>Amount</th>
        <th></th>
        {#each transactionsArray as key}
        <tr>
            {#if transactions[key].status == "success"}
                {#if transactions[key].receipt.events.betPlaced}
                    <td>{transactions[key].receipt.events.betPlaced.returnValues.user}</td>
                    <td>{transactions[key].receipt.events.betPlaced.returnValues.isHeads == 'true' ? 'Heads' : 'Tails'}</td>
                    <td>{transactions[key].receipt.events.betPlaced.returnValues.amount}</td>
                    <td>
                        <button
                            type="button"
                            on:click=ResolveBet(transactions[key].receipt.events.betPlaced.returnValues.id)>
                            Confirm
                        </button>
                    </td>
                {/if}
            {/if}
        </tr>
        {/each}
    </table>
    {/if}
</div>

<script>
    import eventViewerEvents from './eventViewerEvents';
    import { advanceBlock } from 'openzeppelin-solidity/test/helpers/advanceToBlock';

    export default {
        data() {
            return {
                transactions: {}
            }
        },
        computed: {
            transactionsArray: ({ transactions }) => Object.keys(transactions)
        },
        methods: {
            ResolveBet(id) {
                Promise.all([
                    advanceBlock(),
                    advanceBlock(),
                    advanceBlock(),
                    advanceBlock(),
                    advanceBlock(),
                    advanceBlock()
                ]).then(() => {
                    this.fire(eventViewerEvents.RESOLVE_BET, id);
                });
            }
        }
    }
</script>
