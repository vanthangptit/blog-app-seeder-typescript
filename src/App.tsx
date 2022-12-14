import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from '@components/Header';
import Home from './pages/Home';
import Blog from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import Register from './pages/Register';
import User from './pages/Users';
import CreatePost from '@src/pages/CreatePost';

import { ACCESS_TOKEN, MODE_CV, SITES_URL } from '@src/constants';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children, path }: any) => {
  const accessToken = Cookies.get(ACCESS_TOKEN);

  return accessToken ? children : <Navigate to={SITES_URL.LOGIN} replace state={{ path }}/>;
};

function App() {
  return (
    <Router>
      {MODE_CV && <Header />}

      <main className="main">
        <Routes>
          {MODE_CV && (
            <>
              <Route path='/' element={<Home customClass="home-page"/>} />
              <Route path={SITES_URL.ABOUT} element={<Home customClass="about-page"/>} />
              <Route path={SITES_URL.CONTACT} element={<Contact/>} />
            </>
          )}

          <Route path={SITES_URL.BLOG}
            element={
              <PrivateRoute path={SITES_URL.BLOG}>
                <Blog />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.BLOG_DETAIL}
            element={
              <PrivateRoute path={SITES_URL.BLOG_DETAIL}>
                <BlogDetail />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.CREATE_POST}
            element={
              <PrivateRoute path={SITES_URL.CREATE_POST}>
                <CreatePost />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.EDIT_POST}
            element={
              <PrivateRoute path={SITES_URL.EDIT_POST}>
                <CreatePost />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.ACCOUNT}
            element={
              <PrivateRoute path={SITES_URL.ACCOUNT}>
                <User />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.DASHBOARD}
            element={
              <PrivateRoute path={SITES_URL.DASHBOARD}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path={SITES_URL.LOGIN} element={<Login />} />
          <Route path={SITES_URL.REGISTER} element={<Register />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
