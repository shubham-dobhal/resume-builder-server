import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";





const app=express();
const PORT=process.env.PORT || 3000;
app.use(cors())


connectDB()

app.use(express.json())


app.get('/',(req,res)=>res.send("server is live"))
app.use('/api/users',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)


let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  next();
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
export default app;