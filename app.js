const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const name = req.body.name
    const lastName = req.body.lastName
    const email  = req.body.email

    var data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: name,
                    LNAME: lastName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us21.api.mailchimp.com/3.0/lists/c5f5fd9bfe";
    const options = {
        method: "POST",
        auth: "julidsa:d391af3f58e86672968c9d41f70f4866-us21"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})

//API Key
//d391af3f58e86672968c9d41f70f4866-us21


//id
//c5f5fd9bfe