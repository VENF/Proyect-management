//escema para el modelo de usuarios
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: [true, 'Este campo es obligatiorio'] },
    lastName: { type: String, required: [true, 'Este campo es obligatiorio'] },
    email: { type: String, required:[true, 'Este campo es obligatiorio'], unique: true , match: /.+\@.+\..+/ },
    profesion: { type: String, required: [true, 'Este campo es obligatiorio'] },
    password: { type: String, required:[true, 'Este campo es obligatiorio'] },
    role: { type: String, enum: ['admin', 'user'] },
    date: { type: Date, default: Date.now },
    asig: { type: Boolean, default: false },
    proyects: [{ type: Schema.Types.ObjectId, ref: "proyects", default: [] }]
});

userSchema.methods.encryptPassword = async (password) =>{
    const Salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, Salt)
}
module.exports = mongoose.model('user', userSchema);