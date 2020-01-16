import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const proyectSchema = new Schema({
    title: { type: String, required: [true, 'Este campo es obligatorio'] },
    description: { type: String, required: [true, 'Este campo es obligatorio'] },
    client: { type: Schema.Types.ObjectId, ref: "clients" },
    professionals: [{ type: Schema.Types.ObjectId, ref: "user" }],
    activities: [{ 
        title: {type: String },
        description: { type: String },
        percentage: { type: Number },
        state: { type: Boolean, default: false }
     }],
    percentage: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    clientCount: { type: Number },
    professionalCount: { type: Number },
    price: { type: Number },
    activitysCount: { type: Number },
    finish: { type: Boolean, default: false }
})
module.exports = mongoose.model('proyects', proyectSchema)