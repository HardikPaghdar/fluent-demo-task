import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Add from './pages/People/Add';
import Edit from './pages/People/Edit';
import Details from './pages/People/Details';
import List from "./pages/People/List";
import CompanyList from "./pages/Company/List";
import CompanyDetails from "./pages/Company/Details";
import AddCompany from "./pages/Company/Add";
import EditCompany from "./pages/Company/Edit";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/home" exact element={<Home/>}/>
                <Route path="/peoples" exact element={<List/>}/>
                <Route path="/peoples/:id" exact element={<Details/>}/>
                <Route path="/peoples/add" exact element={<Add/>}/>
                <Route path="/peoples/edit/:id" exact element={<Edit/>}/>
                <Route path="/companies" exact element={<CompanyList/>}/>
                <Route path="/companies/:id" exact element={<CompanyDetails/>}/>
                <Route path="/companies/add" exact element={<AddCompany/>}/>
                <Route path="/companies/edit/:id" exact element={<EditCompany/>}/>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
