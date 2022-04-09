

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
        res.render('admin/booked',{layout:"admin"});
    }


    //[get]/add-new-order
    addNewOrder(req,res,next){
        res.render("admin/addNewOrder",{layout:"admin",bien1:1,bien2:1});
    }

    // [get]/wait-for-confirmation
    waitForConfirmation(req,res,next){
        res.render('admin/order_wait_confirm',{layout:"admin"});
    }

    //[get]/categorys
    categorys(req,res,next){
        res.render("admin/categorys",{layout:"admin"});
    }

    // [get]/tables
    tables(req,res,next){
        res.render("admin/tables",{layout:"admin"});
    }
}

module.exports = new admin;