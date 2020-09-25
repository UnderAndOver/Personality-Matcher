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
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="test"> getCurrent </v-btn>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => {
    return {
      params: {
        client_id:
          "588318029265-b4cn4fkv72narnvqdqll2o06791jj546.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
      },
      user: null,
    };
  },
  methods: {},
};
</script>

<style></style>
