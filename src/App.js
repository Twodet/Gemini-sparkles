import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from './Components/SignUp';
import "bootstrap/dist/css/bootstrap.min.css"
import SignIn from './Components/SignIn';
import AddProducts from './Components/AddProducts';
import AboutUs from './Components/AboutUs';
import GetProducts from './Components/GetProducts';
import SingleProduct from './Components/SingleProduct';
import Footer from './Components/Footer';
import "bootstrap/dist/js/bootstrap.min.js";
import"bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css"



function App() {


  return (
      <Router>
        <div className="App-header">
          <h3>Gemini Sparkles Jewellers</h3>
          <p></p>
        </div>

    <div className="App">
     
      <Routes>
        <Route path='/signin' element = {<SignIn/>}/>
        <Route path='/signup' element = {<SignUp/>}/>
        <Route path='/addproducts' element = {<AddProducts/>}/>
        <Route path='/' element = {<GetProducts/>}/>
        <Route path='/singleproduct' element = {<SingleProduct/>}/>
        <Route path='/aboutus' element = {<AboutUs/>}/>

      </Routes>
    </div>
    </Router>
  );
}

export default App;
