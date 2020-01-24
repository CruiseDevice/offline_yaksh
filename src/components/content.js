const Content = Vue.component('Content', {
  template: `
    <div>
      <div id="content" v-if="question">
        <div class="card" id="card">
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
                    <input type="radio" ref="testcases.id"><div v-html="testcases.options"></div>
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
        </div>
      </div>
    </div>
  `,
  computed: {
    ...Vuex.mapGetters([
      'question'
    ])
  },
  methods: {
    ...Vuex.mapActions([
      'submitForm',
    ]),
    updateCheckedAnswers (e) {
      e.preventDefault()
      this.$store.dispatch('updateCheckedAnswers', e.target)
    },
    handleFileUpload (e) {
      const file = this.$refs.file.files[0];
      this.$store.commit('UPDATE_FILE', file)
    },
  }
})