

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const controller = {
    logIn: (res,req) => {
        
        res.render("detail")
    }
    
    
};
  

module.exports = controller