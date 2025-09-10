import mongoose, { Schema, Document, Model } from "mongoose"; 
 
export interface IUsuario extends Document { 
  nombre: string; 
  creadoEn: Date; 
} 
 
const UsuarioSchema = new Schema<IUsuario>({ 
  nombre: { type: String, required: true, trim: true, minlength: 2 
}, 
  creadoEn: { type: Date, default: Date.now }, 
}); 
 
export const Usuario: Model<IUsuario> = 
  mongoose.models.Usuario || mongoose.model<IUsuario>("Usuario", 
UsuarioSchema);