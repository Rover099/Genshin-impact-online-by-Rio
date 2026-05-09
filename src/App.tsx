/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Wish from './pages/Wish';
import Map from './pages/Map';
import Portal from './pages/Portal';
import { Notifications } from './components/ui/Notifications';

export default function App() {
  return (
    <Router>
      <Notifications />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="characters" element={<Characters />} />
          <Route path="map" element={<Map />} />
          <Route path="wish" element={<Wish />} />
          <Route path="news" element={<Portal />} />
        </Route>
      </Routes>
    </Router>
  );
}
