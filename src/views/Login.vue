<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Welcome Tomo</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Login"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="null">Login</v-btn>
            </v-card-actions>
            <GoogleLogin
              :params="params"
              :renderParams="renderParams"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
            ></GoogleLogin>
            <GoogleLogin :params="params" :logoutButton="true"
              >Logout</GoogleLogin
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { GoogleLogin } from "vue-google-login";
export default {
  props: {
    source: String
  },
  data: () => {
    return {
      params: {
        client_id:
          "588318029265-b4cn4fkv72narnvqdqll2o06791jj546.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      user: null
    };
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);
      this.user = googleUser;
      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    onFailure() {
      console.log("sad face");
    }
  },
  components: {
    GoogleLogin
  }
};
</script>

<style></style>
