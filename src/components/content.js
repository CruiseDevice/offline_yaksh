const Content = Vue.component('Content', {
  template: `
    <div id="content">
      <ToggleButton />
      <div v-if="question">
        <div class="card">
          <div class="card-header">
            {{question.id}}. <h5><strong>{{question.summary}}</strong></h5>
            <strong>{{question.type}}</strong>              
          </div>
          <div class="card-body">
            <p v-html="question.description"></p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <form @submit="submitForm">
              <input ref="answer" v-if="question.type=='integer' || question.type=='float'">
              <textarea v-if="question.type=='string'" ref="answer"></textarea>
              <div class="form-group" v-if="question.type=='code'">
                <textarea id="codemirror1" ref="answer" rows="10" cols="50" :key="question.id"></textarea>
              </div>
              <div v-if="question.type=='mcq'">
                <div v-for="testcases in question.test_cases" :key="testcases.id">
                    <input type="radio" v-model="answer" name="testcases.options" :value="testcases.options"><div v-html="testcases.options"></div>
                </div>
              </div>
              <div v-if="question.type=='mcc'">
                <div v-for="testcases in question.test_cases" :key="testcases.id">
                    <input type="checkbox" :value="testcases.options" :id="testcases.id" @change="updateCheckedAnswers" > {{testcases.options}}
                </div>
              </div>
              <input type="file" v-if="question.type=='upload'" ref="file" @change="handleFileUpload()" id="file" name="">
              
              <button class="btn btn-success">Submit</button>
              <button class="btn btn-primary">Attempt Later</button>
            </form>
          </div>
          <Error :result="result"/>
        </div>
      </div>
      <div class="card">
        <div v-if="module">
          <div class="card-header">
            <div class="row">
              <div class="col-md-8">
                {{module.name}}
              </div>
            </div>
          </div>
          <div class="card-body" v-html="module.description"></div>
        </div>
        <div v-if="lesson">
          <div class="card-header">
          </div>
            <h4>{{lesson.name}}</h4>
          <div class="card-body">
            <div v-html="lesson.description"></div>
          </div>
        </div>
      </div>
      <br/>
      <div v-if="!question">
        <center><button class="btn btn-primary" @click.prevent="nextLesson">Next</button></center>
      </div>
    </div>
  `,
  computed: {
    ...Vuex.mapGetters([
      'question',
      'answer',
      'result',
      'module',
      'lesson',
    ]),
    answer: {
      get () {
        this.$store.state.answer
      },
      set (value) {
        this.$store.commit("SET_ANSWER", value)
      }
    }
  },
  methods: {
    updateCheckedAnswers (e) {
      e.preventDefault()
      this.$store.dispatch('updateCheckedAnswers', e.target)
    },
    handleFileUpload (e) {
      const file = this.$refs.file.files[0];
      this.$store.commit('UPDATE_FILE', file)
    },
    submitForm(e) {
      e.preventDefault()
      if(this.question.type === 'mcc' || this.question.type === 'mcq') {
        const answer = this.answer
      } else {
        const answer = this.$refs.answer.value
        this.$store.commit('SET_ANSWER', answer)
      }
      this.$store.dispatch('submitAnswer')
    },
    nextLesson () {
      console.log("hello")
    }
  }
})
