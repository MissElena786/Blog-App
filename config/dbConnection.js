// import mongoose from "mongoose";

// mongoose.set('strictQuery', false)

// const uri = 'mongodb://127.0.0.1:27017/BlogDB';

// // mongoose.set('useCreateIndex', true);
// mongoose.connect(uri, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  });

// const connectionToDB = async ()=>{
//    try {
//       const { connection } = await mongoose.connect(
//        'mongodb://127.0.0.1:27017/BlogDB'
//       )

//       if(connection){
//          console.log(`connected to mongoDB  : ${connection.host}`);
//       }
//    } catch (e) {
//       console.log(e);
//       process.exit(1)
//    }
// }

 

// export default connectionToDB




import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

// const uri = 'mongodb://127.0.0.1:27017/BlogDB';
const uri = 'mongodb+srv://elena-of-coder:elenaofcoder@cluster0.7i6aag1.mongodb.net/';

const connectionToDB = async () => {
   try {
      await mongoose.connect(process.env.DATABASE,
         //  {
         // useNewUrlParser: true,
         // useUnifiedTopology: true,
      // }
      );

      const connection = mongoose.connection;

      connection.once('open', () => {
         console.log(`Connected to MongoDB: ${connection.host}`);
      });

      connection.on('error', (err) => {
         console.error('MongoDB connection error:', err);
      });
   } catch (e) {
      console.error('Error connecting to MongoDB:', e);
      process.exit(1);
   }
}

export default connectionToDB;
