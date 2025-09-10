### customer-management-app 
   mkdir server 
   cd server 
   npm init -y 
   git init. 
### third-party packages:
    exress,
    cors, sqlite, sqlite3 
### Database : 
   customer.db 

### customers table: 
    id - INTEGER PRIMARY KEY AUTOINCREMENT 
    first_name -TEXT NOT NULL  
    last_name -TEXT NOT NULL 
    phone_number -TEXT NOT NULL 
### addresses table:
    id - INTEGER PRIMARY KEY AUTOINCREMENT 
    customer _id -INTEGER 
    address_details -TEXT NOT NULL 
    city -TEXT NOT NULL 
    state -TEXT NOT NULL 
    pin_code  -TEXT NOT NULL 

### customers methods, url: 
   // add customer

   method :"POST"
   headers:Content-Type: application/json
   url :http://localhost:5000/api/customers 

   // Get all customers

   method:"GET"  
   url:http://localhost:5000/api/customers
    
  // Get customer by ID 
   
   method:"GET" 
   url:http://localhost:5000/api/customers/3 

 // Update customer by ID 

   method:"PUT" 
   headers:Content-Type: application/json
   url:http://localhost:5000/api/customers/1 

// Delete customer by ID 
   
   method:"DELETE" 
   url:http://localhost:5000/api/customers/6 


### Addresses methods, url:
  // add customer

   method :"POST"
   headers:Content-Type: application/json
   url :http://localhost:5000/api/customers/1/addresses 

   // Get all customers

   method:"GET"  
   url:http://localhost:5000/api/customers/1/addresses
    
  // Get customer by ID 
   
   method:"GET" 
   url:http://localhost:5000/api/addresses/2 

 // Update customer by ID 

   method:"PUT" 
   headers:Content-Type: application/json
   url:http://localhost:5000/api/addresses/1

// Delete customer by ID 
   
   method:"DELETE" 
   url:http://localhost:5000/api/addresses/1 

 