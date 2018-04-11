// /**
//  * Mocking client-server processing
//  */
// const _news = [
//   {"id": 1, "title": "iPad 4 Mini", "author": "Marian", "date": "10.04.2018", "content": "Lorem ipsum dolor sit amet, te dolorem civibus sit. Exerci nonumy suavitate in mea, in quidam persecuti qui. Ea unum nonumy vel. Elit nostrum pri et, cu per natum tritani civibus, mea ex velit scripserit. At mei partem explicari, ea solum eleifend postulant est. Id usu nibh commune copiosae.\nFerri vocibus argumentum id est, scripta suscipiantur mei ei, his cu feugiat saperet adipiscing. Vix copiosae periculis honestatis ea. Ius nonumy recteque accommodare ne. Ei qui hinc suscipiantur, mei ad dico mutat. At qui deserunt sensibus, ius at facer iusto invidunt. Detracto expetenda constituam ad nec, ad eam luptatum interpretaris.\nSumo congue veniam ut per. At mandamus interesset efficiantur sea, mea legimus nusquam accumsan eu. In duo vidisse deserunt perpetua, deseruisse scripserit ne vim, his agam salutandi ad. Purto iisque nec an, ea reque vocent posidonium sed. Sea nulla aperiri singulis ut, est cu rebum nominavi repudiandae, ut populo epicuri pri. His ut assum homero legere, te usu ferri saperet interpretaris, eu sanctus habemus voluptaria usu." },
//   {"id": 2, "title": "H&M T-Shirt White", "author": "Marian", "date": "10.04.2018", "content": "Lorem ipsum dolor sit amet, te dolorem civibus sit. Exerci nonumy suavitate in mea, in quidam persecuti qui. Ea unum nonumy vel. Elit nostrum pri et, cu per natum tritani civibus, mea ex velit scripserit. At mei partem explicari, ea solum eleifend postulant est. Id usu nibh commune copiosae.\nFerri vocibus argumentum id est, scripta suscipiantur mei ei, his cu feugiat saperet adipiscing. Vix copiosae periculis honestatis ea. Ius nonumy recteque accommodare ne. Ei qui hinc suscipiantur, mei ad dico mutat. At qui deserunt sensibus, ius at facer iusto invidunt. Detracto expetenda constituam ad nec, ad eam luptatum interpretaris."},
//   {"id": 3, "title": "Charli XCX - Sucker CD", "author": "Marian", "date": "10.04.2018", "content": "Lorem ipsum dolor sit amet, te dolorem civibus sit. Exerci nonumy suavitate in mea, in quidam persecuti qui. Ea unum nonumy vel. Elit nostrum pri et, cu per natum tritani civibus, mea ex velit scripserit. At mei partem explicari, ea solum eleifend postulant est. Id usu nibh commune copiosae.\nFerri vocibus argumentum id est, scripta suscipiantur mei ei, his cu feugiat saperet adipiscing. Vix copiosae periculis honestatis ea. Ius nonumy recteque accommodare ne. Ei qui hinc suscipiantur, mei ad dico mutat. At qui deserunt sensibus, ius at facer iusto invidunt. Detracto expetenda constituam ad nec, ad eam luptatum interpretaris.\nSumo congue veniam ut per. At mandamus interesset efficiantur sea, mea legimus nusquam accumsan eu. In duo vidisse deserunt perpetua, deseruisse scripserit ne vim, his agam salutandi ad. Purto iisque nec an, ea reque vocent posidonium sed. Sea nulla aperiri singulis ut, est cu rebum nominavi repudiandae, ut populo epicuri pri. His ut assum homero legere, te usu ferri saperet interpretaris, eu sanctus habemus voluptaria usu."}
// ]

// export default {
//   getNews (cb) {
//     setTimeout(() => cb(_news), 100)
//   },
// }

import axios from "axios";

const BASE_URL = "http://localhost:3333";

export default {
  // eslint-disable-next-line
  getNews() {
    const url = `${BASE_URL}/news`;
    const accessToken = localStorage.getItem("access_token");
    return axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  },

  // eslint-disable-next-line
  // getNews(id) {
  //   const url = `${BASE_URL}/news/${id}`;
  //   const accessToken = localStorage.getItem("access_token");
  //   return axios.get(url, {
  //     headers: { Authorization: `Bearer ${accessToken}` }
  //   });
  // },

  // eslint-disable-next-line
  postNews(data) {
    const url = `${BASE_URL}/news`;
    const accessToken = localStorage.getItem("access_token");
    return axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=UTF-8"
      }
    });
  },

  // eslint-disable-next-line
  deleteNews(id) {
    const url = `${BASE_URL}/news/${id}`;
    const accessToken = localStorage.getItem("access_token");
    return axios.delete(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  }
};
