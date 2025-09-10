const express=require("express")
const cors=require("cors")
const path=require("path")
const {open}=require("sqlite")
const sqlite3=require("sqlite3")
const app=express()
app.use(express.json())
app.use(cors());

const dbPath=path.join(__dirname,"customer.db")
let db=null 
const initializeDB=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        const port=5000
        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })
    }catch(error){
        console.log(`DB Error:${error.message}`)
        process.exit(1)
    }
}
initializeDB() 

// customers 

app.post("/api/customers",async(request,response)=>{
    const {first_name,last_name,phone_number}=request.body
    const query=`
        INSERT INTO customers (first_name,last_name,phone_number)
        VALUES (?, ?, ?)`
    await db.run(query, [first_name, last_name, phone_number])
    response.status(201).send("customer created successfully")
})

app.get("/api/customers",async(request,response)=>{
    let { limit, offset } = request.query;
    limit = limit ? parseInt(limit) : 100;
    offset = offset ? parseInt(offset) : 0
    const query=`
        SELECT * FROM customers
        ORDER BY id ASC
        LIMIT ? OFFSET ?`
    const customers=await db.all(query, [limit, offset])
    response.status(200).json(customers)
})

app.get("/api/customers/:id",async(request,response)=>{
    const {id}=request.params
    const query=`
        SELECT * FROM customers
        WHERE id=?;`;
    const customer=await db.get(query, [id])
    response.status(200).json(customer)
})

app.put("/api/customers/:id",async(request,response)=>{
    const {id}=request.params
    const {first_name,last_name,phone_number}=request.body
    const query=`
        UPDATE customers
        SET first_name=?, last_name=?, phone_number=?
        WHERE id=?`
    await db.run(query, [first_name, last_name, phone_number, id])
    response.status(200).send("Customer updated successfully")
})

app.delete("/api/customers/:id",async(request,response)=>{
    const {id}=request.params
    const query=`
        DELETE FROM customers
        WHERE id=?;`;
    await db.run(query, [id])
    response.send("customer deleted successfully")

})

// addresses
app.post("/api/customers/:id/addresses",async(request, response)=>{
    const {id}=request.params
    const {address_details,city,state,pin_code}=request.body
    const query=`
    INSERT INTO addresses (customer_id, address_details, city, state, pin_code)
    VALUES (?, ?, ?, ?, ?);
    `
    const result=await db.run(query, [id, address_details, city, state, pin_code])
    const newAddress = {
      id: result.lastID,
      customer_id: id,
      address_details,
      city,
      state,
      pin_code,
    };

    response.status(201).json(newAddress);
}
);

app.get("/api/customers/:id/addresses",async(request, response)=>{
    let { limit, offset } = request.query;
    limit = limit ? parseInt(limit) : 100; 
    offset = offset ? parseInt(offset) : 0
    const {id}=request.params
    const query=`
    SELECT * FROM addresses
    WHERE customer_id=?
    ORDER BY id ASC
    LIMIT ? OFFSET ?;`;
    const addresses=await db.all(query, [id, limit, offset])
    response.status(200).json(addresses)
});
app.get("/api/addresses/:id", async(request,response)=>{
    const {id}=request.params
    const query=`
    SELECT * FROM addresses
    WHERE id=?;`;
    const address=await db.get(query, [id])
    response.status(200).json(address)
})

app.put("/api/addresses/:id",async(request,response)=>{
    const {id}=request.params
    const {customer_id,address_details,city,state,pin_code}=request.body
    const query=`
    UPDATE addresses
    SET customer_id=?, address_details=?, city=?, state=?, pin_code=?
    WHERE id=?`;
    await db.run(query, [customer_id, address_details, city, state, pin_code, id])
    response.send("Address updated successfully")
})
app.delete("/api/addresses/:id",async(request,response)=>{
    const {id}=request.params
    const query=`
    DELETE FROM addresses
    WHERE id=?`;
    await db.run(query, [id])
    response.send("Address deleted successfully")
})