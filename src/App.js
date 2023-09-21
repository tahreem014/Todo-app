
import './App.css'
import Forgetpassword from './Components/Forgetpass'
import Home from './Components/Home'
import Sign from './Components/Sign'

// import router 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
   <>

      <Router>

<Sign />

<Routes>

  <Route path='/home' exact Component={Home}></Route>
  <Route path='/forgetpassword' exact Component={Forgetpassword}></Route>

</Routes>

    </Router>

   </>
  
  );
}

export default App;
