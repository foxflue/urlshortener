import mongoose from "mongoose";

export const mongoConnect = async () => {
  const connect = await mongoose.connect(
    "mongodb+srv://urlshortner:626626@cluster0.2mnel.mongodb.net/urlshort"
  );
  if (connect) {
    console.log(`Database Connected.✅`);
  } else {
    console.log("Database Error.❌");
  }
};
