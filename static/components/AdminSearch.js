export default {
  template: `
  <div class="container-fluid p-0 m-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <p class="navbar-brand p-0 m-0 text-warning">Welcome Admin</p>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-5" id="adminNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><router-link class="nav-link" to="/adminHome">Home</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/adminUsers">Users</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/adminSearch">Search</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/adminSummary">Summary</router-link></li>
          </ul>
          <ul class="navbar-nav ms-auto me-5">
            <li class="nav-item"><a class="nav-link text-danger" href="#" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
    <div class="container mt-4">

    <div class="d-flex flex-column flex-lg-row mb-4">
      <label class="me-2 align-self-center mb-3">Search by</label>
      <select class="form-select w-25 me-2 mb-3" v-model="searchType">
        <option value="" disabled>Select Type</option>
        <option value="location">Location</option>
        <option value="user">User ID</option>
        <option value="spot">Spot ID</option>
      </select>
      <input v-model.trim="query" type="text" class="form-control w-50 me-2 mb-3" placeholder="Enter search term..." @keyup.enter="performSearch" />
      <button class="btn btn-primary" @click="performSearch">Search</button>
    </div>

    <div v-if="results.length > 0" class="mt-4">
      <h5 class="text-primary">Search Results</h5>
      <div v-for="result in results" :key="result.id || result.lot_id">
        
        <div v-if="result.type === 'lot'" class="card my-3">
          <div class="card-header bg-info text-white d-flex justify-content-between">
            <span>Parking Lot #{{ result.lot_id }} - {{ result.address }}</span>
          </div>
          <div class="card-body">
            <p>Occupied: {{ result.occupied }} / {{ result.capacity }}</p>
            <div class="d-flex flex-wrap">
              <div v-for="spot in result.spots" :key="spot.id"
                :class="['m-1 px-3 py-1 rounded', spot.is_occupied ? 'bg-danger' : 'bg-success']"
                style="color: white;">
                {{ spot.id }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="result.type === 'user'" class="card my-2">
          <div class="card-body">
            <p class="mb-1"><strong>{{ result.name }}</strong> - {{ result.email }}</p>
            <p class="mb-0">Pincode: {{ result.pincode }}</p>
          </div>
        </div>

        <div v-if="result.type === 'spot'" class="card my-2">
          <div class="card-body">
            <p class="mb-0">Spot ID: {{ result.id }} | Lot ID: {{ result.lot_id }} | Occupied: {{ result.is_occupied ? 'Yes' : 'No' }}</p>
          </div>
        </div>

      </div>
    </div>
    
    <div v-else-if="searched" class="text-center mt-5">
        <p>No results found for your query.</p>
    </div>

    </div>
  </div>
  `,
  data() {
    return {
      searchType: '',
      query: '',
      results: [],
      searched: false
    };
  },
  mounted() {
    const { type, query } = this.$route.query;
    if (type && query) {
      this.searchType = type;
      this.query = query;
      this.fetchSearchResults();
    }
  },
  watch: {
    '$route.query'(newQuery, oldQuery) {
      this.searchType = newQuery.type || '';
      this.query = newQuery.query || '';
      this.fetchSearchResults();
    }
  },
  methods: {
    performSearch() {
      this.$router.replace({ query: { type: this.searchType, query: this.query } });
    },
    async fetchSearchResults() {
      this.searched = true;
      if (!this.query) {
        this.results = [];
        return;
      }
      try {
        const response = await fetch(`/api/admin/search?type=${this.searchType}&query=${this.query}`, {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
        });

        const data = await response.json();
        this.results = data;
      } catch (err) {
        console.error("Error fetching search results:", err);
        this.results = [];
      }
    },
    logout() {
        console.log("User logged out");
        localStorage.removeItem("auth_token");
        this.$router.push('/login');
    }
  },
};