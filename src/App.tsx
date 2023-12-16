import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayOut from './pages/AppLayout/AppLayOut';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Pricing from './pages/Pricing/Pricing';
import Product from './pages/Product/Product';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayOut />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
