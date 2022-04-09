
// const Handlebars = require("handlebars");


// class check{
//     check(){
//         Handlebars.registerHelper( "when",function(operand_1, operator, operand_2, options) {
//             var operators = {
//              'eq': function(l,r) { return l == r; },
//              'noteq': function(l,r) { return l != r; },
//              'gt': function(l,r) { return Number(l) > Number(r); },
//              'or': function(l,r) { return l || r; },
//              'and': function(l,r) { return l && r; },
//              '%': function(l,r) { return (l % r) === 0; }
//             }
//             , result = operators[operator](operand_1,operand_2);
          
//             if (result) return options.fn(this);
//             else  return options.inverse(this);
//           });
//         }
// } 

// module.exports = new check;


var check = function(operand_1, operator, operand_2) {
    var operators = {
     'eq': function(l,r) { return l == r; },
     'noteq': function(l,r) { return l != r; },
     'gt': function(l,r) { return Number(l) > Number(r); },
     'or': function(l,r) { return l || r; },
     'and': function(l,r) { return l && r; },
     '%': function(l,r) { return (l % r) === 0; }
    }
    , result = operators[operator](operand_1,operand_2);
    console.log(result);
    if(result) return 'block';
    else return 'none';
  };

var tam = (a,b)=>{
    return a+b;
}
  module.exports = {
    check,
    tam
  };
