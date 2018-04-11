<template>
  <div>
    <article class="news" v-for="n in news" v-bind:key=n.id>
      <div class="panel-heading">
        <div class="panel-heading-actions">
          <div>
            <a href="#" @click="editNews(n._id)">EDIT</a>
          </div>
          <div>
            <a href="#" @click="deleteNews(n._id)">DEL</a>
          </div>
        </div>
        <div class="panel-heading-text">
          {{ n.title }}
        </div>
      </div>
      <div class="panel-body">
        <p>{{ n.content }}</p>
      </div>
      <div class="panel-footer">
        <p>{{ n.created_date | moment }} - <strong>{{ n.author }}</strong></p>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  computed: mapGetters({
    news: "allNews"
  }),
  created() {
    this.$store.dispatch("getAllNews");
  },
  methods: {
    editNews: function(id) {
      console.log(id);
    },
    deleteNews: function(id) {
      console.log(id);
      // this.$store.dispatch("deleteNews", { id });
    },
    moment: function() {
      return moment();
    }
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD.MM.YYYY - HH:mm");
    }
  }
};
</script>
