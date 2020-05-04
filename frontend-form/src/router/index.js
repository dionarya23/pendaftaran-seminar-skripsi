import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Pendaftaran from "@/components/Pendaftaran";
import Judul from "@/components/Judul";
import StepTerakhir from "@/components/StepTerakhir";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Pendaftaran",
    component: Pendaftaran
  },
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
  },
  {
    path: "/judul",
    name: "Judul",
    component: Judul
  },
  {
    path: "/stepterakhir",
    name: "StepTerakhir",
    component: StepTerakhir
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
