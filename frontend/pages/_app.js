import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "regenerator-runtime/runtime"

import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const [loggedIn, setIsloggedIn] = useState(false);
  const [routes, setRoutes] = useState([]);

  return(
  <>
    <ToastContainer autoClose={2000} />
    <Layout routes={routes} setRoutes={setRoutes} loggedIn={loggedIn} setIsloggedIn={setIsloggedIn}>
      <Component {...pageProps} loggedIn = {loggedIn} setIsloggedIn={setIsloggedIn} routes={routes} setRoutes= {setRoutes} {...pageProps}  />
    </Layout>
  </>)
}
