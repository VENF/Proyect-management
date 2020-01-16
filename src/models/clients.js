import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clientsSchema = new Schema({
    name: { type: String, required: [true, 'Este campo es obligatorio'] },
    lastName: { type: String, required: [true, 'Este campo es obligatorio'] },
    email: { type: String, required:[true, 'Este campo es obligatiorio'], unique: true , match: /.+\@.+\..+/ },
    phone: { type: String },
    direction: { type: String },
    date: { type: Date, default: Date.now },
    asig: { type: Boolean, default: false }
});
module.exports = mongoose.model('clients', clientsSchema);