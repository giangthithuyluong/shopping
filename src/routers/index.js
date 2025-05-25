import { createRouter, createWebHistory } from "vue-router"
import Home from "../pages/Home.vue"
import SignUp from "../pages/Signup.vue"
import SignIn from "../pages/Signin.vue"
import Products from "../pages/Products.vue"
import ProductDetail from "../pages/ProductDesc.vue"
import Search from "../pages/Search.vue"
import Cart from "../pages/Cart.vue"
import { useAuthStore } from "@/stores/auth.js"

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/signup",
        component: SignUp
    },
    {
        path: "/signin",
        component: SignIn
    },
    {
        path: "/products",
        component: Products
    },
    {
        path: "/productdesc/:id",
        component: ProductDetail
    },
    {
        path: "/search",
        component: Search
    },
    {
        path: "/cart",
        component: Cart
    }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const publicPages = ["/signin", "/signup"]
    const authRequired = !publicPages.includes(to.path)
    const isLogin = authStore.isLogin
    if (authRequired && !isLogin) {
        return next({path: "/signin"})
    } else {
        return next()
    }
})


export {router}