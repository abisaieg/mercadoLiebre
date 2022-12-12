// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require("path")
const {body} = require("express-validator")
const validacion = require('../middlewares/validaciones');





//***  Multer configuration  ****/

const configuracionImagen = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
        cb(null, path.join(__dirname,'../../public/images/products'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
        let imageName =  Date.now() + file.originalname ;   // milisegundos y extensión de archivo original
        cb(null, imageName);         
    }
});


const uploadFile = multer({ storage: configuracionImagen });


// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create',uploadFile.single("imageProduct"),validacion, productsController.store); 
 



/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
