import {ThreeDots} from "react-loader-spinner";
import {Link} from "react-router-dom";
import {useEffect,useState} from "react" 
import "./index.css"

const apiStatusConstants = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"
}

function CustomerList({search}){
    const[apiResponse,setApiResponse]=useState({
        status: apiStatusConstants.initial,
        data: [],
        errorMsg: null
    });

useEffect(() => {
        const getCustomerData=async()=>{
            setApiResponse({
                status: apiStatusConstants.inProgress,
                data: [],
                errorMsg: null
            })
            const url="http://localhost:5000/api/customers";
            const options={
                method: "GET",
            }
            
            try {const response=await fetch(url,options);
            const responseData=await response.json();
            

            if(response.ok){
                console.log("API Response:", responseData);
                setApiResponse((prevApiResponse)=>({
                    ...prevApiResponse,
                    status:apiStatusConstants.success,
                    data:responseData
                }))
            }else{
                setApiResponse((prevApiResponse)=>({
                    ...prevApiResponse,
                    status:apiStatusConstants.failure,
                    errorMsg:responseData.error|| "Something went wrong"
                }))
            }
        }catch (error) {
      setApiResponse({
        status: apiStatusConstants.failure,
        data: [],
        errorMsg: error.message || "Network Error"
      });
    }
        }
        getCustomerData();
    }, []);

  const renderFailureView = () => {
    return(
    <div className="failure-container">
        <h1 className="heading">Customer</h1>
        <p className="description">Not Found Customer</p>
    </div>
    )
  }

  const renderLoadingView = () => (
    <div className="LoadingViewContainer">
      <ThreeDots height="50" width="50" color="#2515b0ff" ariaLabel="loading" />
    </div>
  )


  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, { method: "DELETE" });
      if (response.ok) {
        setApiResponse((prev) => ({
          ...prev,
          data: prev.data.filter((cust) => cust.id !== id),
        }));
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete customer");
      }
    } catch (error) {
      alert(error.message || "Network error");
    }
  };

  const renderCustomerList = () => {
    const {status}=apiResponse
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }

  };

  const renderSuccessView=()=>{
    const {data}= apiResponse

    const filteredCustomers = data.filter(
      (customer) =>
        (customer.first_name?.toLowerCase() || "").includes(
          search.trim().toLowerCase()
        ) ||
        (customer.last_name?.toLowerCase() || "").includes(
          search.trim().toLowerCase()
        )
    );

    const formattedCustomerData=filteredCustomers.map((customer) => ({
      id: customer.id,
      name: `${customer.first_name} ${customer.last_name}`,
      phone: customer.phone_number
    }));

    if(filteredCustomers.length===0){
      return (renderFailureView())
    }
    return(
        <div className="customer">
            <h2 className="heading">Customers</h2>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th className="table-header">ID</th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Phone</th>
                        <th className="table-header">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedCustomerData.map((customer,index) => (
                        <tr key={customer.id}>
                            <td className="table-cell">{index+1}</td>
                            <td className="table-cell">{customer.name}</td>
                            <td className="table-cell">{customer.phone}</td>
                            <td className="table-cell"><button className="button" onClick={()=>onDelete(customer.id)}>delete</button>/
                            <Link to={`/customers/${customer.id}`}>ViewDetails</Link></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}
return(
    <div className="customer-list-container">
        {renderCustomerList()}
    </div>
)

}
export default CustomerList;