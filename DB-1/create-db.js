import mongoose, { connect } from "mongoose";

(async () => {
  try {
    await connect("mongodb://localhost:27017/ProductAssignment");

    // Define Product Schema and Model
    const ProductSchema = mongoose.Schema({
      name: { type: String },
      category: { type: String },
      price: { type: Number },
      cost: { type: Number },
      stock: { type: Number },
    });
    const ProductModel = mongoose.model("Product", ProductSchema);

    // Insert Products
    const products = await ProductModel.insertMany([
      {
        name: "Laptop",
        category: "Electronics",
        price: 1000,
        cost: 800,
        stock: 50,
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 800,
        cost: 600,
        stock: 40,
      },
      {
        name: "T-shirt",
        category: "Clothing",
        price: 20,
        cost: 10,
        stock: 100,
      },
      {
        name: "Refrigerator",
        category: "Home Appliances",
        price: 1200,
        cost: 1000,
        stock: 30,
      },
      {
        name: "Shampoo",
        category: "Beauty & Personal Care",
        price: 10,
        cost: 5,
        stock: 80,
      },
      {
        name: "Soccer Ball",
        category: "Sports & Outdoors",
        price: 30,
        cost: 20,
        stock: 60,
      },
    ]);

    // Define Offer Schema
    const OfferSchema = mongoose.Schema({
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      price: { type: Number },
      active: { type: Boolean },
    });

    // Create Offer Model
    const OfferModel = mongoose.model("Offer", OfferSchema);

    // Insert Offers
    const offers = await OfferModel.insertMany([
      {
        products: [
          products[0]._id, // Laptop ID
          products[1]._id, // Smartphone ID
        ],
        price: 1800,
        active: true,
      },
      {
        products: [
          products[2]._id, // T-shirt ID
          products[4]._id, // Shampoo ID
        ],
        price: 30,
        active: true,
      },
      {
        products: [
          products[3]._id, // Refrigerator ID
          products[1]._id, // Smartphone ID
          products[5]._id, // Soccer Ball ID
        ],
        price: 1830,
        active: false,
      },
    ]);

    // Define Supplier Schema
    const SupplierSchema = mongoose.Schema({
      name: { type: String },
      contact: { type: String },
    });

    // Create Supplier Model
    const SupplierModel = mongoose.model("Supplier", SupplierSchema);

    // Insert Suppliers
    await SupplierModel.insertMany([
      {
        name: "Electronics Supplier Inc.",
        contact: "John Doe (john@electronicsupplier.com)",
      },
      {
        name: "Fashion Supplier Co.",
        contact: "Jane Smith (jane@fashionsupplier.com)",
      },
    ]);

    // Define Sales Order Schema
    const SalesOrderSchema = mongoose.Schema({
      offer: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer' },
      quantity: { type: Number },
      status: { type: String },
    });

    // Create Sales Order Model
    const SalesOrderModel = mongoose.model("SalesOrder", SalesOrderSchema);

    // Insert Sales Orders
    await SalesOrderModel.insertMany([
      {
        offer: offers[0]._id, // Offer 1 ID
        quantity: 2,
        status: "pending",
      },
      {
        offer: offers[2]._id, // Offer 3 ID
        quantity: 1,
        status: "pending",
      },
    ]);

    console.log("Data insertion completed successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
})();
