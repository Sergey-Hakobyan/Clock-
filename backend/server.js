const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express()

app.use(cors())
app.use(express.json())

const API_TIME = process.env.API_TIME
const API_URL = process.env.API_URL
const PORT  = process.env.PORT

app.get("/api/time", async (req, res)=> {
    try{
        
        const response = await fetch(`${API_URL}`,{
        headers: {
            Authorization: `Bearer ${API_TIME}`

        }})

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
         }

        const data = await response.json()

        res.json(data)
    }
    catch (error){
        console.log("BACKEND ERROR:", error);
        res.status(500).json({error: error.message})
    }

})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});