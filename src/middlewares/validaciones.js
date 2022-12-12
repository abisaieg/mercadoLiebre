const {body} = require("express-validator")

const validacion = [
    body("nombreProducto").notEmpty().withMessage("nombre incompleto")

]


module.exports = validacion;                     