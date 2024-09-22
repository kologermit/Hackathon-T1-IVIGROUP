import './App.css';
import Auth from './components/Auth';
import Button from './components/Button';
import Vote from './components/Vote';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="VoteApp">
      <Routes>
        <Route index element={<Button />} />
        <Route path={'Auth'} element={<Auth />} />
        <Route path={'Vote/:id'} element={<Vote />} />
      </Routes>
    </div>
  );
}

export default App;
