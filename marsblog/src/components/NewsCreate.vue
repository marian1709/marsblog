<template>
  <div class="content">
    <vue-editor v-model="content"></vue-editor>
    <hr />
    <button class="action primary" @click="saveNews">Save</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  },
  methods: {
    saveNews() {
      this.$store.dispatch("addSingleNews", {
        id: 3,
        title: "Charli XCX - Sucker CD",
        author: "Marian",
        content: "ASDF"
      });
    }
  }
};
</script>
