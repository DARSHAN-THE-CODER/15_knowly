import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { ToastContainer } from 'react-toastify';

const Layout = ({ children, loggedIn , setIsloggedIn, routes, setRoutes}) => {
    return (
        <div>
            <Navbar loggedIn = {loggedIn} setIsloggedIn={setIsloggedIn} routes={routes} setRoutes= {setRoutes}  />
                <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;