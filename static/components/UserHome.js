export default {
  template: `
    <div class="container-fluid min-vh-100 bg-light d-flex flex-column">
      <link rel="stylesheet" href="../static/css/nav.css">
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm py-2 nav-color">
        <div class="container">
          <router-link class="navbar-brand d-flex align-items-center" to="/">
            <i class="bi bi-car-front-fill me-2 fs-4"></i>
            <span class="fw-bold fs-4" style="letter-spacing: 0.5px;">WheelSpot</span>
          </router-link>
          <h4 class= "text-white">Welcome {{ name }}</h4>
        </div>
      </nav>
      <main>
        <div>
          <h2>User Home</h2>
        </div>
      </main>
    </div>               
`,
  data() {
    return {
      name: localStorage.getItem("name") || "User",
      message: '',
      errorMessage: ''
    };
  },
  methods: {
    async fetchAdminHome() {
      try {
        const response = await fetch("/api/userHome", {
          method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Admin home fetch error:", data.message);
          throw new Error(data.message || "Failed to load admin home");
        }

        this.message = data.message;

      } catch (error) {
        console.error("Admin home fetch error:", error);
        this.errorMessage = error.message || "Something went wrong.";
      }
    }
  },
  mounted() {
    this.fetchAdminHome();
  }
};

