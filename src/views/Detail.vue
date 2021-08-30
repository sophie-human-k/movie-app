<template>
  <div class="detail">
    <p>
      <img :src="getImage2(movieDetail.poster_path)" alt="" />
    </p>
    <h1>{{ movieDetail.original_title }}</h1>
    <p class="desc">{{ movieDetail.overview }}</p>

    <div v-if="movieDetail.videos && movieDetail.videos.results.length > 0">
      <iframe
        :src="getYoutubes(movieDetail.videos.results[0].key)"
        width="500"
        height="263"
        frameborder="0">
      </iframe>
    </div>
  </div>
</template>

<script> 
export default {
  name: 'Detail',
  data () { 
    return { 
      movieDetail: []
    }
  },
  mounted () {
    this.$store
      .dispatch('movie/getDetailMovie', this.$route.params.movie_id)
      .then(() => {
        this.movieDetail = this.$store.state.movie.movieDetail;
      })
      // to do
      // async await가 아니라 then으로 한 이유?
  },
  methods: { 
    getImage2(poster_path) {
      // console.log(poster_path)
      if (this.movieDetail.poster_path) {
        return `https://image.tmdb.org/t/p/w300${poster_path}`
      } else return ''
    },
    getYoutubes(key) {
      return `https://www.youtube.com/embed/${key}`
    }
  },
};
</script>

<style scoped> 
.detail { 
  color: white; 
  width: 500px; 
  margin: 0 auto; 
  text-align: center;
}
.detail .desc { 
  text-align: left;
} 
</style>