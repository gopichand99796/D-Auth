import mongoose from "mongoose";
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    }
    catch (error) {
        console.error(" Database Connection Failed");
        console.error(error);
        process.exit(1);
    }
}
//# sourceMappingURL=database.js.map