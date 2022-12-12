const fs = require("fs");
const path = require("path");
const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")

const controller = {
  // Root - Show all products|
  index: (req, res) => {
    //res.session.nombre = "abraham" //declaro una variable session
    //req.cookie("nombre", "abraham saieg") // declaro una cookie 

    console.log(req.session.nombre);
    res.render("products", { productos: products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let idProducto = req.params.id;
    let objProducto;

    for (let o of products) {
      if (idProducto == o.id) {
        objProducto = o;
        break;
      }
    }

    res.render("detail", { producto: objProducto });
  },

  // Create - Form to create
  create: (req, res) => {
    let passEncriptada = bcrypt.hashSync("Marcelo",10)
    console.log(passEncriptada);
    console.log(bcrypt.compareSync("Marcelo",passEncriptada)); // comparo si es igual la contraseña recibida 
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    let errors = validationResult(req);
	console.log("errors ", errors);
      if (errors.isEmpty()) {
      let nombreImagen = req.file.filename;
      let productoNuevo = {
        id: products[products.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        description: req.body.description,
        image: nombreImagen,
      };

      products.push(productoNuevo);

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

      res.redirect("/");
    } else {
      res.render("product-create-form", {
        errors: errors.array()
      });
    } 
  },

  // Update - Form to edit
  edit: (req, res) => {
    let idProducto = req.params.id;
    let objProducto;

    for (let o of products) {
      if (idProducto == o.id) {
        objProducto = o;
        break;
      }
    }

    res.render("product-edit-form", { producto: objProducto });
  },
  // Update - Method to update
  update: (req, res) => {
    let idProducto = req.params.id;

    for (let o of products) {
      if (idProducto == o.id) {
        o.name = req.body.name;
        o.description = req.body.description;
        o.price = req.body.price;
        o.discount = req.body.discount;
        o.category = req.body.category;
        break;
      }
    }

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

    res.redirect("/");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let idProducto = req.params.id;

    let arrProductos = products.filter(function (elemento) {
      return elemento.id != idProducto;
    });

    fs.writeFileSync(productsFilePath, JSON.stringify(arrProductos, null, " "));

    res.redirect("/");
  },
};

module.exports = controller;
