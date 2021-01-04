const app = require("express")()
var https = require( "https" );  // для организации https
var fs = require( "fs" );   // для чтения ключевых файлов

httpsOptions = {
    key: fs.readFileSync("rootSSL.key"), // путь к ключу
    cert: fs.readFileSync("rootSSl.crt") // путь к сертификату
}

https.createServer(httpsOptions, app).listen(443, ()=>console.log("listening on port 443"));

app.get("/login", (req, res) => {
    //const cookie = "user=hussein; samesite=strict; secure";
    //const cookie = "user=hussein; samesite=lax; secure";
    //const cookie = "user=hussein; samesite=none; secure";
    const cookie = "user=hussein;";

    res.setHeader("set-cookie", [cookie])
    res.send("ok")
})


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/img", (req, res) => {
    const cookie = req.headers.cookie;
    if (cookie)
        res.sendFile(`${__dirname}/cookie.png`)
    else{
        res.sendStatus(403);
        res.end();
    }
})
  
//app.listen(8080, ()=>console.log("listening on port 8080"))