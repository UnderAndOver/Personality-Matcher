<template>
  <questions @results="results($event)"></questions>
</template>

<script>
import questions from "../components/Questions";
const calculateScore = require("@alheimsins/bigfive-calculate-score");
export default {
  components: {
    questions
  },
  data: () => {
    return {};
  },
  methods: {
    results(e) {
      debugger;
      console.log(calculateScore(e));
    }
  }
};
</script>

<style>
</style>