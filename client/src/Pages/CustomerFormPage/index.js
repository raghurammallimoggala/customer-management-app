import Navigate from "../Navigate";
import CustomerForm from "../../components/CustomerForm";
import "./index.css";

const CustomerFormPage=()=>{

    const handleCustomerSubmit=(newCustomer)=>{
       console.log("Customer added:", newCustomer);
    }
    return(
        <>
        <Navigate />
        <div className="customer-form-page">
            <CustomerForm onSubmit={handleCustomerSubmit} />
        </div>
        </>
    )
}
export default CustomerFormPage;