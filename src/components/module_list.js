var ModuleList = Vue.component('ModuleList', {
  template: `
    <div class="wrapper">
      <ul class="list-unstyled components">
        <div v-for="(module, index) in modules.learning_module" :key="module.id">  
          <li>
            <a @click="showModule(module)">{{module.name}}</a>
            <ul class="list-unstyled">
              <div v-for="(unit, index) in module.learning_unit" :key="unit.id">
                <li>
                  <div v-if="unit.quiz">
                    <a @click="showQuiz(unit.quiz)">{{unit.quiz.description}}</a>
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
    }
  },
  created () {

  },
  methods: {
    ...Vuex.mapActions([
      'showModule',
      'showLesson',
      'showQuiz'
    ])
  }
})
