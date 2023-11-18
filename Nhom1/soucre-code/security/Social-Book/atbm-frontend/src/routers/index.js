import { DefaultLayout } from "../components/Layouts";
import Login from "../pages/auth/login/login";
import Signup from "../pages/auth/signup/signup";
import B404 from "../pages/404/B404";
import Home from "../pages/Home";
const publicRoutes = [
    // { path: '/', component: Home },
    { path: '*', component: B404, layout: null },
    { path: '/login', component: Login, layout: DefaultLayout },
    { path: '/signup', component: Signup },
    { path: '/', component: Home, layout: DefaultLayout },
]

export { publicRoutes }