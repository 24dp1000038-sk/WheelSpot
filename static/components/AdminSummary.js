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

    <div class="container my-4 my-md-5">
      <div class="text-center mb-5">
          <h1 class="display-5 fw-bold">Admin Summary</h1>
      </div>
      <div class="row g-4">
        <!--- Revenue per lot details summary ---->
        <div class="col-lg-6">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-primary text-white">
                <h5 class="mb-0 text-center">Revenue per Lot</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                      <th scope="col" class="ps-3">Lot ID</th>
                      <th scope="col" class="text-end pe-3">Total Revenue (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in lotRevenue" :key="item.lot_id">
                        <td class="ps-3">{{ item.lot_id }}</td>
                        <td class="text-end pe-3 fw-semibold">{{ item.total_amount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!--- Spot ugagess summary ---->
        <div class="col-lg-6">
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-dark text-white">
              <h5 class="mb-0 text-center">Spot Usage</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                  <thead class="table-light">
                    <tr>
                        <th scope="col" class="ps-3">Lot ID</th>
                        <th scope="col">Location</th>
                        <th scope="col" class="text-center">Available</th>
                        <th scope="col" class="text-center pe-3">Occupied</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in lotUsage" :key="item.lot_id">
                        <td class="ps-3">{{ item.lot_id }}</td>
                        <td>{{ item.location }}</td>
                        <td class="text-center text-success fw-bold">{{ item.available }}</td>
                        <td class="text-center text-danger fw-bold pe-3">{{ item.occupied }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  `,

  data() {
    return {
      lotRevenue: [],
      lotUsage: []
    };
  },

  mounted() {
    this.fetchSummary();
  },

  methods: {
    logout() {
      localStorage.removeItem("auth_token");
      this.$router.push("/login");
    },

    async fetchSummary() {
      try {
        const response = await fetch("/api/admin/summary", {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          }
        });
        const data = await response.json();

        this.lotRevenue = data.bill;
        this.lotUsage = data.lots;
      } catch (err) {
        console.error("Error loading summary:", err);
      };
    },
  },
};
