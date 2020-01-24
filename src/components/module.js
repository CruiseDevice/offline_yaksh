var Module = Vue.component('Module', {
  template: `
    <div class="container" id="modules">
        <div v-for="module in getModule(moduleId)">
          <div v-for="unit in module.learning_unit">
            <div class="card">
              <div v-if="unit.quiz">
                <div class="card-header">
                <div class="row">
                  <div class="col-md-8"><h4>{{unit.quiz.description}}</h4></div>
                  <div class="col-md-4">
                    <router-link :to="'/'+courseId+'/'+unit.quiz.id" class="btn btn-primary">Start Quiz</router-link>
                  </div>
                </div>
                </div>
                <div class="card-body">
                  <div v-html="unit.quiz.instructions">
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="card-header">
                  <h4>{{unit.lesson.name}}</h4>
                </div>
                <div class="card-body">
                  <div v-html="unit.lesson.description"></div>
                </div>
              </div>
            </div>
            <br/>
          </div>
        </div>
    </div>
  `,
  data () {
      return {
        moduleId: undefined,
        courseId: undefined,
      }
  },
  created () {
    this.courseId = parseInt(this.$route.params.course_id)
    this.moduleId = parseInt(this.$route.params.module_id)
  },
  methods: {
      getModule(moduleId){
        const mymodule = data[0].learning_module
        const result = mymodule.filter((module) => {
          return module["id"] === moduleId
        })
        console.log("jhsdfhasjkh")
        console.log(result[0])
        return result
      }
  }
})
