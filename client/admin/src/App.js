import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Stats from './components/Stats';
import StatsPage from './components/StatsPage';
import Auth from './components/Auth';

function App() {
  return (
    <div className="AdminVoteApp">
      <Routes>
        <Route index element={<Auth />} />
        <Route path={'Home'} element={<Home />} />
        <Route path={'Home/Create'} element={<Create />} />
        <Route path={'Home/Stats'} element={<Stats />} />
        <Route path={'Home/Stats/StatsPage/:id'} element={<StatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
