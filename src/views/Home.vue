<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="6" sm="4" md="2">
        <v-card class="elevation-12 clickable">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Personality Assessment</v-toolbar-title>
          </v-toolbar>
          <v-img
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
            src="../assets/assessment.png"
            @click="assessment()"
          ></v-img>
        </v-card>
      </v-col>
      <v-col cols="6" sm="4" md="2">
        <v-card class="elevation-12 clickable">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Your Connections</v-toolbar-title>
          </v-toolbar>
          <v-img
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="500"
            max-height="300"
            src="../assets/network.png"
            @click="connections()"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data: () => {
    return {};
  },
  methods: {
    assessment() {
      this.$router.push("assessment");
    },
    connections() {
    }
  }
};
</script>
<style scoped>
.clickable {
  cursor: pointer;
}
</style>
