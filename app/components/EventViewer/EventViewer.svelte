<div>
    {#if transactionsArray.length > 0}
    <p>Transactions:</p>
    <table style="border: 1px solid black">
        <th>Tx Hash</th>
        <th>Status</th>
        {#each transactionsArray as key}
        <tr>
            <td>{key}</td>
            <td>{transactions[key].status}</td>
        </tr>
        {/each}
    </table>
    {:else}
        <p>No Transactions</p>
    {/if}
</div>

<script>
    export default {
        data() {
            return {
                transactions: {}
            }
        },
        computed: {
            transactionsArray: ({ transactions }) => Object.keys(transactions)
        }
    }
</script>
