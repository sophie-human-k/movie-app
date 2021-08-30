import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from '../views/Movie.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 루트 경로일 때
    name: 'Movie',
    component: Movie // App.vue의 rounter-view에 Movie 컴포넌트를 불러와라
  },
  {
    path: '/detail/:movie_id', // 동적 맵핑 : 얘는 값이 동적으로 바뀌는 주소 부분이다~ 이름은 여기서 따로 지으면 되는데 의미론적으로 직관적인 네이밍으로~
    name: 'Detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => 
      import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
