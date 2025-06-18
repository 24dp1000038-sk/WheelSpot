export default {
  template: `
  <div class="container-fluid p-0 m-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <p class="navbar-brand p-0 m-0">Parking Admin</p>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar" aria-controls="adminNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse ms-5" id="adminNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/adminHome">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/adminUsers">Users</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/adminSearch">Search</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/adminSummary">Summary</router-link>
              </li>
            </ul>
            
            <ul class="navbar-nav ms-auto me-5">
              <li class="nav-item">
                <router-link class="nav-link" to="/adminHome">Edit Profile</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link text-danger" href="#" @click="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <h3 class="mt-3">welcome to admin Summary Page</h3>
  </div>
  `,
};

