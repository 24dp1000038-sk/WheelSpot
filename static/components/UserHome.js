export default {
  template: `
    <div class="container-fluid min-vh-100 bg-light d-flex flex-column">
      <link rel="stylesheet" href="../static/css/nav.css">
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm py-2 nav-color">
        <div class="container">
          <router-link class="navbar-brand d-flex align-items-center" to="/">
            <i class="bi bi-car-front-fill me-2 fs-4"></i>
            <span class="fw-bold fs-4" style="letter-spacing: 0.5px;">WheelSpot</span>
          </router-link>
        <div class="ms-auto">
            <router-link to="/login" class="btn btn-outline-light px-3 px-sm-4 rounded-pill">
              <i class="bi bi-box-arrow-in-right me-1 me-sm-2"></i>
              <span class="d-none d-sm-inline">Login</span>
            </router-link>
            </div>
        </div>
      </nav>
    </div>               
`,
};
