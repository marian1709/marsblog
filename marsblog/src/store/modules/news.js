import marsblogAPI from "../../api/marsblog";

// initial state
const state = {
  all: []
};

// getters
const getters = {
  allNews: state => state.all
};

// actions
const actions = {
  getAllNews({ commit }) {
    marsblogAPI
      .getNews()
      .then(response => {
        commit("setNews", response.data);
      })
      .catch(e => {
        console.log("API ERROR getAllNews");
        console.log(e);
      });
  },
  addSingleNews({ commit }, news) {
    marsblogAPI
      .postNews(news)
      .then(response => {
        commit("addNews", response.data);
      })
      .catch(e => {
        console.log("API ERROR addSingleNews");
        console.log(e);
      });
    // API CALL
    // then commit
    // error -> handle
  }
};

// mutations
const mutations = {
  setNews(state, news) {
    state.all = news;
  },
  addNews(state, { news }) {
    state.all.push(news);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
