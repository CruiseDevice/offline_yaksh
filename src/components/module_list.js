var ModuleList = Vue.component('ModuleList', {
  template: `
    <div class="wrapper">
      <ul class="list-unstyled components">
        <div v-for="(module, index) in modules.learning_module" :key="module.id">
          <li :class="{'active': module.id === moduleId }" @click="activeModule(module.id)" :id="'moduleList-' + moduleId">
            <a @click="showModule(module)">{{module.name}}</a>
            <ul class="list-unstyled">
              <div v-for="(unit, index) in module.learning_unit" :key="unit.id">
                <li :class="{'active': unit.id === unitId }" @click="activeUnit(unit.id)" :id="'unitList-' + unitId">
                  <div v-if="unit.quiz">
                    <router-link v-on:click.native="showQuiz(unit.quiz)" :to="'/'+courseId+'/'+unit.id+'/'+unit.quiz.id" target="_blank">{{unit.quiz.description}}</router-link>
                  </div>
                  <div v-if="unit.lesson">
                    <a @click="showUnit(unit)">{{unit.lesson.name}}</a>
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
    }
  },
  created () {
    this.courseId = parseInt(this.$route.params.course_id)
    const moduleId = parseInt(this.$route.params.module_id)
    this.$store.dispatch('update_module', moduleId)
    this.$store.dispatch('get_first_lesson')
    this.$store.dispatch('activeModule', moduleId)
    localStorage.removeItem("quiz")
  },
  computed: {
    ...Vuex.mapGetters([
        'moduleId',
        'unitId'
      ])
  },
  methods: {
    ...Vuex.mapActions([
      'showModule',
      'showUnit',
      'showQuiz',
      'activeModule',
      'activeUnit',
    ]),
  }
})
