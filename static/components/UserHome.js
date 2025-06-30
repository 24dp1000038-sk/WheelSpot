export default {
  template: `
    <div class="container-fluid p-0 m-0">
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
      <div class="container mt-4">
        <!---- User Parking History and release option after booking ---->
        <div class="card mt-4">
          <h3 class="text-primary text-center">Recent Parking History</h3>
          <div v-if="history.length > 0" class="card">
            <div class="card-body p-2 table-responsive">
              <table class="table table-bordered text-center mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Booking ID</th>
                    <th>Location</th>
                    <th>Vehicle No</th>
                    <th>Parking In</th>
                    <th>Parking Out</th>
                    <th>Total Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in history" :key="booking.booking_id">

                    <td>{{ booking.booking_id }}</td>
                    <td>{{ booking.location}}</td>
                    <td>{{ booking.vehicle_number }}</td>
                    <td>{{ booking.start_time }}</td>
                    <td>{{ booking.end_time ? booking.end_time : 'Active' }}</td>
                    <td>₹{{ booking.total_cost}}</td>
                    <td>
                      <button v-if="!booking.end_time" class="btn btn-danger btn-sm" @click="openReleaseModal(booking.spot_id)">Release</button>
                      <span v-else >-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else class="text-center text-danger mt-3">
            <p>No parking history found.</p>
          </div>
        </div>
        
        <div class="d-flex justify-content-between align-items-center mb-4 mt-3">
          <h2 class="text-primary">Book spots</h2>
          <div>
            <!--- csv export button for downloading csv report ------>
            <button @click="csvExport" class="btn btn-warning">Download CSV Report</button>
          </div>
        </div>

        <!-- Parking Lots Table -->
        <div class="card mb-4" v-if="lots.length > 0">
          <div class="card-body p-2 table-responsive">
            <table class="table table-bordered text-center mb-0">
              <thead class="table-light">
                <tr>
                  <th>ID</th>
                  <th>Location</th>
                  <th>Availability</th>
                  <th>Price per hour</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="lot in lots" :key="lot.id">
                  <td>{{ lot.id }}</td>
                  <td>{{ lot.location }}</td>
                  <td>{{ lot.available_spots }}</td>
                  <td>₹ {{ lot.price }}</td>
                  <td>
                    <button class="btn btn-primary btn-sm" @click="openBookModal(lot.id)" :disabled="lot.available_spots == 0">Book</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="text-center text-danger mt-3">
          <p>No Parking Lots Found.</p>
        </div>
      </div>
      
      <!-- Book Modal -->
      <div class="modal fade" id="bookModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title">Book a Parking Spot</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div v-if="message !== '' " class="text-danger text-center">{{ message }}</div>
            <div class="modal-body">
              <form @submit.prevent="bookParkingSpot">
                <div class="mb-3">
                  <label>Lot ID:</label>
                  <input type="text" class="form-control" :value="bookingData.lot_id" readonly />
                </div>
                <div class="mb-3">
                  <label>User ID:</label>
                  <input type="text" class="form-control" :value="bookingData.user_id" readonly />
                </div>
                <div class="mb-3">
                  <label>Vehicle Number:</label>
                  <input type="text" class="form-control" v-model="bookingData.vehicle_number" placeholder="e.g.,BR01WH1007" required />
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">Reserve</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Release Modal -->
      <div class="modal fade" id="releaseModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title">Release the Parking Spot</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" v-if="releaseDetails">
              <div class="mb-3">
                <label>Spot ID:</label>
                <input type="text" class="form-control" :value="releaseDetails.spot_id" readonly />
              </div>
              <div class="mb-3">
                <label>Vehicle Number:</label>
                <input type="text" class="form-control" :value="releaseDetails.vehicle_number" readonly />
              </div>
              <div class="mb-3">
                <label>Parking Time:</label>
                <input type="text" class="form-control" :value="releaseDetails.parking_time" readonly />
              </div>
              <div class="mb-3">
                <label>Releasing Time:</label>
                <input type="text" class="form-control" :value="releaseDetails.releasing_time" readonly />
              </div>
              <div class="mb-3">
                <label>Total Cost:</label>
                <input type="text" class="form-control" :value="'₹' + releaseDetails.total_cost" readonly />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger" @click="releaseParking(releaseDetails.spot_id)">Release</button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  data() {
    return {
      lots: [],
      history:[],
      selectedSpotId: null,
      bookingData: {
      lot_id: null,
      vehicle_number: '',
      user_id: localStorage.getItem("user_id")
      },
      releaseDetails:{},
      message: "",
    };
  },
  mounted() {
  this.parkingHistory();
  this.viewParkingLots();
  },
  methods: {
    async parkingHistory() {
    try {
      const response = await fetch("/api/user/spot/history", {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": localStorage.getItem("auth_token"),
        },
      });
      const data = await response.json();
      this.history = data.history;
    } catch (err) {
      console.error("Error fetching parking history", err);
      }
    },
    async viewParkingLots() {
      try{
        const response = await fetch("/api/user/parking/lot/view", {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        });
        const data = await response.json();
        this.lots = data.lots;
        await this.parkingHistory();
      } catch(err){
        console.error("Error fetching parking lots", err);
      }
    },
    async openBookModal(lotId) {
      this.bookingData.lot_id = lotId;
      this.bookingData.vehicle_number = "";
      const modal = new bootstrap.Modal(document.getElementById('bookModal'));
      modal.show();
    },
    async bookParkingSpot() {
      try {
        const response = await fetch(`/api/user/book/spot/${this.bookingData.lot_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
          body: JSON.stringify({ vehicle_number: this.bookingData.vehicle_number })
        });

        const data = await response.json();
        if (!response.ok) {
          this.message = data.message;
          return;
        }
        await this.parkingHistory();
        bootstrap.Modal.getInstance(document.getElementById('bookModal')).hide();
      } catch (err) {
        console.error("Error booking parking spot", err);
      }
    },
    async openReleaseModal(spotId) {
      try {
        const response = await fetch(`/api/user/spot/release/preview/${spotId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          }
        });
        const data = await response.json();
        if (response.ok) {
          this.releaseDetails = data;
          const modal = new bootstrap.Modal(document.getElementById('releaseModal'));
          modal.show();
        } else {
          this.message = data.message;
        }
      } catch (err) {
        console.error("Error fetching release preview", err);
      }
    },
    async releaseParking(spotId) {
      try {
        const response = await fetch(`/api/user/spot/release/${spotId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
          body: JSON.stringify({ spot_id: spotId }),
        });
        const data = await response.json();
        await this.parkingHistory();
        await this.viewParkingLots();
        if (!response.ok) {
          this.message = data.message || "Could not release parking spot.";
        };
        bootstrap.Modal.getInstance(document.getElementById('releaseModal')).hide();
      } catch (err) {
      console.error("Error releasing parking", err);
      }
    },
    async logout() {
      console.log('User logged out');
      this.$router.push('/login');
    },
    async csvExport() {
      try {
        const response = await fetch("/api/export", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token"),
          },
        });
        const data = await response.json();
        window.location.href = `/api/csv_result/${data.id}`
      } catch (err) {
        console.error("Error fetching lots", err);
      }
    },
  },
};
