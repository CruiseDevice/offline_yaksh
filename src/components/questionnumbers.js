const QuestionNumbers = Vue.component('QuestionNumbers', {
  template: `
    <div>
      <div class="question_numbers" v-for="(question, index) in questions.questions" :key="question.id">
        <button @click="showQuestion(question)" class="btn btn-outline-success">{{index+1}}</button>
      </div>
    </div>
  `,
  props: ['questions'],
  methods: {
    ...Vuex.mapActions([
      'showQuestion'
    ])
  }
})