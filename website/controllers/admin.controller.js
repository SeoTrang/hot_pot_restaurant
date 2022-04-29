const { mutipleMogooseToObject } = require('../util/mongoose');
const { mongoosesToObject }     = require('../util/mongoose');
const table                     = require('../model/table');
const category                  = require('../model/category');
const product                   = require('../model/product');
const booked                    = require('../model/booked');
const { splitString }                 = require('../util/buil_funtion_help');


var now = new Date();
var date = now.toISOString().slice(0,10);

// now.format("dd/MM/yyyy hh:mm TT");
var time_now = date+" "+ now.getHours()+":"+now.getMinutes();

class admin{
    
    

    // ----------------------------middleware-----------------------------------------
    middlewareCategorys(req,res,next){
        category.find({})
        .then(category =>{
            req.categorys = category; //pass value categorys
            next();
        })
        
    }
    middlewareProducts(req,res,next){
        product.find({})
        .then(product =>{
            req.products = product; //pass value categorys
            next();
        })
        
    }

    middlewareTables(req,res,next){
        table.find({})
        .then(table =>{
            req.tables = table; //pass value categorys
            next();
        })
        
    }

    // getDateBookedMiddleware(req,res,next){
    //     var date = req.query.userDate;
    //     var time = splitString(req.query.userTime)[0];
    //     booked.find({})
    //     .then(booked =>{
    //         var hour = [];

    //     })
    // }


    // ---------------------------end middleware--------------------------


    //**************************** admin side ******************************************

    // ---------------------------- home admin --------------------------------

    homeAdmin(req,res,next){
        res.render('admin/home',{layout: "admin"});
    }


    // ---------------------------- product --------------------------------

    //[get]/addproduct
    addProduct(req,res,next){
        category.find({})
        .then(category =>{
            res.render('admin/addProduct',{layout:"admin",
                category:mutipleMogooseToObject(category)
            });
        })
    }
    // [post]/store-product
    storeProduct(req,res,next){
        // res.render('admin/addProduct',{layout:"admin"});
        // console.log(req.body);
        var fileLen = req.files.length;
        var pathImgFood = 'images/food/';

        if(fileLen> 0){
            // console.log(req.files.filename); 
            // res.send(req.body.name);
            var arrImg = [];
            for (let index = 1; index < fileLen; index++) {
                arrImg.push(pathImgFood + req.files[index].filename);
                
            }

            const product_save = new product({
                name        :req.body.name,
                idCategory :req.body.category,
                img         :pathImgFood + req.files[0].filename,
                price       :req.body.price,
                countBooked :0,
                promo       :req.body.promo,
                ingredients :req.body.ingredients,
                moreInfoText:req.body.textInfo,
                moreInfoImg :arrImg,
                time        :time_now

            });

            product_save.save();
            res.redirect('/admin/addproduct');


            
        }else{
            res.json("khong co file anh");
        }
    }

    //[get]/products
    viewProduct(req,res,next){
        product.find({})
        .then(product =>{
            // res.json(req.categorys);
            res.render('admin/viewProduct',{layout:"admin",
                product:mutipleMogooseToObject(product),
                category:mutipleMogooseToObject(req.categorys)
            });
        })
    }


    //midleware view products 
    viewProductMiddleware(req,res,next){
        // console.log(req.params.slug);
        category.find({slug:req.params.slug})
        .then(category =>{
            // res.json(category)
            req.category = category;
            next();
        })
        .catch(()=>{
            res.redirect('/admin/products')
        })
    }

    // [get]/admin/produc/slug-category
    viewProductByCategory(req,res,next){
        // res.json(req.category[0]._id);

        // res.json(req.categorys);
        product.find({idCategory:req.category[0]._id})
        .then(product =>{
            // res.json(product)
            
            res.render('admin/viewProduct',{layout:"admin",
                product:mutipleMogooseToObject(product),
                category:mutipleMogooseToObject(req.categorys)
            })
            
        })
    }



    // ------------------------------ booked -----------------------------------

    //[get]/booked
    booked(req,res,next){
        res.render('admin/booked',{layout:"admin"});

    }

    // [check-time] (check table status have is booked)
    checkTime(req,res,next){
        
        res.render('admin/check_table_status',{layout:"admin"})
    }


    


    //[get]/add-new-order
    addNewOrder(req,res,next){
        console.log(req.query);
        var idTimeBooked = [];
        var tableBooked = [];
        var date_req = req.query.userDate;
        var time = splitString(req.query.userTime)[0];
        booked.find({date:date_req})
        .then(booked =>{
            // res.json(booked);
            
            for (let index = 0; index < booked.length; index++) {
                if(booked[index].date == date_req && (booked[index].hour == time || booked[index].hour-2 == time || booked[index].hour+2 == time)){
                    idTimeBooked.push(booked[index]._id);
                
                    var table_len = booked[index].table.length;
                    for (let j = 0; j < table_len; j++) {
                        // tableBooked.push(booked[index][j].table);
                        console.log(booked[index].table[j]);
                        tableBooked.push(booked[index].table[j]);
                        
                    }
                }
                
            }
            
            
        })
        .then(()=>{
            // res.json(tableBooked)
            table.find({_id: {$not:{$in: tableBooked} }})
            .then(tables =>{
                // res.json(tables);
                res.render("admin/addNewOrder",{layout:"admin",
                    products:mutipleMogooseToObject(req.products),
                    categorys:mutipleMogooseToObject(req.categorys),
                    tables:mutipleMogooseToObject(tables),
                    userDate:date_req,
                    userTime:req.query.userTime
                });
            })
        })


    }

    // [post]/store-order
    storeOrder(req,res,next){
        // res.json(req.body)
        // const lenFood = req.body.id_food.length;
        let timeEat = req.body.userDate+" "+req.body.userTime;

        const booked_save = new booked({
            customerName:req.body.userName,
            phone       :req.body.userPhone,
            email       :req.body.userEmail,
            note        :req.body.userNote,
            bookedFood  :{
                id_food : req.body.id_food,
                count   : req.body.count
            },
            bookedAt    :time_now,
            timeEat     :timeEat,
            state       :0,
            hour        :splitString(req.body.userTime)[0],
            date        :req.body.userDate
            
        });

        booked_save.save();
        res.redirect('/admin/wait-for-confirmation');
    }

    // [get]/wait-for-confirmation
    waitForConfirmation(req,res,next){
        var booked1;
        booked.find({state:0})
        .then(booked =>{
            // res.json(booked);

            booked1 = booked;
            // booked1[0].customerName;
            // booked1[0].name = "ma seo 1111111";
            // console.log(booked1[0])
            // res.json(booked1[0].bookedFood.id_food.length);

            // var len_id_food = booked1[0].bookedFood.id_food.length;
            // for (let index = 0; index < len_id_food; index++) {
            //     product.f
                
            // }
            var product1 = booked1[0].bookedFood.id_food[0];
            // res.json(product1);


            product.find({_id: {$in:product1}})
            .then(product =>{
                res.json(product);
            })

            // res.render('admin/order_wait_confirm',{layout:"admin",
            //     booked:mutipleMogooseToObject(booked)
            // });
        })
        
        
        //res.render('admin/order_wait_confirm',{layout:"admin"});
    }



    // --------------------category-----------------------------------------


    //[get]/categorys
    categorys(req,res,next){
        category.find({})
        .then(category =>{
            res.render("admin/categorys",{layout:"admin",
                category:mutipleMogooseToObject(category)
            });
        })
        
    }

    //[get]/categorys
    storeCategory(req,res,next){

        const category_save = new category({
            name:req.body.mycategory,
            productquantity:0,
            time:time_now
        });

        category_save.save();
        // res.json(category_save);
        res.redirect('/admin/categorys');
        
    }

    // -------------------------------table---------------------------------------

    // [get]/tables
    tables(req,res,next){
        // console.log();
        table.find({})
        .then(table =>{
            // console.log(table.length)
            
            // res.json(table)
            res.render("admin/tables",{layout:"admin",
                table:mutipleMogooseToObject(table)
            });
        })

        
    }

    // [post]/store-table
    storeTables(req,res,next){

        const table_save = new table({
            name:req.body.table,
            state:"0",
            time:time_now
        });
        table_save.save();
        res.redirect('/admin/tables');

    }


    // ******************************** client side ******************************

    // --------------------------------- home client -------------------------------------
    homeClient(req,res,next){

    }
}

module.exports = new admin;