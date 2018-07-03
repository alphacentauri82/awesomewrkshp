<template>
  <section class="row">
    <template class="col-xs-12" >
      <h2>{{getContent[id-1].titulo}}</h2><br/>
      <article v-html="getContent[id-1].texto">
      </article>
    </template>
  </section>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'

const marked = require('marked')

export default {
  name: 'HomeDetail',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  beforeCreate: function () {
    console.log()
    this.getContent()
  },
  computed: {
    ...mapGetters([
      'getContent'
    ])
  },
  methods: {
    previewText (mdText) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      })
      return marked(mdText)
    },
    ...mapActions({
      doLogin: 'doLogin',
      doLogOut: 'doLogOut',
      getItems: 'getData'
    })
  },
  watch: {
    '$route' (to, from) {
      const id = to.params.id
      if (id !== undefined) {
        this.id = id
      }
    }
  }
}
</script>
<style scoped>
  section {
    padding: 25px;
    width: 80%;
    margin: 0 10%;
    text-align: left;
  }
  h2 {
    margin-bottom: 35px;
    text-align: center;
    width: 100%;
  }

</style>
