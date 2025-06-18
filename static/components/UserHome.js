export default {
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
      <!-- Recent Parking History -->
      <div class="container mt-4">
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">
          Recent Parking History
        </div>
        <div class="card-body p-2 table-responsive">
          <table class="table table-bordered text-center mb-0">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Vehicle No</th>
                <th>Timestamp</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>120</td>
                <td>xxxxx</td>
                <td>TN13B988</td>
                <td>xx-xx-xx</td>
                <td>
                  <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#releaseModal">Release</button>
                </td>
              </tr>
              <tr>
                <td>142</td>
                <td>xxxxx</td>
                <td>AP31Q421</td>
                <td>xx-xx-xx</td>
                <td><button class="btn btn-secondary btn-sm">Parked Out</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Search Parking -->
      <div class="d-flex flex-wrap align-items-center mb-4 gap-2">
        <label class="fw-bold">Search parking @location/pin code :</label>
        <input type="text" class="form-control flex-grow-1 flex-md-grow-0" placeholder="Dadar Road" style="max-width: 250px;" />
      </div>

      <!-- Parking Lots Table -->
      <div class="card mb-4">
        <div class="card-header bg-info text-white">
          Parking Lots @ Dadar Road
        </div>
        <div class="card-body p-2 table-responsive">
          <table class="table table-bordered text-center mb-0">
            <thead class="table-light">
              <tr>
                <th>ID</th>
                <th>Address</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>132</td>
                <td>K. Gadgil Marg, xxxxx</td>
                <td>6</td>
                <td>
                  <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#bookModal">Book</button>
                </td>
              </tr>
              <tr>
                <td>136</td>
                <td>Wadala, xxxxx, xxxx</td>
                <td>10</td>
                <td>
                  <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#bookModal">Book</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Book Modal -->
      <div class="modal fade" id="bookModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title">Book the parking spot</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label>Spot ID:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>Lot ID:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>User ID:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>Vehicle Number:</label>
                  <input type="text" class="form-control" placeholder="Enter vehicle number" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-success">Reserve</button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Release Modal -->
      <div class="modal fade" id="releaseModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title">Release the parking spot</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label>Spot ID:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>Vehicle Number:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>Parking Time:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>Releasing Time:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
                <div class="mb-3">
                  <label>Total Cost:</label>
                  <input type="text" class="form-control" value="xxxxx" readonly />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger">Release</button>
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  `,
};
