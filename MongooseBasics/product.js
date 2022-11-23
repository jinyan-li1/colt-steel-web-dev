const mongoose = require("mongoose");

// handle connection errors
mongoose.connect('mongodb://localhost:27017/shopApp')
    .then (() => {
        console.log("Connection open!")
    })
    .catch(err => {
        console.log("Oh no! Error!")
        console.log(err)
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    }, 
    price: { 
        type: Number,
        required: true,
        min: [0, "Price cannot be negative!"]
    },
    onSale: {
        type: Boolean,
        default: false
    }, 
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }, 
    size :{
        type: String,
        enum: ["S", "M", "L"]
    }
});

// model instance methods, needs to use tradition function declaraction, this
// keyword refers to the individual instances
// productSchema.methods.greet = function() {
//     console.log("HELLO!!! HI!!!")
//     console.log(`- from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function(newCat) {
    this.categories.push(newCat);
    return this.save();
}

// model static methods, needs to use tradition function declaraction, this
// keyword refers to the model itself - Product
productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0})
}


const Product = mongoose.model("Product", productSchema);

const findProduct = async() => {
    const foundProduct = await Product.findOne({name: "Mountain Bike"});
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory("Outdoors");
    console.log(foundProduct);
}

// findProduct();

Product.fireSale().then(res => console.log(res))

// const bike = new Product ({name: "Cycling Jersey", price: 28.50, categories: ["Cycling"], size: "S"});
// bike.save()
// .then (data => {
//     console.log("IT WORKED!")
//     console.log(data);
// })
// .catch(err => {
//     console.log("OH NO! ERROR!")
//     console.log(err)
// })

// Product.findOneAndUpdate({name: "Tire Pump"}, {price: 19.99}, {new: true, runValidators: true})
//     .then (data => {
//     console.log("IT WORKED!")
//     console.log(data);
//     })
//     .catch(err => {
//         console.log("OH NO! ERROR!")
//         console.log(err)
//     })
