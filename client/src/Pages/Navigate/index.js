import {Link} from "react-router-dom"
import "./index.css";
const Navigate=()=>{
    return(
        <div className="nav-header">
            <h1 className="nav-heading">CUSTOMER MANAGEMENT</h1>
            <ul className="nav-header-list">
                <li><Link to="/" className="nav-link">Home</Link></li>
                <li><Link to="/customerFormPage" className="nav-link">CustomerForm</Link></li>
                <li><Link to="/customerListPage" className="nav-link">CustomerList</Link></li>
            </ul>
        </div>
    )

}
export default Navigate;