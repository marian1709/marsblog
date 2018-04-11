import Vue from "vue";
import Vuex from "vuex";
import Router from "vue-router";

import NewsList from "../components/NewsList";
import NewsCreate from "../components/NewsCreate";

import Callback from "../components/Callback";

Vue.use(Router);
Vue.use(Vuex);

export default new Router({
  mode: "history",
  routes: [
    { path: "/", component: NewsList },
    { path: "/news", component: NewsList },
    { path: "/news/create", component: NewsCreate },

    { path: "/callback", component: Callback }
  ]
});
