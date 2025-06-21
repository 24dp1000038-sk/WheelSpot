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
    <div class="container mt-4">

    <div class="d-flex my-3">
      <label class="me-2 ">Search by</label>
      <select class="form-select w-25 me-2" v-model="searchType">
        <option value="" disabled focus>Select Type</option>
        <option value="user">User ID</option>
        <option value="spot">Spot ID</option>
        <option value="location">Location</option>
      </select>
      <input v-model="query" type="text" class="form-control w-50 me-2" placeholder="Search string" />
      <button class="btn btn-primary" @click="performSearch">Search</button>
    </div>

    <div v-if="results.length" class="mt-4">
      <h5 class="text-primary">Search Results</h5>

      <div v-for="lot in results" v-if="lot.type === 'lot'" :key="lot.lot_id" class="card my-3">
        <div class="card-header bg-info text-white d-flex justify-content-between">
          <span>Parking#{{ lot.lot_id }} - {{ lot.address }}</span>
          <span>
            <a href="#" class="text-white me-2">Edit</a> |
            <a href="#" class="text-white ms-2">Delete</a>
          </span>
        </div>
        <div class="card-body">
          <p>Occupied: {{ lot.occupied }} / {{ lot.capacity }}</p>
          <div class="d-flex flex-wrap">
            <div v-for="spot in lot.spots" :key="spot.id"
              :class="['m-1 px-3 py-1 rounded', spot.is_occupied ? 'bg-danger' : 'bg-success']"
              style="color: white;">
              {{ spot.id }}
            </div>
          </div>
        </div>
      </div>

      <div v-for="user in results" v-if="user.type === 'user'" :key="user.id" class="card my-2">
        <div class="card-body">
          <p><strong>{{ user.name }}</strong> - {{ user.email }}</p>
          <p>Pincode: {{ user.pincode }}</p>
        </div>
      </div>

      <div v-for="spot in results" v-if="spot.type === 'spot'" :key="spot.id" class="card my-2">
        <div class="card-body">
          <p>Spot ID: {{ spot.id }} | Lot ID: {{ spot.lot_id }} | Occupied: {{ spot.is_occupied ? 'Yes' : 'No' }}</p>
        </div>
      </div>
    </div>
    </div>
  </div>

  `,
  data() {
    return {
      searchType: 'location',
      query: '',
      results: []
    };
  },
  methods: {
    async performSearch() {
      const res = await fetch(`/api/admin/search?type=${this.searchType}&query=${this.query}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      this.results = await res.json();
    }
  }
};
