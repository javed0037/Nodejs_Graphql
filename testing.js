const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}


// // pollyfill used if our browser does not support bind method.


// var objTest = {
//     firstName: "javed",
//     lastName: "khan"
// }


// let testFunction =  function (homeTown,distric) {

//   console.log('firstName is', this.firstName,' ', 'lastName', this.lastName, " ", 'homeTown', homeTown,'and distric is',distric );

// }

//  let bindfunction = testFunction.bind(objTest,"shabga");

//  bindfunction("baghpat");


//  Function.prototype.myBindFunction = function(...args){

//     let obj = this;
//     let params = args.splice(1);

// return function(...args2){
//     obj.apply(args[0],[...params,...args2])
// }

//  }

//  const callMyBindFunction = testFunction.myBindFunction(objTest,'shabga');

//  callMyBindFunction("baghpat")





 



