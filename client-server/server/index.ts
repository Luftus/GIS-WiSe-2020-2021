import * as Http from "http";

let Mongo = require('mongodb');

const DB_NAME = 'luft';

let mongoClient: Mongo.MongoClient | null = null;
let users: Mongo.Collection | null = null;

export namespace A08Server {
    console.log("Starting server"); 


    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    mongoDbConnect();
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen); 
    server.listen(port);

    async function mongoDbConnect(): Promise<void>{
        const uri: string = "mongodb+srv://GISWISE2021:GISWISE2021@cluster0.qcexn.mongodb.net/<dbname>?retryWrites=true&w=majority";
        mongoClient = new Mongo.MongoClient(uri, { useNewUrlParser: true });
        await mongoClient.connect();
        users = mongoClient.db(DB_NAME).collection("users");
    }

    function handleListen(): void { 
        console.log("Listening");
    }

    async function register(request: URLSearchParams): Promise<string>{
        let vorname: string | null = request.get('vorname');
        let nachname: string | null = request.get('nachname');
        let psw: string | null = request.get('psw');
        let email: string | null = request.get('email');
        //check if data is correct
        if (!vorname || !nachname || !psw || !email) {
            return "error";
        }
        //check if user is already existing
        let userArray = await users.find({email: email}).toArray();
        if (userArray && userArray.length > 0) {
            return "already_existing";
        }
        if(!users){
            return "error";
        }

        //insert document
        await users.insertOne({vorname, nachname, password: psw, email});

        return "success: user_created";
    }

    async function login(request: URLSearchParams): Promise<string> {
        let psw = request.get('psw');
        let email = request.get('email');
        if(!psw || !email){
            return "error";
        }
        let userArray = await users.find({email, password: psw}).toArray();
        if(userArray && userArray.length > 0){
            return "success";
        }
        return "not_existing";
    }

    async function getUserlist() : Promise<string> {
        if(!users){
            return "";
        }
        let userArray: any[] = await users.find({}).toArray();
        let names:string[] = [];
        userArray.forEach((entry) =>{
           names.push(entry.vorname + " " + entry.nachname);
        });
        return names.join('<br/>');
    }

    async function evaluateResponse(url: string, request: Http.IncomingMessage) {
        console.log(url);
        let response = '';
        if(url.startsWith('/register')){
            let data = new URLSearchParams(url.replace('/register', ''));
            response = await register(data);
        }
        if(url.startsWith('/login')){
            let data = new URLSearchParams(url.replace('/login', ''));
            response = await login(data);
        }
        if(url.startsWith('/userlist')){
            response = await getUserlist();
        }

        return response;
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!", _request.url);

        let response = await evaluateResponse(_request.url, _request);

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        _response.write(response);

        _response.end();
    }
}
