import { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CityList from '@/components/CityList/CityList';

import { ICity } from './interfaces/City';
import AppLayOut from './pages/AppLayout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Pricing from './pages/Pricing/Pricing';
import Product from './pages/Product/Product';

const BASE_URL = 'http://localhost:9000';

const App: React.FC = () => {
  const [cities, setCities] = useState([] as ICity[]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data: ICity[] = await res.json();
        setCities(data);
        setIsloading(false);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsloading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayOut />}>
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
