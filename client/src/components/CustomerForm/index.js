import {useState} from "react";
import "./index.css";
const CustomerForm =({customerData=null, onSubmit})=>{
    const[firstName, setFirstName]=useState(customerData?.firstName||"");
    const[lastName, setLastName]=useState(customerData?.lastName||"");
    const[phoneNumber,setPhoneNumber]=useState(customerData?.phoneNumber||"");
    const [errorMsg, setErrorMsg]=useState("");

     const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("handleSubmit called");
        if (!firstName || !lastName || !phoneNumber){
            setErrorMsg("All fields are required");
            return;
        }
        setErrorMsg("");
        try{
            const response=await fetch("http://localhost:5000/api/customers",
                {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                }),
            });

            console.log("Fetch Response:", response);

            if(!response.ok) throw new Error("Failed to add customer");
            alert("Customer Add Successfully")
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
            alert("customer adding successfully");
            if (onSubmit) onSubmit();
        } catch(error){
            console.error(error);
            setErrorMsg("Failed to add customer");

        } 
     };

    return(
        <form className="customer-form" onSubmit={handleSubmit}>
            <h1 className="heading">Customer</h1>
            <div className="container">
            <label className="label" htmlFor="firstName">FIRSTNAME</label>
            <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) =>setFirstName(e.target.value)}
            placeholder="Enter First Name"/>
            </div>
            <div className="container">
                <label className="label" htmlFor="lastName">LastName</label>
                <input type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                placeholder="Enter Last Name"/>
            </div>
            <div className="container">
                <label className="label" htmlFor="phoneNumber">PhoneNumber</label>
                <input type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e)=>setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"/>
            </div>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <button type="submit" className="submit-button">
                {customerData ? "Update Customer" : "Add Customer"}
            </button>
        </form>
    )
}
export default CustomerForm;