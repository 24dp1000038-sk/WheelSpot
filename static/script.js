import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";


const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = new VueRouter({
  routes,
});

const app = new Vue({
  el: "#app",
  router,
  template: `
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  `,
  data: {
    loggedIn: false,
  },
  methods: {},
});