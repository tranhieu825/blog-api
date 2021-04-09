import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb+srv://trantronghieu:aa123456789@cluster0.jdzwv.mongodb.net/blog', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('>>> Database connected');
    }
    catch {
        console.log('Error');
    }
}
