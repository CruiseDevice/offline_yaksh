var Course = Vue.component('Course', {
  template:`
    <div class="container" id="modules">
      <div v-for="(module, index) in course_data.learning_module" :key="module.id">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-8">
                {{module.name}}
              </div>
              <div class="col-md-4">
                <p>
                  <button class="btn btn-primary" data-toggle="collapse" :data-target="'#collapseExample-' + index">
                    DETAILS
                  </button>
                  <router-link :to="'/module/'+ course_data.id + '/' + module.id" class="btn btn-success">Start</router-link>
                </p>
              </div>
            </div>
          </div>
          <div class="collapse" :id="'collapseExample-' + index">
            <div class="card-body" v-html="module.description">
            </div>
          </div>
        </div>
        <br/>
      </div>
    </div>
  `,
  computed: {
      ...Vuex.mapGetters([
        'course_data'
      ])
  }
})