var Quiz = Vue.component('Quiz', {
  template: `
    <div class="wrapper">
      <Sidebar/>
      <Content/>
      <div v-if="gettoken === undefined ">
        <form @submit=submitForm>
          <div class="form-group">
            <input ref="username" type="text" class="form-control" id="username" placeholder="Enter username">
          </div>
          <div class="form-group">
            <input ref="password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
     {{courseId}}
     {{quizId}}
    </div>
  `,
  data () {
    return {
      courseId: undefined,
      quizId: undefined
    }
  },
  created () {
    // console.log(this.gettoken)
  },
  computed: {
    ...Vuex.mapGetters([
      'gettoken'
    ])
  },
  methods: {
    submitForm (e) {
      console.log('form submitted')
      e.preventDefault()
      const username = this.$refs.username.value
      const password = this.$refs.password.value
      const payload = {username, password}
      this.$store.dispatch('login', payload)
    }
  }
})
