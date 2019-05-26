<style scoped>
.generated-powerball, .selected-powerball {
    border: 1px solid gray;
    border-radius: 50%;
    height: 60px;
    text-align: center;
    line-height: 1.8;
    font-size: 2em;
    max-width: 60px;
    -webkit-box-shadow: inset -4px 9px 30px -15px rgba(0,0,0,0.33);
    -moz-box-shadow: inset -4px 9px 30px -15px rgba(0,0,0,0.33);
    box-shadow: inset -4px 9px 30px -15px rgba(0,0,0,0.33);
}
.selected {
    border:none;
    color:white;
    font-weight: bold;
    background-color: #4D4DFF;
    }
.selectedpb {
    background-color: gray;
    color: white;
}
</style>

<template>
    <div class="selected-powerball-section">
        <div class="generated-powerball"
            :key="index"
            v-for="(record, index) in selectedValues"
            v-bind:class="{ selected: record.selected }">
            {{record.value}}
        </div>
        <div class="selected-powerball"
            v-if="selectedPB.value !== null"
            v-bind:class="{ selectedpb: selectedPB.selected }"
            >
            {{selectedPB.value}}
        </div>
         <div class="selected-powerball" v-else>
             <strong>PB</strong>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'SelectedPowerBall',
  props: {
    selectedValues: Array
  },
    computed: {
        ...mapState([
            "selectedPB"
        ]),
    }
}
</script>