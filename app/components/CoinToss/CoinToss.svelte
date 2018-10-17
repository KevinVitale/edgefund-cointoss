<div>
    <h2>Bankroll:</h2>
    <p>Current: {bankroll} ETH</p>
    <label for="amount">Fund Bankroll:</label>
    <input id="fundAmount" type="number" min=1 bind:value=fundAmount> ETH
    <input type="submit" value="Fund bankroll" on:click="fundContract()">
    </div>

<div>
    <h2>Bet:</h2>
    <label for="choice">Heads:</label>
    <input id="choice" type="checkbox" bind:checked=isHeads>
    <p>Choice: {choice}</p>
</div>

<div>
    <label for="amount">Amount to bet:</label>
    <input id="amount" type="number" min=1 max={bankroll / 2} bind:value=amount> ETH
</div>

<div>
    <p><input type="submit" value="Place Bet" on:click=placeBet()></p>
</div>

<EventViewer transactions={transactions} ></EventViewer>

<script>
    import events from './coinTossEvents.js';
    import utils from 'web3-utils';
    import { getProperty } from './coinTossComputed';
    import EventViewer from '../EventViewer/EventViewer.svelte';

    export default {
        oncreate() {
            this.fire(events.GET_DATA);
        },
        data() {
            return {
                coinToss: {},
                transactions: {},
                keys: {},
                isHeads: false,
                amount: 1,
                fundAmount: 50
            };
        },
        methods: {
            placeBet() {
                const isHeads = this.get().isHeads;
                const amount = this.get().amount;

                this.fire(events.PLACE_BET, { heads: isHeads, amount });
            },
            fundContract() {
                const fundAmount = this.get().fundAmount;

                this.fire(events.FUND_CONTRACT, fundAmount.toString());
            }
        },
        computed: {
            bankroll: ({ coinToss, keys, transactions }) =>
                utils.fromWei(getProperty(coinToss, keys, "bankroll").toString()),
            choice: ({ isHeads }) => isHeads ? "Heads" : "Tails"
        },
        components: {
            EventViewer
        }
    };
</script>
