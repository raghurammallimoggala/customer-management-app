import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import CustomerDetailPage from "./Pages/CustomerDetailPage";
import CustomerFormPage from "./Pages/CustomerFormPage";
import CustomerListPage from "./Pages/CustomerListPage";
import './App.css';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/customers/:id" element={<CustomerDetailPage/>}/>
    <Route path="/customerFormPage" element={<CustomerFormPage/>}/>
    <Route path="/customerListPage" element={<CustomerListPage/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
