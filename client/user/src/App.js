import './App.css';
import Vote from './components/Vote';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="VoteApp">
      <Routes>
        <Route index element={<Vote />} />
      </Routes>
    </div>
  );
}

export default App;
