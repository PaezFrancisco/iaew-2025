import express, { Request, Response } from "express"; 
import dotenv from "dotenv"; 
import { connectDB } from "./db"; 
import usuariosRouter from "./routes/usuarios"; 
 
dotenv.config(); 
const app = express(); 
app.use(express.json()); 
 
const PORT = process.env.PORT || 3000; 
 
app.get("/health", (_req: Request, res: Response) => { 
  res.json({ ok: true, service: "docker-ts-api", mongoUri: 
!!process.env.MONGO_URI }); 
}); 
 
app.get("/", (_req: Request, res: Response) => { 
  res.json({ message: "Hola desde Docker con TypeScript + MongoDB" 
}); 
}); 
 
app.use("/usuarios", usuariosRouter); 
 
async function start() { 
  try { 
    if (process.env.MONGO_URI) { 
      await connectDB(process.env.MONGO_URI); 
      console.log("MongoDB conectado"); 
    } else { 
      console.warn("MONGO_URI no definido. La API correrá sin DB."); 
    } 
 
    app.listen(PORT, () => { 
      console.log(`Servidor corriendo en http://localhost:${PORT}`); 
    }); 
  } catch (err) { 
    console.error("Error al iniciar la app:", err); 
    process.exit(1); 
  } 
} 
 
start();