import './App.css';
import Map from "./Map"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
      <div className="App">
          <Router>
              <Routes>
                  <Route exact path="/" element={<Map/>}/>
              </Routes>
          </Router>
      </div>
  )
}

export default App