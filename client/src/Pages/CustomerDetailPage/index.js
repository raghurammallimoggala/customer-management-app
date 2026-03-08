import { useState } from "react";
import AddressForm from "../../components/AddressForm";
import AddressList from "../../components/AddressList";
import Navigate from "../Navigate";
import "./index.css";
const CustomerDetailPage = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const handleAddress = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <div className="customer-detail-page">
        <Navigate />
      <div className="customer-info">
      <h1 className="heading">Customer Details</h1>
      <AddressForm onAdd={handleAddress}/>
      <AddressList refreshFlag={refreshFlag}/>
    </div>
    </div>
  );
};

export default CustomerDetailPage;
