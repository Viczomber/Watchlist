import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Search from './routes/Search';
import Detail from './routes/Detail';
import Profile from './routes/Profile';
import OST from './routes/OST';
import Login from './routes/Login';
import TopList from './components/TopList';
import EditTopList from './routes/EditTopList'; // <-- ESTE
import AddToTopList from './routes/AddToTopList';
import AddTopItem from './routes/AddTopItem';
import Watchlist from './routes/Watchlist';

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '20px' }}>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/search" element={<Search />} />
  <Route path="/detail/:id" element={<Detail />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/ost" element={<OST />} />
  <Route path="/login" element={<Login />} />
  <Route path="/toplist" element={<TopList />} />
  <Route path="/toplist/edit" element={<EditTopList />} />
  <Route path="/add-top" element={<AddToTopList />} />
  <Route path="/add-top-item" element={<AddTopItem />} />
  <Route path="/watchlist" element={<Watchlist />} />
</Routes>

      </main>
    </>
  );
}

export default App;
