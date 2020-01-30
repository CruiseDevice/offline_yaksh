const QuizInstructions = Vue.component('QuizInstructions', {
  template: `
    <div>
      <div id="content">
        <div class="card">
          <div v-if="quiz">
            <div class="card-header">
              <h4>{{quiz.description}}</h4>
            </div>
            <div class="card-body">
              <div class="alert alert-info ">
              You can attempt this Quiz at any time between {{quiz.start_date_time}} Asia/Kolkata and {{quiz.end_date_time}} Asia/Kolkata
              You are not allowed to attempt the Quiz before or after this duration
              </div>
              <div v-html="quiz.instructions"></div>
              <router-link :to="'/'+courseId+'/'+quiz.id" class="btn btn-primary">Start Quiz</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data () {
      return {
        courseId: undefined,
      }
  },
  computed: {
    ...Vuex.mapGetters([
      'quiz'
    ])
  },
  created () {
    this.courseId = parseInt(this.$route.params.course_id)
  },
})