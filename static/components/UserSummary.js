export default {
  template: `
  <div class="container-fluid p-0 m-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <p class="navbar-brand p-0 m-0">Parking User</p>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-5" id="userNavbar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><router-link class="nav-link" to="/userHome">Home</router-link></li>
            <li class="nav-item"><router-link class="nav-link" to="/userSummary">Summary</router-link></li>
          </ul>
          <ul class="navbar-nav ms-auto me-5">
            <li class="nav-item"><a class="nav-link text-danger" href="#" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <h4 class="display-5 fw-bold">User Summary</h4>

      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card border-info mb-3">
            <div class="card-body">
              <h5 class="card-title">Total Bookings</h5>
              <p class="card-text fs-4">{{ totalBookings }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card border-success mb-3">
            <div class="card-body">
              <h5 class="card-title">Total Amount Spent</h5>
              <p class="card-text fs-4">₹ {{ totalAmount }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="bookings.length">
        <h5 class="mb-3">Booking Details</h5>
        <table class="table table-bordered table-hover table-responsive">
          <thead class="table-light">
            <tr>
              <th>SR No.</th>
              <th>Lot Location</th>
              <th>Spot ID</th>
              <th>Amount</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Bill Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in bookings" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ b.lot_location }}</td>
              <td>{{ b.spot_id }}</td>
              <td>{{ b.vehicle_number }}</td>
              <td>{{ b.start_time }}</td>
              <td>{{ b.end_time }}</td>
              <td>₹ {{ b.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-muted mt-4">No bookings found.</div>
    </div>
  </div>
  `,
  data() {
    return {
      bookings: [],
      totalBookings: 0,
      totalAmount: 0,
    };
  },
  mounted() {
    this.fetchSummary();
  },
  methods: {
    async fetchSummary() {
      try {
        const response = await fetch("/api/user/summary", {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
        });
        const data = await response.json();
        this.bookings = data.bookings || [];
        this.totalBookings = data.total_bookings || 0;
        this.totalAmount = data.total_amount || 0;
      } catch (err) {
        console.error("Failed to fetch summary", err);
      }
    },
    logout() {
      localStorage.removeItem("auth_token");
      this.$router.push("/login");
    }
  }
}
