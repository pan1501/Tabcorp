<style scoped>
.generated-powerball, .selected-powerball{
    border: 1px solid gray;
    border-radius: 50%;
    height: 60px;
    text-align: center;
    line-height: 3.5;
}
.selected{
    border:none;
    color:white;
    font-weight: bold;
    background-color: #4D4DFF;
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
        <div class="selected-powerball" v-if="selectedPB">
            {{selectedPB}}
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