import { useEffect,useState } from "react";
import Navigate from "../Navigate";
import CustomerList from "../../components/CustomerList";
import "./index.css";
const CustomerListPage=()=>{
    const [customers,setCustomers]=useState([]);
    const [search,setSearch]=useState("");
    useEffect(()=>{
            const fetchCustomers=async()=>{
            try{
                const response=await fetch("http://localhost:5000/api/customers");
                if (!response.ok) throw new Error("Failed to fetch customers");
                const data = await response.json();
                setCustomers(data);
            } catch(error){
                console.error(error);
      setCustomers([]);
    }
    };
        fetchCustomers();
    },[]);

    return (
        <div className="customer-list-page">
            <Navigate/>
            <h1 className="heading">Customer</h1>
            <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <CustomerList search={search} customers={customers} />
        </div>
    )
};
export default CustomerListPage;