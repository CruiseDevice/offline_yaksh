const ToggleButton = Vue.component('ToggleButton', {
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div>
            <button type="button" @click.prevent="toggleActive" id="sidebarCollapse" class="btn btn-info">
              <div id="burger"></div>
              <div id="burger"></div>
              <div id="burger"></div>
            </button>
        </div>
      </nav>
    </div>
  `,
  computed: {
    ...Vuex.mapGetters([
      'active'
    ])
  },
  methods: {
    toggleActive () {
      if (this.active === 'active') {
        this.$store.state.active = ''
      } else {
        this.$store.state.active = 'active'
      }
    }
  }
})