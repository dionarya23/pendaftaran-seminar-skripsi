import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";

Vue.use(Router);

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requireAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new Router({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const requireAuth = to.matched.some(record => record.meta.requireAuth);

  if (requireAuth && !token) {
    next("/login");
  } else if (requireAuth && token) {
    next();
  } else {
    next();
  }
});

export default router;
