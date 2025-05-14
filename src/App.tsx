import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import store from './store/store';
import FruitInventory from './pages';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<FruitInventory />}/>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
