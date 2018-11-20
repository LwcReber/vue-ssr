<template>
  <div id="app">
    <div id="loading" v-show="loading">
      <loading/>
    </div>
    <div id="cover"></div>

    <Header>3243213211</Header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>


    <!-- <notification  content="test notify"/> -->
    <!-- <todo></todo> -->
    <Footer></Footer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import loading from './components/loading/loading.vue'
export default {
  metaInfo: {
    title: 'reber\'s todo app'
  },
  components: {
    Header,
    Footer,
    loading
  },
  computed: {
    ...mapState(['loading'])
  },
  mounted () {

  },
  methods: {
    notify () {
      this.$notify({
        content: 'test',
        btn: 'close'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
#loading {
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color  rgba(255,255,255, .3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
