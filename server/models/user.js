import mongoose from 'mongoose';

const user = mongoose.Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const User = mongoose.model('User', user);

export default User;