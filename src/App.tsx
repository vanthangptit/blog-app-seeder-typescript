import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

// ** Components
import Header from '@components/Header';

// ** Pages
import Home from './pages/Home';
import Blog from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import User from './pages/Users';

// ** Constant
import { SITES_URL } from '@src/constants';

// ** Utils
import { getAccessTokenCookie } from '@utils/RGSCookies';

const PrivateRoute = ({ children }: any) => {
  const accessToken = getAccessTokenCookie();

  return accessToken ? children : <Navigate to={SITES_URL.LOGIN} replace />;
};

function App() {
  return (
    <Router>
      <Header />

      <main className="main">
        <Routes>
          <Route path='/' element={<Home customClass="home-page"/>} />
          <Route path={SITES_URL.ABOUT} element={<Home customClass="about-page"/>} />
          <Route path={SITES_URL.BLOG} element={<Blog/>} />
          <Route path={SITES_URL.BLOG_DETAIL} element={<BlogDetail />}/>
          <Route path={SITES_URL.CONTACT} element={<Contact/>} />
          <Route path={SITES_URL.ACCOUNT} element={<User/>} />

          <Route path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.LOGIN} element={<Login />} />
          <Route path={SITES_URL.REGISTER} element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
