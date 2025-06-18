export default {
  template: `
  <div class="container-fluid p-0 m-0">
    <link rel="stylesheet" href="../static/css/home.css">
    <link rel="stylesheet" href="../static/css/nav.css">
    <nav class="navbar navbar-expand-lg navbar-dark nav-sec fixed-top">
      <div class="container">
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <i class="bi bi-car-front-fill me-2 fs-4"></i>
          <span class="fw-bold fs-4" style="letter-spacing: 0.5px;">WheelSpot</span>
        </router-link>
        <div class="ms-auto">
          <router-link to="/login" class="btn btn-outline-light px-4 rounded-pill">
            <i class="bi bi-box-arrow-in-right me-2"></i>
            <span class="d-none d-sm-inline">Login</span>
          </router-link>
        </div>
      </div>
    </nav>
  
    <header class="hero-section text-white text-center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col">
            <h1 class="display-4 fw-bold mb-4">Find & Reserve Parking Easily</h1>
            <p class="lead mb-4">Secure, real-time parking solutions for your vehicle — anytime, anywhere.</p>
            <div class="d-flex justify-content-center align-items-center">
              <router-link to="/register" class="btn btn-success btn-lg px-4">Get Started </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="stats-bar py-4 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3">
            <h3 class="fw-bold text-primary">10K+</h3>
            <p class="mb-0">Active Users</p>
          </div>
          <div class="col-md-3">
            <h3 class="fw-bold text-primary">1K+</h3>
            <p class="mb-0">Parking Spots</p>
          </div>
          <div class="col-md-3">
            <h3 class="fw-bold text-primary">100+</h3>
            <p class="mb-0">Cities Covered</p>
          </div>
          <div class="col-md-3">
            <h3 class="fw-bold text-primary">99.9%</h3>
            <p class="mb-0">Uptime & Reliability</p>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Parking Features</h2>
          <p class="text-muted">Smart, secure, and scalable parking management</p>
        </div>
        <div class="row g-4">
          <div v-for="feature in features" :key="feature.id" class="col-md-4">
            <div class="card service-card h-100 border-0 shadow-sm">
              <div class="card-body text-center p-4">
                <div class="service-icon rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3">
                  <i :class="feature.icon" class="fs-3 text-primary"></i>
                </div>
                <h4 class="card-title">{{ feature.name }}</h4>
                <p class="card-text text-muted">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="py-5 bg-light">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">How It Works</h2>
          <p class="text-muted">Reserve a parking spot in just 3 simple steps</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="step-card text-center p-4 bg-white rounded h-100">
              <div class="step-number rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white fw-bold fs-5">1</div>
              <h4>Search & Select</h4>
              <p class="text-muted">Find nearby parking spots using our smart search system</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-card text-center p-4 bg-white rounded h-100">
              <div class="step-number rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white fw-bold fs-5">2</div>
              <h4>Reserve Instantly</h4>
              <p class="text-muted">Book your preferred slot in advance with real-time availability</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-card text-center p-4 bg-white rounded h-100">
              <div class="step-number rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 text-white fw-bold fs-5">3</div>
              <h4>Park & Go</h4>
              <p class="text-muted">Drive in, show your booking, and enjoy hassle-free parking</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">What Our Users Say</h2>
          <p class="text-muted">Trusted by thousands of drivers across cities</p>
        </div>
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(testimonial, index) in testimonials" :key="testimonial.id" 
                     :class="['carousel-item', { 'active': index === 0 }]">
                  <div class="testimonial-item bg-white p-4 rounded shadow-sm">
                    <p class="fst-italic">"{{ testimonial.content }}"</p>
                    <div class="testimonial-author d-flex align-items-center mt-4">
                      <img :src="testimonial.avatar" :alt="testimonial.name" class="rounded-circle me-3">
                      <div>
                        <h5 class="mb-1">{{ testimonial.name }}</h5>
                        <p class="text-muted mb-0">{{ testimonial.location }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section py-5 text-white">
      <div class="container text-center">
        <h2 class="mb-4">Reserve Your Spot Now!</h2>
        <p class="lead mb-4">Join drivers across the city making parking stress-free with WheelSpot.</p>
        <router-link class="btn btn-light btn-lg px-4">Get Started Today</router-link>
      </div>
    </section>

    <footer class="footer py-5 bg-dark text-white">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-md-start"> 
            <p>Smart parking for smart cities. Find, book, and park with confidence.</p>
            <p class="mb-0">&copy; 2025 WheelSpot. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <ul class="list-inline mb-0">
              <li class="list-inline-item"><a href="#" class="text-white-50 text-decoration-none">Privacy Policy</a></li>
              <li class="list-inline-item"><a href="#" class="text-white-50 text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  `,
  data() {
    return {
      features: [
        {
          id: 1,
          name: "Real-Time Availability",
          description: "Live updates on available parking slots in your area.",
          icon: "bi bi-clock",
        },
        {
          id: 2,
          name: "Advance Booking",
          description: "Secure your parking spot before you arrive.",
          icon: "bi bi-calendar-check",
        },
        {
          id: 3,
          name: "Secure Locations",
          description: "Monitored and verified parking zones for peace of mind.",
          icon: "bi bi-shield-check",
        },
        {
          id: 4,
          name: "Flexible Duration",
          description: "Choose hourly, daily, or monthly parking options.",
          icon: "bi bi-hourglass-split",
        },
        {
          id: 5,
          name: "Cashless Payments",
          description: "Pay online securely with multiple options.",
          icon: "bi bi-credit-card-2-front",
        },
        {
          id: 6,
          name: "Navigation Support",
          description: "Get directions to your reserved parking spot easily.",
          icon: "bi bi-geo-alt",
        },
      ],
      testimonials: [
        {
          id: 1,
          name: "Ravi Kumar",
          location: "Bangalore",
          content:
            "Finding parking in the city used to be a nightmare. WheelSpot changed that completely. Highly recommended!",
          avatar: "https://randomuser.me/api/portraits/men/34.jpg",
        },
        {
          id: 2,
          name: "Aisha Patel",
          location: "Mumbai",
          content:
            "I never worry about parking during events anymore. The advance booking feature is a game-changer.",
          avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        },
        {
          id: 3,
          name: "Arjun Mehta",
          location: "Hyderabad",
          content:
            "Fast, reliable, and safe. I’ve been using WheelSpot for over 6 months now. Great service!",
          avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        },
      ],
    };
  },
};
