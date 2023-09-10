import HomePage from "./pages/HomePage.vue"
import Bill from "./pages/Bill.vue"
import User from "./pages/User.vue"
import Info from "./pages/Info.vue"
import PageNotFound from "./pages/PageNotFound.vue"
import Login from "./pages/Login.vue"
export const routes = [
    {
        path: '/', component: HomePage,
    },
    {
        path: '/bill', component: Bill,
    },
    {
        path: '/info', component: Info,
    },
    {
        path: '/login', component: Login,
    },
    { 
        path: '/:pathMatch(.*)*', component: PageNotFound 
    }
]

export default routes;