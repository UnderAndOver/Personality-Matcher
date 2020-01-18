<template>
  <div class="small">
    <bar-chart v-if="datacollection" :chart-data="datacollection"></bar-chart>
  </div>
</template>

<script>
import BarChart from "../components/charts/Chart";
const getResult = require("@alheimsins/b5-result-text");
export default {
  components: {
    BarChart
  },
  data: () => {
    return {
      datacollection: null
    };
  },
  mounted() {
    this.fillData();
    // console.log(this.personalityScores);
  },
  methods: {
    showResults() {
      const results = getResult({ scores: this.personalityScores, lang: "en" });
      console.log(JSON.stringify(results, null, 2));
    },
    fillData() {
      var results = this.personalityScores;
      const data = [
        { personality: "Neuroticism", score: results["N"].score },
        { personality: "Extraversion", score: results["E"].score },
        { personality: "Openess", score: results["O"].score },
        { personality: "Agreeableness", score: results["A"].score },
        { personality: "Conscientiousness", score: results["C"].score }
      ];
      this.datacollection = {
        labels: data.map(a => a.personality),
        datasets: [
          {
            barThickness: 70,
            label: "Personality Traits",
            backgroundColor: [
              "rgba(255, 99, 132, 0.4)",
              "rgba(255, 159, 64, 0.4)",
              "rgba(255, 205, 86, 0.4)",
              "rgba(75, 192, 192, 0.4)",
              "rgba(54, 162, 235, 0.4)"
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)"
            ],
            data: data.map(a => a.score)
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  computed: {
    personalityScores() {
      return this.$store.getters.personalityScores;
    }
  }
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
