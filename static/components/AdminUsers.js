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
      <div class="container-fluid p-0 m-0" v-if="users.length > 0">
      <h4 class="text-center border border-primary p-2 rounded">Registered Users</h4>
      <table class="table table-bordered mt-4 text-center align-middle" >
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Pin Code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.pincode }}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div v-else class="text-center mt-4 text-muted fs-1">
        No users found.
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch("/api/admin/users", {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": localStorage.getItem("auth_token")
          },
        });
        const data = await response.json();
        this.users = data;
      } catch (err) {
        console.error("Error fetching users", err);
      }
    },
    logout() {
      localStorage.removeItem("auth_token");
      this.$router.push("/login");
    },
  },
};
