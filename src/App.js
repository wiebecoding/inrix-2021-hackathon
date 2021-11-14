import './App.css';
import Map from "./Map"
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom'

function App(props) {
  return (
      <div className="App">
          <HashRouter basename={'/'}>
              <Routes>
                  <Route  path="/" exact element={<Map/>}/>
              </Routes>
          </HashRouter>
      </div>
  )
}

export default App