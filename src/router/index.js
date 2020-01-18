import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/assessment",
    name: "assessment",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Assessment.vue")
  },
  {
    path: "/results",
    name: "results",
    component: () => import("../views/Results.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
