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
              <div class="alert alert-success animated flash">
                {{quiz}}
              </div>
              <div v-html="quiz.instructions"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  computed: {
    ...Vuex.mapGetters([
      'quiz'
    ])
  },
})