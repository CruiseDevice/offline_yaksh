var ModuleList = Vue.component('ModuleList', {
  template: `
    <div class="wrapper">
      <ul class="list-unstyled components">
        <div v-for="(module, index) in modules.learning_module" :key="module.id">
          <li :class="{'active': module.id === moduleId }" @click="activeModule(module.id)" :id="'moduleList-' + moduleId">
            <a @click="showModule(module)">{{module.name}}</a>
            <ul class="list-unstyled">
              <div v-for="(unit, index) in module.learning_unit" :key="unit.id">
                <li :class="{'active': unitId === unit.id}" @click="activeUnit(unit.id)">
                  <div v-if="unit.quiz">
                    <router-link v-on:click.native="showQuiz(unit.quiz)" :to="'/'+courseId+'/'+unit.id+'/'+unit.quiz.id" target="_blank">{{unit.quiz.description}}</router-link>
                  </div>
                  <div v-if="unit.lesson">
                    <a @click="showLesson(unit.lesson)">{{unit.lesson.name}}</a>
                  </div>
                </li>
              </div>
            </ul>
          </li>
        </div>
      </ul>
    </div>
  `,
  props: ['modules'],
  data () {
    return {
      courseId: undefined,
      moduleId: undefined,
      unitId: undefined
    }
  },
  created () {
    this.courseId = parseInt(this.$route.params.course_id)
    this.moduleId = parseInt(this.$route.params.module_id)
    localStorage.removeItem("quiz")
  },
  methods: {
    ...Vuex.mapActions([
      'showModule',
      'showLesson',
      'showQuiz'
    ]),
    activeModule (module_id) {
      this.moduleId = module_id
    },
    activeUnit (unit_id) {
      this.unitId = unit_id
    }
  }
})
