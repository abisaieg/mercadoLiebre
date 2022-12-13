

const controller = {
    logIn: (req,res) => {
        
        res.render("log-in");
    },
    validacionDeDatos: (req, res) => {
        let mail = req.body.mail
        let contrasena = req.body.contrasena
        console.log(mail,contrasena);
        res.render("log-in");
    }
    
    
};
  

module.exports = controller