import  mongoose, { connect } from "mongoose";

const con = await connect ("mongodb://localhost:27017/nacka-db-js");
const {db}=  mongoose.connection;

const carSchema = mongoose.Schema(
    {
       brand: {type: String},
       model: {type: String},
       year: {type: Number},
       color: {type: String}
    }
);

export const carModel = mongoose.model("Cars", carSchema);

// const carCollection = await db.createCollection(carModel);

const carsCol = await db.collection("cars");

const carCol = carsCol.insertMany([
    {
        brand: "Mercedes",
        model: "gt",
        year: 2001,
        color: "green"
    },
    {
        brand: "Opel",
        model: "astra",
        year: 2009,
        color: "red"
    }]);
