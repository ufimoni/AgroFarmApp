import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Welcome from './pages/welcome';
import Login from './pages/login';
import Signup from './pages/signup';
import NotFound from './pages/notfound';
import Owner from './pages/roles/owner';
import Farmer from './pages/roles/farmer';
import Manager from './pages/roles/manager';
import Expert from './pages/roles/expert';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute'; // 

import './App.scss';
import './App.css';

function App() {
  const loader = useSelector((state) => state.loader);

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}

      <BrowserRouter>
        <Routes>
          {/*  Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Role-Based Routes */}
          <Route
            path="/farmer/*"
            element={
              <ProtectedRoute>
                <Farmer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute>
                <Manager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expert/*"
            element={
              <ProtectedRoute>
                <Expert />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/*"
            element={
              <ProtectedRoute>
                <Owner />
              </ProtectedRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

