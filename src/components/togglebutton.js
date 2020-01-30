const ToggleButton = Vue.component('ToggleButton', {
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div>
            <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i class="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
        </div>
      </nav>
    </div>
  `
})