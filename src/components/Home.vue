<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">
          <span class="lblWlc">
            {{(getUser !== '') ? `Bienvenidx ${getUser}!` : ''}}
          </span>
        </span>
        <div class="md-toolbar-section-end">
           <md-button v-if="!getIsauth" class="md-dense md-raised md-primary" v-on:click="doLogin()">Login</md-button>
           <md-button v-if="getIsauth" class="md-dense md-raised md-primary" v-on:click="doLogOut()">LogOut</md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <template v-if="!getIsauth">
             <md-list-item>
              <md-icon>home</md-icon>
              <router-link class="md-list-item-text" to="/" activeClass="active">Home</router-link>
            </md-list-item>
          </template>
          <template v-if="getIsauth">
            <md-list-item>
              <md-icon>home</md-icon>
              <router-link class="md-list-item-text" to="/" activeClass="active">Home</router-link>
            </md-list-item>

            <md-list-item v-for="(item, index) in getContent" :key="index">
              <md-icon>label</md-icon>
              <router-link class="md-list-item-text" :to="`/HomeDetail/${index + 1 }`" activeClass="active" replace>{{item.titulo}}</router-link>
            </md-list-item>
          </template>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <div class="contenido">
          <transition name="slide" mode="out-in">
            <router-view/>
          </transition>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  mounted () {
    this.getData()
  },
  data: () => ({
    menuVisible: false
  }),
  methods: {
    ...mapActions({
      doLogin: 'doLogin',
      doLogOut: 'doLogOut',
      getData: 'getData'
    })
  },
  computed: mapGetters([
    'getIsauth',
    'getUser',
    'getContent'
  ]),
  watch: {
    getIsauth: function (isAuth) {
      if (!isAuth) {
        this.$router.push({'name': 'Main'})
      }
    }
  }
}
</script>

<style scoped>
.contenido {
  height: 1200px;
}
  .md-app {
    border: 1px solid rgba(#000, .12);

  }
  .md-drawer {
    width: 315px;
    max-width: calc(100vw - 125px);
  }
  .lblWlc {
    margin-left: 5px;
  }

</style>
