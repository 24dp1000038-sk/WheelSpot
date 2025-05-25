export default {
  template: `
    <div>
      <h3>Welcome to Admin Home</h3>
      <div v-if="message">
        <p><strong>Message:</strong> {{ message }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
      </div>
      <div v-if="errorMessage">
        <p class="text-red">{{ errorMessage }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      message: '',
      errorMessage: ''
    };
  },
  methods: {
    async fetchAdminHome() {
      try {
        const response = await fetch("/api/adminHome", {
          method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

        if (!response.ok) {
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
