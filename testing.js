// pollyfill used if our browser does not support bind method.


var objTest = {
    firstName: "javed",
    lastName: "khan"
}


let testFunction =  function (homeTown,distric) {

  console.log('firstName is', this.firstName,' ', 'lastName', this.lastName, " ", 'homeTown', homeTown,'and distric is',distric );

}

 let bindfunction = testFunction.bind(objTest,"shabga");

 bindfunction("baghpat");


 Function.prototype.myBindFunction = function(...args){

    let obj = this;
    let params = args.splice(1);

return function(...args2){
    obj.apply(args[0],[...params,...args2])
}

 }

 const callMyBindFunction = testFunction.myBindFunction(objTest,'shabga');

 callMyBindFunction("baghpat");





 



