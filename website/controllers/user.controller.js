const { mutipleMogooseToObject } = require('../util/mongoose');
const { mongoosesToObject }     = require('../util/mongoose');
const table                     = require('../model/table');
const category                  = require('../model/category');
const product                   = require('../model/product');
const booked                    = require('../model/booked');
const { splitString }           = require('../util/buil_funtion_help');

var now = new Date();
var date = now.toISOString().slice(0,10);

// now.format("dd/MM/yyyy hh:mm TT");
var time_now = date+" "+ now.getHours()+":"+now.getMinutes();

class user{

    // midleware 
    //get table
    midlewareTable(req,res,next){
   
        
    }

    

    //[get] /
    home(req,res,next) {
        product.find({})
        .then(products =>{
            // res.json(products);
            res.render('home',{
                delLocalStoregare:0,
                products:mutipleMogooseToObject(products)
            });
        })
        
    }

    //[get] /monan
    monan(req,res,next){
        
        product.find({})
        .then(products =>{
            // res.json(products);
            res.render('user/MonAn',{
                products:mutipleMogooseToObject(products)
            });
        })
    }

    // [get]/search
    search(req,res,next){
        // res.json(req.query.search);
        product.find({name:req.query.search})
        .then(product =>{
            res.render('user/MonAn',{
                products:mutipleMogooseToObject(product)
            });
        })
    }

    //[get] /gioithieu
    gioithieu(req,res,next){
        res.render('user/introduction');
    }

    //[get] /detail-slug
    chitiet(req,res,next){
        product.findOne({slug:req.params.slug})
        .then(product =>{
            res.render('user/detail',{
                product:mongoosesToObject(product)
            });
        })
        // 
    }

    //[get] /book-slug
    book(req,res,next){
        
        var productId = req.query.productsId;
        product.find({_id: {$in : productId}})
        .then(products =>{
            // res.json(products);
            // res.render('user/book',{
            //     products: mutipleMogooseToObject(products)
            // });
          
            return products;
        })
        .then(products=>{
            // res.json(products);
            // res.json(req.query);
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
                    res.render("user/book",{
                        products:mutipleMogooseToObject(products),
                        tables:mutipleMogooseToObject(tables),
                        userDate:date_req,
                        userTime:req.query.userTime
                    });
                })
            })
        })
        
    }


    // [post]/store-order
    storeOrder(req,res,next){
        // res.json(req.body);
        let timeEat = req.body.userDate+" "+req.body.userTime;

        // res.json(req.body);
        const booked_save = new booked({
            customerName:req.body.userName,
            phone       :req.body.userPhone,
            email       :req.body.userEmail,
            note        :req.body.userNote,
            table       :req.body.table_book,
            bookedFood  :{
                id_food : req.body.products,
                count   : req.body.count
            },
            bookedAt    :time_now,
            timeEat     :timeEat,
            state       :0,
            hour        :splitString(req.body.userTime)[0],
            date        :req.body.userDate
            
        });
        booked_save.save();


       
       res.redirect("/?valid=1");
    }

    //[get] //check-table-status
    checkTableStatus(req,res,next){
        res.render('user/check_table_status');
    }

}

module.exports = new user;