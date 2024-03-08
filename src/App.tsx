import { Suspense, lazy } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import City from '@/components/City/City';
import CityList from '@/components/CityList/CityList';
import CountryList from '@/components/CountryList/CountryList';
import Form from '@/components/Form/Form';
import SpinnerFullPage from '@/components/SpinnerFullPage/SpinnerFullPage';

import AuthProvider from '@/contexts/AuthContext';
import CitiesProvider from '@/contexts/CitiesProvider';

import ProtectedRoute from '@/pages/ProtectedRoute/ProtectedRoute';

const Homepage = lazy(() => import('@/pages/Homepage/Homepage'));
const AppLayout = lazy(() => import('@/pages/AppLayout/AppLayOut'));
const Login = lazy(() => import('@/pages/Login/Login'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound/PageNotFound'));
const Pricing = lazy(() => import('@/pages/Pricing/Pricing'));
const Product = lazy(() => import('@/pages/Product/Product'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to="cities" replace={true} />}
                />

                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />

                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
};

export default App;
