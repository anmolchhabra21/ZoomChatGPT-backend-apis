const express = require('express');
require('dotenv').config();
const {Configuration, OpenAIApi} = require("openai");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json());
const config = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,

});
const openai = new OpenAIApi(config);

app.post("/", (req, res)=>{
   res.json({name: "Anmol"});
})

app.post("/chk", async(req, res)=>{
    try{
        const {prompt} = req.body;
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[ {role: "user", content: `${prompt}`}]
        });
        
        return res.status(200).json({
            success: true,
            data: (response.data.choices[0].message.content)
        });
        
    }
    catch(error){
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data: "There was an issue on the server",
        })
    }
})

const port = process.env.PORT || 5000;

app.listen(port, ()=>console.log(`Server listening on port ${port}`));