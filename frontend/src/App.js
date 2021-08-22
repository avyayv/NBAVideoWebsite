import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContent from './MainContent';
import NBAVideoNavBar from './NBAVideoNavBar';

function App() {
  return (
    <div className="app">
      <NBAVideoNavBar/>
      <MainContent/>
    </div>
  )
}

export default App;

