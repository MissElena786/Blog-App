import mongoose from "mongoose";

mongoose.set('strictQuery', false)

// const uri = 'mongodb://localhost:27017/your-database-name';
const uri = 'mongodb://127.0.0.1:27017/BlogDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connectionToDB = async ()=>{
   try {
      const { connection } = await mongoose.connect(
       'mongodb://127.0.0.1:27017/BlogDB'
      )

      if(connection){
         console.log(`connected to mongoDB  : ${connection.host}`);
      }
   } catch (e) {
      console.log(e);
      process.exit(1)
   }
}


export default connectionToDB