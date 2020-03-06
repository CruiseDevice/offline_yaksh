var Quiz = Vue.component('Quiz', {
  template: `
    <div class="wrapper">
      <div>
        <Loading v-if="loading"/>
      </div>
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
    </div>
  `,
  computed: {
    ...Vuex.mapGetters([
      'gettoken',
      'loading'
    ]),
  },
  methods: {
    submitForm (e) {
      console.log('form submitted')
      e.preventDefault()
      const username = this.$refs.username.value,
            password = this.$refs.password.value,
            payload = {username, password}
      this.$store.dispatch('login', payload)
    }
  }
})
