import { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./index.css";
const AddressForm = ({onAdd}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add address");
      const newAddress=await response.json();
      alert("Address added successfully");
      setFormData({
        address_details: "",
        city: "",
        state: "",
        pin_code: "",
      });
      if (onAdd) onAdd(newAddress);
    } catch (error) {
      console.error(error);
      alert("Error adding address");
    }

}


  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <h2 className="form-heading">Add New Address</h2>
      <div className="form-group">
        <label htmlFor="address_details">Address Details</label>
        <textarea id="address_details" 
        name="address_details" 
        value={formData.address_details}
        onChange={handleChange}
        required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" 
        id="city" 
        name="city"
        value={formData.city}
        onChange={handleChange}
         required />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input type="text"
         id="state"
         name="state"
         value={formData.state}
         onChange={handleChange}
           required />
      </div>
      <div className="form-group">
        <label htmlFor="pin_code">Pin Code</label>
        <input type="text" 
        id="pin_code"
        name="pin_code"
        value={formData.pin_code}
         onChange={handleChange}
         required />
      </div>
      <button type="submit" className="submit-button">Add Address</button>
    </form>
  );
};

export default AddressForm;
