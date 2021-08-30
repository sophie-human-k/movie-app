<template>
  <div class="detail">
    <p>
      <img :src="getImage(movieDetail.poster_path)" alt="" />
    </p>
    <h1>{{ movieDetail.original_title }}</h1>
    <p class="desc">{{ movieDetail.overview }}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      movieDetail: []
    }
  },
  mounted() {
    this.$store
    .dispatch('movie/getDetailMovie', this.$route.params.movie_id)
    .then(() => {
      this.movieDetail = this.$store.state.movie.movieDetail
    })
  },
  methods: { 
    getImage(poster_path) { 
      // console.log(poster_path); 
      return `https://image.tmdb.org/t/p/w300${poster_path}`; 
    },
  },
}
</script>
