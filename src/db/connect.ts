import mongoose from "mongoose";

export const mongoConnect = async () => {
  const connect = await mongoose.connect(process.env.MONGODB_URL as string);
  if (connect) {
    console.log(`Database Connected ✅`);
  } else {
    console.log("Database Error ❌");
  }
};
