import  express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from "morgan"
const PORT = process.env.PORT || 3000
dotenv.config()
import connectionToDB from "./config/dbConnection.js";
import cookieParser from "cookie-parser";
import Routes from "./Routes/routes.js";
import path  from "path";
// import { dirname } from 'path';
import { fileURLToPath } from 'url';
import BlogRoutes from "./Routes/.blogRoutes.js";
import errorMiddleware from "./middelware/error.middelware.js";

const app = express();
// app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const __dirname = path.resolve()


app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cookieParser());

app.use(morgan('dev'));

app.use(cors({
    origin : "*",
    credentials : true,
    // withCredentials : true,
    optionsSuccessStatus: 200

}))
app.use(errorMiddleware);


app.use(express.json()) //middleware to work with json data
app.use(express.static(path.join(__dirname, 'dist')));


// console.log('__dirname:', __dirname);
// console.log('Resolved Static Path:', path.join(__dirname, 'BlogApp/dist'));
// console.log('Resolved Index.html Path:', path.join(__dirname, 'BlogApp/dist/index.html'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// const filePath = path.join(__dirname, 'BlogApp/dist/index.html');

// app.get('/', function(req, res) {
//     const filePath = path.join(__dirname, 'BlogApp/dist/index.html');
//     console.log("....",filePath)
//     res.sendFile(filePath, (err) => {
//         if (err) {
//             console.error('Error sending file:', err);
//             res.status(500).send('Internal Server Error');
//         }
//     });
// });

// console.log('__filename:', filePath);




app.use("/blog" , BlogRoutes )
app.use("/blog/user" , Routes)



app.all('*', (req, res) => {
    res.status(404).send('OOPS 404 page not found');
});


app.listen(PORT , async ()=>{
    await connectionToDB()
    console.log("Server Started on PORT NO:", PORT)
})