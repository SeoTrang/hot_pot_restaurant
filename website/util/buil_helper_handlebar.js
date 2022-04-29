


var check = function(operand_1, operator, operand_2) {
  // console.log(operand_1," ",operand_2);
    var operators = {
     'eq': function(l,r) { return l == r; },
     'noteq': function(l,r) { return l != r; },
     'gt': function(l,r) { return Number(l) > Number(r); },
     'or': function(l,r) { return l || r; },
     'and': function(l,r) { return l && r; },
     '%': function(l,r) { return (l % r) === 0; }
    }
    , result = operators[operator](operand_1,operand_2);
    // console.log(result);
    if(result) return 'block';
    else return 'none';
  };

var numberOrder = (a,b)=>{
    return a+b;
}
  module.exports = {
    check,
    numberOrder
  };


  // handlebar

  //  {{!-- <h1 style="display: {{check your variable1 'eq' your variable2}};">bang</h1> --}} 


  // controller
  // res.render("your layout",{your variable1:value,your variable2:value})