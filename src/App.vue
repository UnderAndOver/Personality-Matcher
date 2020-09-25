<template>
  <v-app>
    <NavBar />
    <div id="nav">
      <div id="google-signin-btn"></div>
      <a href="#" class="sign-out" @click="signOut" v-if="profile">Sign out</a>
    </div>
    <div v-if="profile" class="">
      <h2>Signed In User Profile</h2>
      <pre>{{ profile }}</pre>
    </div>
    <div v-if="!profile">
      <h2>Signed out.</h2>
    </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { APIService } from "./api/APIService";
const apiService = new APIService();
import NavBar from "./components/NavBar";
export default {
  components: {
    NavBar,
  },
  name: "App",
  data: () => ({
    profile: false,
    user: null,
  }),
  methods: {
    async onSignIn(user) {
      const profile = user.getBasicProfile();
      //token setup
      var id_token = user.getAuthResponse().id_token;

      //online endpoint test
      // var xhr = new XMLHttpRequest();
      // xhr.open(
      //   "POST",
      //   "https://oauth2.googleapis.com/tokeninfo?id_token=" + id_token
      // );
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      // xhr.onload = function () {
      //   console.log("Signed in as: " + xhr.responseText);
      // };
      // xhr.send();

      await apiService.tokenToServer(id_token).then(
        (resp) => {
          if (resp.message === "verified") console.log("verified");
        },
        (error) => console.log("could not verify")
      );
      // console.log("ID: " + profile.getId());
      // console.log("Full Name: " + profile.getName());
      // console.log("Given Name: " + profile.getGivenName());
      // console.log("Family Name: " + profile.getFamilyName());
      // console.log("Image URL: " + profile.getImageUrl());
      // console.log("Email: " + profile.getEmail());
      this.profile = profile;
      await apiService.getUserByGoogleID(profile.getId()).then(async (resp) => {
        if (resp && resp.user) {
          //await this.updateUser(resp.user);
          console.log("user " + resp.user._id + " already exists");
        } else {
          await apiService.createUser(profile.getId()).then(
            (resp) => {
              if (resp.status === 201) this.user = profile.getId();
            },
            (error) => console.log("failed to create user")
          );
        }
      });
    },
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        location.reload(true);
      });
    },
    renderGoogleLoginButton() {
      gapi.signin2.render("google-signin-btn", {
        onsuccess: this.onSignIn,
      });
    },

    async updateUser(user) {
      user.email = this.profile.getEmail();
      user.name = this.profile.getName();
      await apiService.updateUser(user).then(
        (resp) => {
          console.log("updated successfully");
        },
        (error) => console.log("didn't update successfully")
      );
    },
  },
  mounted() {
    window.addEventListener("google-loaded", this.renderGoogleLoginButton);
  },
};
</script>
