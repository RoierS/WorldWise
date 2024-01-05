import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from '@/components/City/City';
import CityList from '@/components/CityList/CityList';
import CountryList from '@/components/CountryList/CountryList';
import Form from '@/components/Form/Form';

import AuthProvider from './contexts/AuthContext';
import CitiesProvider from './contexts/CitiesProvider';
import AppLayOut from './pages/AppLayout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Pricing from './pages/Pricing/Pricing';
import Product from './pages/Product/Product';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayOut />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="cities" replace={true} />} />

              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />

              <Route path="countries" element={<CountryList />} />

              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
