import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    quote: {type: String, default: "You have no quote"},
});

const User = mongoose.model('User', UserSchema)

export default User;