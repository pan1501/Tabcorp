<!-- Add "scoped" to limit CSS to this component only -->
<style lang="scss" scoped>
.border {
    background-color: gray;
}
.top-table, .bottom-table {
    background-color: gray;
    display: grid;
    grid-template-columns: repeat(5, minmax(auto, auto));
    grid-gap: 1px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: stretch;
    padding: 2px;
    div {
        color: purple;
        text-align: center;
        padding: 15px;
        background-color: white;
    }
    .selected{
        background-image: url("../assets/baseline-clear-24px.svg");
        font-weight: bold;
        background-color: #E6E6FA;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    //  .selected::after{
    //     content: "\d7";
    // }
    .table-cell:hover{
        background-color: #E6E6FA;
    }
}
// .bottom-table{
//     width:100%;
// }
.table-header {
    background-color: #778899;
    padding: 10px 0;
    text-align: center;
    color: white;
}
.table-content{
    display: flex;
    flex-flow: row wrap;
    .table-cells{
        flex: 1 10%;
        text-align: center;
    }
}
</style>

<template>
    <div>
        <div class="border">
            <div class="top-table">
                <div :key="index"
                    v-for="(record, index) in tableData"
                    v-bind:class="{ selected: record.selected }">
                    {{record.value}}
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg> -->
                    <!-- <font-awesome-icon v-if="record.selected" icon="times" style="opacity: 0.6; font-size:50px; margin-left: -30px; margin-top: 0px;"></font-awesome-icon> -->
                </div>
            </div>
        </div>
        <div class="table-header">
            SELECT YOUR POWER BALL
        </div>
        <div class="border">
            <div class="bottom-table">
                <div :key="index"
                    class="table-cell"
                    style="cursor: pointer;"
                    v-for="(record, index) in powerballData"
                    v-bind:class="{ selected: record.selected }"
                    v-on:click.prevent="updatePowerBallData(record.value)">
                    {{record.value}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "PowerBallTable",
    props: {
        tableData: Array,
        powerballData: Array,
    },
    methods: {
        ...mapMutations([
            "SET_SELECTED_PB"
        ]),
        updatePowerBallData(powerBallValue) {
            this.powerballData.forEach(record => {
                 record.selected = false;
                if (record.value === powerBallValue) {
                    record.selected = true;
                }
            });
            this.SET_SELECTED_PB({
                value: powerBallValue,
                selected: true
            });
        }
    }
}
</script>