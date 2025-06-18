export default{
    template: `
    <div class="container-fluid p-0 m-0">
      <!-- NavBar --->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <p class="navbar-brand p-0 m-0">Parking User</p>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNavbar" aria-controls="userNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse ms-5" id="userNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/userHome">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/userSummary">Summary</router-link>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto me-5">
              <li class="nav-item">
                <a class="nav-link text-danger" href="#" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    `,
};