<style lang="scss" >
.dashboard {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    .button-section{
        flex: 0.2;
        display: flex;
        align-items: start;
        justify-content: space-evenly;
            margin-left: 100px;
        button{
            width: 60px;
            margin: 35px 0 0 0;
            height: 60px;
            border-radius: 50%;
            border:none;
            cursor: pointer;
            color: white;
            svg{
                font-size: 30px;
            }
        }
        button:nth-child(1){
            background-color: purple;
        }
        button:nth-child(2){
            background-color: gray;
        }
    }
}
.selected-section{
    display: flex;
    flex: 0.8;
    flex-direction: column;
}
#selected-powerball{
    flex: 1;
    display: grid;
    grid-gap: 5px;
    padding: 30px 0px;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
}

#table-section{
    flex: 1;
}

</style>

<template>
    <div class="dashboard">
        <div class="selected-section">
            <SelectedPowerBall id="selected-powerball" :selectedValues="this.selectedData"/>
            <PowerBallTable id="table-section" :tableData="this.tableData" :powerballData="this.powerballData"/>
        </div>
        <div class="button-section">
            <Button id="auto-generate" v-on:click.prevent="getAutoFillData()">
                <font-awesome-icon icon="bolt" />
            </Button>
            <Button id="reset" v-on:click.prevent="resetData()">
                <font-awesome-icon icon="trash" />
            </Button>
        </div>
  </div>
</template>

<script>
import SelectedPowerBall from "./components/SelectedPowerBall.vue"
import PowerBallTable from "./components/PowerBallTable.vue"
import { mapMutations } from "vuex";

export default {
    name: "app",
    components: {
        SelectedPowerBall,
        PowerBallTable
    },
    data () {
        return {
            powerballData: this.setDefaultPowerBallData(),
            selectedData: this.setDefaultData().selectedRecords,
            tableData: this.setDefaultData().tableRecords
        }
    },
    methods: {
        ...mapMutations([
            "SET_SELECTED_PB"
        ]),
        setDefaultPowerBallData() {
            let powerBallRecords = [];
            for (let i = 1; i < 21; i++) {
                let powerBallRecord = {
                    value: i,
                    selected: false
                }
                powerBallRecords.push(powerBallRecord);
            }

            return powerBallRecords;
        },
        setDefaultData() {
            let data = {
                tableRecords: [],
                selectedRecords: []
            };
            for (let i = 1; i < 36; i++) {
                let tableRecord = {
                    value: i,
                    selected: false
                };
                if (i < 8) {
                    let selectedRecord = {
                        value: "",
                        selected: false
                    }

                    data.selectedRecords.push(selectedRecord);
                }
                data.tableRecords.push(tableRecord);
            }

            return data;
        },
        getAutoFillData() {
            this.$http.post("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults", {
                CompanyId: "GoldenCasket",
                MaxDrawCountPerProduct: 1,
                OptionalProductFilter: ["Powerball"]
            }).then((result)=> {
                this.updateData(result.data.DrawResults[0].PrimaryNumbers);
            });
        },
        updateData(selectedRecords) {
            selectedRecords.forEach((selectedRecord, index)=> {
                this.tableData[selectedRecord-1].selected = true;
                this.selectedData[index].value = selectedRecord;
                this.selectedData[index].selected =true;
            });
        },

        resetData() {
            this.selectedData = this.setDefaultData().selectedRecords,
            this.tableData = this.setDefaultData().tableRecords
            this.powerballData = this.setDefaultPowerBallData();
            this.SET_SELECTED_PB("");
        }
    }
}
</script>