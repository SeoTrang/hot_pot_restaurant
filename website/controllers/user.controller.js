
class user{

    //[get] /
    home(req,res,next) {
        res.render('home',{title:"Express!"});
    }

    //[get] /monan
    monan(req,res,next){
        res.render('user/MonAn');
    }

    //[get] /gioithieu
    gioithieu(req,res,next){
        res.render('user/introduction');
    }

    //[get] /detail-slug
    chitiet(req,res,next){
        res.render('user/detail');
    }

    //[get] /book-slug
    book(req,res,next){
        res.render('user/book');
    }

    //[get] //check-table-status
    checkTableStatus(req,res,next){
        res.render('user/check_table_status');
    }

}

module.exports = new user;