import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../views/Users/Users";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Users",
    component: Users,
  },
  {
    path: "/user/:id",
    name: "User",
    props: true,
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/Users/User/User.vue"),
  },
  {
    path: "/finance",
    name: "Finance",
    component: () =>
      import(/* webpackChunkName: "finance" */ "../views/Finance.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
