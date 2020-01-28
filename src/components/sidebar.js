const Sidebar = Vue.component('Sidebar', {
  template: `
    <div>
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>{{course_data.name}}</h3>
        </div>
        <div v-if="getQuestions">
          <QuestionNumbers
            :questions="getQuestions"
          />
        </div>
        <div>
          <ModuleList :modules="course_data"/>
        </div>
      </nav>
    </div>
  `,
  computed: {
    ...Vuex.mapGetters([
      'getQuestions',
      'gettoken',
      'course_data'
    ])
  },
  created () {
    const courseId = parseInt(this.$route.params.course_id)
    const quizId = parseInt(this.$route.params.quiz_id)
    if (courseId && quizId){
      this.fetchQuestions(courseId, quizId)
    }
  },
  methods: {
    fetchQuestions (course_id, quiz_id) {
      axios({
        method: 'get',
        url: `http://localhost:8000/api/start_quiz/${course_id}/${quiz_id}`,
        headers: {
          Authorization: 'Token ' + this.gettoken,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.$store.commit('UPDATE_SELECTED_QUESTION', response)
      })
    }
  }
})