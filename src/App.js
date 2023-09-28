
import './App.css'
import Forgetpassword from './Components/Forgetpass'
import Home from './Components/Home'
import login from './Components/Login'
import Signup  from './Components/Signup'

// import router 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
   <>

<Router>
<Routes>
  <Route path='/' exact Component={login}></Route>
  <Route path='/signup' exact Component={Signup}></Route>
  <Route path='/home' exact Component={Home}></Route>
  <Route path='/forgetpassword' exact Component={Forgetpassword}></Route>
</Routes>
    </Router>

   </>
  
  );
}

export default App;
