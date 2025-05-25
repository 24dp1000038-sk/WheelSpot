import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import AdminHome from "./components/AdminHome.js";
import AdminSearch from "./components/AdminSearch.js";
import AdminSummary from "./components/AdminSummary.js";
import AdminUsers from "./components/AdminUsers.js";
import NotFound from "./components/NotFound.js";
import UserHome from "./components/UserHome.js";
import UserSummary from "./components/UserSummary.js";


const routes = [
  { path: "/", component: Home },
  { path: "/api/login", component: Login },
  { path: "/api/register", component: Register },
  { path: "/api/adminHome", component: AdminHome },
  { path: "/api/adminSearch", component: AdminSearch },
  { path: "/api/adminSummary", component: AdminSummary },
  { path: "/api/adminUsers", component: AdminUsers },
  { path: "/api/userHome", component: UserHome },
  { path: "/api/userSummary", component: UserSummary },
  { path: "/api/notFound", component: NotFound },

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