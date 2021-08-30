// store의 핵심인 index.js 외에는 export default
import axios from 'axios';

const request = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: '97b55b83a239d95abb842dddae6c1250', // 문자열로 넣어야함
    language: "ko-KR"
  }
});

export default {
  namespaced: true, // 생략 시, [vuex] unknown action type: movie/getPopularMovie
  state: {
    test: 'vuex is functioning',
    popularMovie: [],
    nowPlayingMovie: [],
    upComingMovie: [],
    movieDetail: [],
    popularPageNum: 1,
    nowPlayingPageNum: 1,
    upComingPageNum: 1,
    popularTotalPage: 1,
    nowPlayingTotalPage: 1,
    upComingTotalPage: 1
  },
  mutations: {
    SET_POPULAR_MOVIE(state, result) {
      state.popularTotalPage = result.data.total_pages
      state.popularMovie = result.data.results // getPopularMovie 가 넘겨준 result.data.results를 data로 받아서 state.popularMovie에 할당(수정)
    },
    SET_NOWPLAYING_MOVIE(state, result) {
      state.nowPlayingTotalPage = result.data.total_pages
      state.nowPlayingMovie = result.data.results
    },
    SET_UPCOMING_MOVIE(state, result) {
      state.upComingTotalPage = result.data.total_pages
      state.upComingMovie = result.data.results
    },
    SET_DETAIL_MOVIE(state, data) {
      state.movieDetail = data
    },
    SET_PREV_PAGE(state, data) {
      if (data === 'popular' && state.popularPageNum !== 1) { state.popularPageNum-- }
      if (data === 'nowPlaying' && state.nowPlayingPageNum !== 1) { state.nowPlayingPageNum-- }
      if (data === 'upComing' && state.upComingPageNum !== 1) { state.upComingPageNum-- }
    },
    SET_NEXT_PAGE(state, data) {
      if (data === 'popular' && state.popularTotalPage >= state.popularPageNum) { state.popularPageNum++ }
      if (data === 'nowPlaying' && state.nowPlayingTotalPage >= state.nowPlayingPageNum) { state.nowPlayingPageNum++ }
      if (data === 'upComing' && state.upComingTotalPage >= state.upComingPageNum) { state.upComingPageNum++ }
    }
  },
  actions: {
    async getPopularMovie({ commit, state }) {
      // console.log('getPopularMovie')

      const result = await request("/movie/popular", {
        params: {
          page: state.popularPageNum // 자체적으로 제공해주는 정보가 아님 예고편 때문에 필요함. 여기를 변수처리해서 버튼 누르면 페이지 바뀌게~
        }
      })
      // const result = await axios.get(
      //   'https://api.themoviedb.org/3/movie/popular?api_key=97b55b83a239d95abb842dddae6c1250'
      // )

      // console.log(result)
      
      // api 호출 성공 시 
      if (result.status === 200) {
        // 호출 결과 확인
        // console.log('getPopularMovie 의 result.data.results :')
        // console.log(result.data.results)
        commit('SET_POPULAR_MOVIE', result) // SET_POPULAR_MOVIE 함수를 커밋할건데, api 호출 결과 데이터도 줄게
      }
    },
    async getNowPlayingMovie({ commit, state }) {
      // console.log('getNowPlayingMovie')

      const result = await request("/movie/now_playing", {
        params: {
          page: state.nowPlayingPageNum // 자체적으로 제공해주는 정보가 아님 예고편 때문에 필요함. 여기를 변수처리해서 버튼 누르면 페이지 바뀌게~
        }
      })
      // const result = await axios.get(
      //   'https://api.themoviedb.org/3/movie/now_playing?api_key=97b55b83a239d95abb842dddae6c1250'
      // )

      // console.log(result)

      // api 호출 성공 시 
      if (result.status === 200) {
        // 호출 결과 확인
        // console.log('getNowPlayingMovie 의 result.data.results :')
        // console.log(result.data.results)
        commit('SET_NOWPLAYING_MOVIE', result) // SET_POPULAR_MOVIE 함수를 커밋할건데, api 호출 결과 데이터도 줄게
      }
    },
    async getUpcomingMovie({ commit, state }) {
      // console.log('getUpcomingMovie')

      const result = await request("/movie/upcoming", {
        params: {
          page: state.upComingPageNum // 자체적으로 제공해주는 정보가 아님 예고편 때문에 필요함. 여기를 변수처리해서 버튼 누르면 페이지 바뀌게~
        }
      })
      // const result = await axios.get(
      //   'https://api.themoviedb.org/3/movie/upcoming?api_key=97b55b83a239d95abb842dddae6c1250'
      // )

      // console.log(result)

      // api 호출 성공 시 
      if (result.status === 200) {
        // 호출 결과 확인
        // console.log('getUpcomingMovie 의 result.data.results :')
        // console.log(result.data.results)
        commit('SET_UPCOMING_MOVIE', result) // SET_POPULAR_MOVIE 함수를 커밋할건데, api 호출 결과 데이터도 줄게
      }
    },
    async getDetailMovie({ commit }, movieId) {
      // console.log('getDetailMovie')

      const result = await request(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos' // 자체적으로 제공해주는 정보가 아님 예고편 때문에 필요함
        }
      })
      // const result = await axios.get(
      //   `https://api.themoviedb.org/3/movie/${movieId}?api_key=97b55b83a239d95abb842dddae6c1250`
      // )
      // console.log(result)

      // api 호출 성공 시 
      if (result.status === 200) {
        // 호출 결과 확인
        // console.log('getDetailMovie 의 result.data.results :')
        // console.log(result.data) // result.data.results 말고 (인기 상품 등등과 객체 내용이 다르다 왜일까 똑같은 영화 정본데 왜 다르게 했쥬ㅣ?)
        commit('SET_DETAIL_MOVIE', result.data) // SET_DETAIL_MOVIE 함수를 커밋할건데, api 호출 결과 데이터도 줄게
      }
    },
    async changePageNum({ commit, dispatch }, data) {
      console.log(data)

      // 이중 조건문
      // if (data.type === 'prev') {
      //   await commit('SET_PREV_PAGE', data.category)

      //   if (data.category === 'popular') {
      //     console.log(data.category)
      //     dispatch('getPopularMovie')
      //   }
      //   else if (data.category === 'nowPlaying') {
      //     dispatch('getNowPlayingMovie')
      //   }
      //   else if (data.category === 'upComing') {
      //     dispatch('getUpcomingMovie')
      //   }
      // } else if (data.type === 'next') {
      //   await commit('SET_NEXT_PAGE', data.category)

      //   if (data.category === 'popular') {
      //     dispatch('getPopularMovie')
      //   }
      //   else if (data.category === 'nowPlaying') {
      //     dispatch('getNowPlayingMovie')
      //   }
      //   else if (data.category === 'upComing') {
      //     dispatch('getUpcomingMovie')
      //   }
      // }

      // 개선
      data.type === 'prev'
        ? await commit('SET_PREV_PAGE', data.category)
        : await commit('SET_NEXT_PAGE', data.category)

      if (data.category === 'popular') {dispatch('getPopularMovie')}
      else if (data.category === 'nowPlaying') {dispatch('getNowPlayingMovie')}
      else if (data.category === 'upComing') {dispatch('getUpcomingMovie')}
    }
  }
}