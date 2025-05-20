import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import UserHome from "./components/UserHome.js";


const routes = [
  { path: "/", component: Home },
  { path: "/api/login", component: Login },
  { path: "/api/register", component: Register },
  { path: "/user_dashboard", component: UserHome },
];

const router = new VueRouter({
  routes,
});

const app = new Vue({
  el: "#app",
  router,
  template: `
    <div class="container-fluid p-0 m-0">
      <router-view></router-view>
    </div>
  `,
  data: {
    loggedIn: false,
  },
  methods: {},
});