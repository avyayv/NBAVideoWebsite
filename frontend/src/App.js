import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
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

