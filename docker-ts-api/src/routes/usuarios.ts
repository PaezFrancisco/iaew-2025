import { Router, Request, Response } from "express"; 
import { Usuario } from "../models/Usuario"; 
 
const router = Router(); 
 
router.get("/", async (_req: Request, res: Response) => { 
  try { 
    const usuarios = await Usuario.find().sort({ _id: 1 }).select({ 
__v: 0 }); 
    res.json(usuarios); 
  } catch (err: any) { 
    res.status(500).json({ error: err?.message ?? "Error desconocido" }); 
  } 
}); 
 
router.post("/", async (req: Request, res: Response) => { 
  try { 
    const { nombre } = req.body; 
    if (!nombre) return res.status(400).json({ error: "nombre es requerido" }); 
    const usuario = await Usuario.create({ nombre }); 
    res.status(201).json({ id: usuario._id, nombre: usuario.nombre, 
creadoEn: usuario.creadoEn }); 
  } catch (err: any) { 
    res.status(500).json({ error: err?.message ?? "Error desconocido" }); 
  } 
}); 
 
router.delete("/:id", async (req: Request, res: Response) => { 
  try { 
    const { id } = req.params; 
    const eliminado = await Usuario.findByIdAndDelete(id); 
    if (!eliminado) return res.status(404).json({ error: "No encontrado" }); 
    res.json({ ok: true }); 
  } catch (err: any) { 
    res.status(500).json({ error: err?.message ?? "Error desconocido" }); 
  } 
}); 
 
export default router; 