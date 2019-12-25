<template>
  <v-app>
    <NavBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  components: {
    NavBar
  },
  name: "App",
  data: () => ({
    //
  })
};
</script>
