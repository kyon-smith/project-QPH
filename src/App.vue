<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {Header, Footer},
  mounted() {
    this.$store.dispatch('home/categoryList')
    this.$store.dispatch('home/bannerList')
    this.$store.dispatch('home/floorList')
  }
}
</script>

<style>

</style>
