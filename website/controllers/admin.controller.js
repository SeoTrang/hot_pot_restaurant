

class admin{
    home(req,res,next){
        res.render('admin/home',{layout: "admin"});
    }

    //[get]/addproduct
    addProduct(req,res,next){
        res.render('admin/addProduct',{layout:"admin"});
    }

    //[get]/products
    viewProduct(req,res,next){
        res.render('admin/viewProduct',{layout:"admin"});
    }

    //[get]/booked
    booked(req,res,next){
        res.render('admin/booked',{layout:"admin"})
    }
}

module.exports = new admin;