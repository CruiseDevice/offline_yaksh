const routes = [
  {
    path: '',
    component: Course,
    name:'ViewCourse'
  },
  {
    path: '/module/:course_id/:module_id',
    component: Module,
    name: 'ViewModule'
  },
  {
    path: '/:course_id/:quiz_id',
    component: Quiz,
    name: 'QuizModule'
  }
]

const router = new VueRouter({routes})

// Vuex Store
const store = new Vuex.Store({
  state: {
    courseData: data[0],
    questions: [],
    response: [],
    TOKEN: JSON.parse(localStorage.getItem('TOKEN')) || undefined,
    result: [],
    answer: [],
    question: JSON.parse(localStorage.getItem('question')) || undefined,
  },
  mutations: {
    UPDATE_COURSE (state, payload) {
      state.courseData = payload
    },
    UPDATE_TOKEN (state, payload) {
      state.TOKEN = payload
    },
    UPDATE_SELECTED_QUESTION(state, payload) {
      state.questions = payload.data;
      state.response = payload;
    },
    UPDATE_QUESTION (state, payload) {
      state.question = payload
    },
    UPDATE_CHECKED_ANSWERS (state, payload) {
      state.answer.push(payload)
    },
    REMOVE_CHECKED_ANSWERS (state, payload) {
      state.answer = state.answer.filter(ans => {
          return ans != payload.id
      })
    },

    UPDATE_FILE (state, payload) {
      state.file = payload
    },

  },
  actions: {
    getCourse ({commit}) {
      commit('UPDATE_COURSE', courseData)
    },
    login (state, payload) {
      const username = payload["username"]
      const password = payload["password"]
      axios({
        method: 'POST',
        url: 'http://localhost:8000/api/login/',
        data: {
          username: username,
          password: password
        }
      })
      .then((response) => {
        token = response.data.token
        if (token) {
          localStorage.setItem('TOKEN', JSON.stringify(token))
          state.commit('UPDATE_TOKEN', token)
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    showQuestion({commit}, question) {
      this.state.result = []
      this.state.answer = []
      commit('UPDATE_QUESTION', question)
      localStorage.setItem('question', JSON.stringify(question))
    },
    
    updateCheckedAnswers ({commit}, choices) {
      if(choices.checked) {
        commit('UPDATE_CHECKED_ANSWERS', choices.id)
      } else {
        commit('REMOVE_CHECKED_ANSWERS', choices)
      }
    },

  },
  getters: {
    course_data: state => state.courseData,
    getQuestions: state => state.questions,
    gettoken: state => state.TOKEN,
    question: state => state.question
  }
})


new Vue({
  name: 'App',
  el: '#app',
  router,
  store,
  // data () {
  //   return {
  //     data: courseData
  //   }
  // },
  template : `
  <div>
    <nav class="navbar bg-dark navbar-dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            <img src="@/../static/images/yaksh_banner.png" alt="YAKSH"/>
          </a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
  `,
  created () {
    // this.getCourse()
  },
  methods: {
  }
})


// const data = [
//   {
//     "id": 868,
//     "learning_unit": [
//       {
//         "id": 45,
//         "name": "Unit 1",
//         "desc": "Description"
//       }
//     ]
//   },
//   {
//     "id": 128,
//     "learning_unit": [
//       {
//         "id": 145,
//         "name": "Unit 1",
//         "desc": "Description"
//       }
//     ]
//   },
//   ]
  
  
// const result = data.filter((data) => {
//   return data["id"] === 868
// })
// console.log(result)