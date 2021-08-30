<template>
  <div class="movie">
    <h1>{{ title }}</h1>
    <ul class="movie-list">
        <li v-for="item in movie" :key="item.id"> <!-- key는 고유한 값이 들어가야하는데 item.id가 고유하니까 쓰는거지! -->
          <router-link :to="`/detail/${item.id}`">
            <img :src="getImage(item.poster_path)" alt="" />
            <p>{{ item.title }}</p>
            <p>{{ item.release_date }}</p>
          </router-link>
        </li> 
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    movie: Array
  },
  mounted() {
    // console.log('this.$store.state.movie.popularMovie : ')
    // console.log(this.$store.state.movie.popularMovie) // 안됨
    // console.log(this.movie) // 안됨
    // 이유 :
    // this.movie는 dispatch에 의해서 비동기 통신이 끝난 뒤에 사용할 수 있는 데이터인데
    // mounted 시점에서는 api 호출이 끝났다고 보장하지 않는다
    // 그래서 시점의 문제로 아직 데이터가 안왔기 때문에 undefined 인 것이다.
  },
  updated() {
    // console.log('movielist updated')
    // console.log('this.$store.state.movie.popularMovie : ')
    // console.log(this.$store.state.movie.popularMovie) // 됨
    // console.log(this.movie) // 됨

  },
  watch: {
    movie(newValue) { // 지겨보는 값과 이름을 같게, 2개의 인수 값을 자동으로 받음. 근데 쓰는 건 자유~
      console.log(newValue)
    }
  },
  methods: {
    getImage(poster_path) {
      // console.log(poster_path)
      return `https://image.tmdb.org/t/p/w300${poster_path}`
    }
  }
}
</script>

<style scoped>
.movie {
  color: white;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 20px;

  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.movie-list img {
  width: 100%;
  margin-bottom: 10px;
}

.movie-list a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 1000px) {
  .movie-list {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media (max-width: 720px) {
  .movie-list {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 500px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 400px) {
  .movie-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>