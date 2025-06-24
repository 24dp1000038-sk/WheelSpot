export default {
  template: `
  <div class="container-fluid p-0 m-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <p class="navbar-brand p-0 m-0 text-warning">Welcome to Admin</p>
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
            <li class="nav-item"><router-link class="nav-link" to="/adminProfile">Edit Profile</router-link></li>
            <li class="nav-item"><a class="nav-link text-danger" href="#" @click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4" v-if="message">
      <div class="alert alert-danger d-flex justify-content-between" role="alert">
        {{ message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </div>

    <!-- Parking Lots Grid -->
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="text-primary">Parking Lots</h4>
        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addLotModal">+ Add Lot</button>
      </div>

      <div class="row">
        <div class="col-md-4 mb-4" v-for="lot in lots" :key="lot.id">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Parking#{{lot.id}}  {{ lot.location }}</h5>
              <p><strong>(Occupied: {{ lot.occupied_spots }}/{{ lot.total_spots }})</strong></p>

              <!-- Spot Statuses -->
              <div class="d-flex flex-wrap gap-1 mb-2">
                <button v-for="n in lot.spots.length" :key="n"
                  class="badge btn"
                  :class="{
                    'bg-success': lot.spots[n - 1].status === 'O',
                    'bg-secondary': lot.spots[n - 1].status === 'A'
                  }"
                >{{ lot.spots[n - 1].status }}</button>
              </div>

              <div class="d-flex justify-content align-items-center">
                <button class="btn btn-outline-warning me-2"data-bs-toggle="modal" data-bs-target="#updateLot" @click="updateLot(lot)">Edit</button>
                <button class="btn btn-outline-danger ms-2" @click="deleteLot(lot.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!---- Add lot module -->
    <div class="modal fade" id="addLotModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title">Add New Parking Lot</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createLot(newLot)">
                <div class="mb-3">
                  <label for="location" class="form-label">Location</label>
                  <input type="text" class="form-control" id="location" v-model="newLot.location" required>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <input type="text" class="form-control" id="address" v-model="newLot.address" required>
                </div>
                <div class="mb-3">
                  <label for="pincode" class="form-label">Pincode</label>
                  <input type="text" class="form-control" id="pincode" v-model="newLot.pincode" required>
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Price per Hour</label>
                  <input type="number" class="form-control" id="price" v-model="newLot.price" required>
                </div>
                <div class="mb-3">
                  <label for="total_spots" class="form-label">Total Spots</label>
                  <input type="number" class="form-control" id="total_spots" v-model="newLot.total_spots" required>
                </div>
                <div class="mb-3 d-flex justify-content-end">
                  <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-success me-3">Add Lot</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    <!---- Edit lot Module -->
    <div class="modal fade" id="updateLot" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title">Edit Parking Lot</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateLot(newLot)">
                <div class="mb-3">
                  <label for="location" class="form-label">Location</label>
                  <input type="text" class="form-control" id="location" v-model="newLot.location" value="{{ lot.location }}" required>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <input type="text" class="form-control" id="address" v-model="newLot.address" value="{{ lot.address }}" required>
                </div>
                <div class="mb-3">
                  <label for="pincode" class="form-label">Pincode</label>
                  <input type="text" class="form-control" id="pincode" v-model="newLot.pincode" value="{{ lot.pincode }}" required>
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">Price per Hour</label>
                  <input type="number" class="form-control" id="price" v-model="newLot.price" value="{{ lot.price }}" required>
                </div>
                <div class="mb-3">
                  <label for="total_spots" class="form-label">Total Spots</label>
                  <input type="number" class="form-control" id="total_spots" v-model="newLot.total_spots" value="{{ lot.total_spots }}" required>
                </div>
                <div class="mb-3 d-flex justify-content-end">
                  <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-success me-3">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  `,
  data() {
    return {
      lots: [],
      newLot: {
      location: '',
      address: '',
      pincode: '',
      price: null,
      total_spots: null,
    },
    updateLot:{
      location: '',
      address: '',
      pincode: '',
      price: null,
      total_spots: null,
    },
      message: '',
    };
  },
  mounted() {
    this.fetchLots();
  },
  methods: {
    async fetchLots() {
      try {
        const response = await fetch("/api/admin/lot/view", {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
        });
        const data = await response.json();
        this.lots = data;
        console.log("Fetched lots:", this.lots);
      } catch (err) {
        console.error("Error fetching lots", err);
      }
    },
    async createLot(lotData){
      try {
        const response = await fetch("/api/admin/lot/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
          body: JSON.stringify({
            location: lotData.location,
            address: lotData.address,
            pincode: lotData.pincode,
            price: lotData.price,
            total_spots: lotData.total_spots,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to create lot");
        }
        this.fetchLots();
      } catch (err) {
        console.error("Error creating lot", err);
      }
    },
    async updateLot(lotId, updatedData) {
      try {
        const response = await fetch(`/api/admin/lot/update/${lotId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
          body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
          throw new Error("Failed to update lot");
        }
        this.fetchLots();
      } catch (err) {
        console.error("Error updating lot", err);
      }
    },
    async deleteLot(lotId) {
      try {
        const response = await fetch(`/api/admin/lot/delete/${lotId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
        });
        if (!response.ok) {
          const result = await response.json();
          this.message = result.message || "Failed to delete lot.";
          return;
        }
        this.fetchLots();
      } catch (err) {
        console.error("Error deleting lot", err);
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};

