<template>
  <div>
    <v-app-bar color="#85d7f5" style="border-bottom:inset #3275ae;">
      <v-row align="center" justify="center">
        <v-col style="color:white;">
          <v-app-bar-nav-icon
            class="pr-7 mb-7"
            @click="$route.path != '/' && $router.replace('/')"
          >
            <v-img
              max-width="6.6em"
              src="../assets/Illustration2.png"
            ></v-img> </v-app-bar-nav-icon
          >.Tomodai
        </v-col>
        <v-col class="text-end">
          <v-btn @click="$route.path != '/login' && $router.replace('/login')">
            <v-icon>mdi-account</v-icon>Login
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
