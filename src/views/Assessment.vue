<template>
  <div>
    <questions @results="results($event)"></questions>
    <v-btn @click="test()">Don't mind me</v-btn>
  </div>
</template>

<script>
import questions from "../components/Questions";
const calculateScore = require("@alheimsins/bigfive-calculate-score");
import { APIService } from "../api/APIService";
const apiService = new APIService();
export default {
  components: {
    questions
  },
  data: () => {
    return {};
  },
  methods: {
    results(e) {
      store.commit("setPersonalityScores", calculateScore(e));
      this.$router.push("results");
    },
    async test() {
      var e;
      await apiService.getPersonalities().then(
        resp => {
          if (resp != null) {
            console.log(resp);
            e = resp.personalities[0];
          }
        },
        error => (this.showError = true)
      );
      this.$store.commit("setPersonalityScores", calculateScore(e));
      this.$router.push("results");
    }
  }
};
</script>

<style></style>
