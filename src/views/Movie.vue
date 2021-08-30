<template>
  <div>
    <!-- {{ $store.state.movie.test }}
    <button @click="printLog">클릭</button> -->
    <router-link to="about">to about</router-link>
    <router-view/>

    <movie-list title="Popular" :movie="$store.state.movie.popularMovie" />
    <div class="popular-page">  
      <button @click="movieBefore('popular')">이전 페이지로</button>
      <p>{{ $store.state.movie.popularPageNum }}</p>
      <button @click="movieAfter('popular')">다음 페이지로</button>
    </div>

    <movie-list title="Now Playing" :movie="$store.state.movie.nowPlayingMovie" />
    <div class="popular-page">  
      <button @click="movieBefore('nowPlaying')">이전 페이지로</button>
      <p>{{ $store.state.movie.nowPlayingPageNum }}</p>
      <button @click="movieAfter('nowPlaying')">다음 페이지로</button>
    </div>

    <movie-list title="Up Coming" :movie="$store.state.movie.upComingMovie" />
    <div class="popular-page">  
      <button @click="movieBefore('upComing')">이전 페이지로</button>
      <p>{{ $store.state.movie.upComingPageNum }}</p>
      <button @click="movieAfter('upComing')">다음 페이지로</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/MovieList.vue' //1

export default {
  name: 'Movie',
  components: {
    MovieList //2
  },
  data() {
    return {
    }
  },
  mounted() {
    // console.log('Movie.vue mounted')
    this.getInitMovie()
  },
  methods: {
    movieBefore(cate) {
      this.$store.dispatch('movie/changePageNum', {type: 'prev', category: cate})
    },
    movieAfter(cate) {
      this.$store.dispatch('movie/changePageNum', {type: 'next', category: cate})
    },
    getInitMovie() {
      // console.log('mounted 시점에 getInitMovie 호출됨')

      this.$store.dispatch('movie/getPopularMovie')
      this.$store.dispatch('movie/getNowPlayingMovie')
      this.$store.dispatch('movie/getUpcomingMovie')
    },
    // printLog() {
    //   console.log('this.$store.state.movie.popularMovie :')
    //   console.log(this.$store.state.movie.popularMovie)

    //   console.log('this.$store.state.movie.nowPlayingMovie :')
    //   console.log(this.$store.state.movie.nowPlayingMovie)


    //   console.log('this.$store.state.movie.upComingMovie :')
    //   console.log(this.$store.state.movie.upComingMovie)
    // }
  }
}
</script>

<style scoped>
.popular-page {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  justify-items: center;
}
.popular-page button {
  width: 100%;
}
.popular-page p {
  color: white;
}
</style>