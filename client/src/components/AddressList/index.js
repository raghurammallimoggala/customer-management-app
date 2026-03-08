import {ThreeDots} from "react-loader-spinner";
import {useParams} from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import {useEffect,useState} from "react"; 
import "./index.css";

const apiStatusConstants = {
    initial:"INITIAL",
    inProgress:"IN_PROGRESS",
    success:"SUCCESS",
    failure:"FAILURE"
}
function AddressList({ refreshFlag }){
    const {id}=useParams();
    const [apiResponse,setApiResponse]=useState({
        status:apiStatusConstants.initial,
        data:[],
        errorMsg:null
    });

useEffect(()=>{
    const getAdderssesData=async()=>{
        setApiResponse({
            status:apiStatusConstants.inProgress,
            data:[],
            errorMsg:null
        })
        const url=`http://localhost:5000/api/customers/${id}/addresses`;
        const options={
            method:"GET"
        }
        try{
            const response=await fetch(url,options);
            const responseData=await response.json();

            if (response.ok){
                setApiResponse({
                    status:apiStatusConstants.success,
                    data:responseData,
                    errorMsg:null
                });
            }else{
                setApiResponse({
                    status:apiStatusConstants.failure,
                    data:[],
                    errorMsg:"Not Found Address"
                });
            }
        }catch(error){
            setApiResponse({
                status:apiStatusConstants.failure,
                data:[],
                errorMsg:error.message || "Network Error"
            });
        }
    }
   if (id) getAdderssesData();
},[id,refreshFlag] );

const renderFailureView=()=>{
    const {errorMsg}=apiResponse
    return(
        <div className="failure-container">
            <p className="description">{errorMsg}</p>
        </div>
    )
}

const renderLoadingView=()=>(
    <div className="loading-container">
        <ThreeDots height="50" width="50" color="#2515b0ff" ariaLabel="loading"/>
    </div>
)

const renderAdderssesList=()=>{
    const {status}=apiResponse
    switch(status){
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

const onDeleteAddress=async(addressId)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:5000/api/addresses/${addressId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Address deleted successfully");
      
      setApiResponse((prev) => ({
        ...prev,
        data:prev.data.filter((a)=>a.id !== addressId), 
      }));
    } else {
      alert("Failed to delete address");
    }
  } catch (error) {
    console.error(error);
    alert("Error deleting address");
  }
};

const renderSuccessView=()=>{
    const {data}=apiResponse
    if (!data || data.length === 0) {
      return <p>No addresses found</p>;
    } 
    const formattedAddressData=data.map((address)=>({
        id:address.id,
        customer_id:address.customer_id,
        address_details:address.address_details,
        city:address.city,
        state:address.state,
        pin_code:address.pin_code

    }));
    
    return(
        <div className="address-table-container">
            <h1 className="heading">Address</h1>
            <table className="address-table">
                <thead>
                    <tr>
                        <th className="table-header">Id</th>
                        <th className="table-header">CustomerId</th>
                        <th className="table-header">AddressDetails</th>
                        <th className="table-header">City</th>
                        <th className="table-header">State</th>
                        <th className="table-header">PinCode</th>
                        <th className="table-header">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {formattedAddressData.map((address, index)=>(
                        <tr key={address.id}>
                            <td className="table-cell">{index+1}</td>
                            <td className="table-cell">{address.customer_id}</td>
                            <td className="table-cell">{address.address_details}</td>
                            <td className="table-cell">{address.city}</td>
                            <td className="table-cell">{address.state}</td>
                            <td className="table-cell">{address.pin_code}</td>

                            <td><button type="delete" onClick={() => onDeleteAddress(address.id)}><MdDeleteOutline /></button></td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
}
return(
    <div className="addresses-container">
        {renderAdderssesList()}
    </div>
)
}
export default AddressList;