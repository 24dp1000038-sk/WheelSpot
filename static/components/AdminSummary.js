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
      <h3 class="text-center">Admin Summary</h3>
      <div class="row mt-4">
        <div class="col-md-6">
          <h5 class="text-center">Revenue per Lot</h5>
          <canvas id="barChart"></canvas>
        </div>
        <div class="col-md-6">
          <h5 class="text-center">Spot Usage</h5>
          <canvas id="pieChart"></canvas>
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

        this.renderBarChart();
        this.renderPieChart();
      } catch (err) {
        console.error("Error loading summary:", err);
      }
    },

    renderBarChart() {
      const ctx = document.getElementById("barChart");

      const labels = this.lotUsage.map(item => `Lot ${item.lot_id}`);
      const occupied = this.lotUsage.map(item => item.occupied);
      const available = this.lotUsage.map(item => item.available);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Occupied",
              data: occupied,
              backgroundColor: "rgba(255, 99, 132, 0.7)"
            },
            {
              label: "Available",
              data: available,
              backgroundColor: "rgba(75, 192, 192, 0.7)"
          }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    },


    renderPieChart() {
      const ctx = document.getElementById("pieChart");

      const labels = this.lotRevenue.map(item => `Lot ${item.lot_id}`);
      const values = this.lotRevenue.map(item => item.total_amount);

      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [{
          label: "Revenue (₹)",
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
          }]
        },
        options: {
          responsive: true
        }
      });
    },
  }
};
