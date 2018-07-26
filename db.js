let MongoClient = require('mongodb').MongoClient;


function DB() {
    this.db = null;            // The MongoDB database connection

    var _this = this;        // Required as this is no longer available in the functions invoked
                            // in response to the promise being satisfied
}




myLibrary.myAsyncFunction(myParameters)
.then(
    function(myResults) {
        // If the asynchronous operation eventually *succeeds* then the first of the then
        // functions is invoked and this code block will be executed at that time.
        // myResults is an arbitrary name and it is set to the result data sent back
        // by myAsyncFunction when resolving the promise

        _this.results = myReults;
    },
    function(myError) {
        // If the asynchronous operation eventually *fails* then the second of the then
        // functions is invoked and this code block will be executed at that time.
        // myError is an arbitrary name and it is set to the error data sent back
        // by myAsyncFunction when rejecting the promise

        console.log("Hit a problem: " + myError.message);
    }
)


return new Promise(function(resolve, reject) {
    // At this point, control has already been passed back to the calling function
  // and so we can safely perform operations that might take a little time (e.g.
    // a big database update) without the application hanging.

    var result = doSomethingThatTakesTime();

    // If the operation eventually succeeds then we can invoke resolve (the name is
    // arbitrary, it just has to patch the first function argument when the promise was
  // created) and optionally pass back the results of the operation

    if (result.everythingWentOK) {
        resolve(result.documentsReadFromDatabase);
    } else {

        // Call reject to fail the promise and optionally provide error information

        reject("Something went wrong: " + result.error.message);
    }
})

DB.prototype.connect = function(uri) {

    // Connect to the database specified by the connect string / uri

    // Trick to cope with the fact that "this" will refer to a different
    // object once in the promise's function.
    var _this = this;

    // This method returns a javascript promise (rather than having the caller
    // supply a callback function).

    return new Promise(function(resolve, reject) {
        if (_this.db) {
            // Already connected
            resolve();
        } else {
            var this = _this;

            // Many methods in the MongoDB driver will return a promise
            // if the caller doesn't pass a callback function.
            MongoClient.connect(uri)
            .then(
                function(database) {

                    // The first function provided as a parameter to "then"
                    // is called if the promise is resolved successfuly. The
                    // "connect" method returns the new database connection
                    // which the code in this function sees as the "database"
                    // parameter

                    // Store the database connection as part of the DB object so
                    // that it can be used by subsequent method calls.

                    this.db = database;

                    // Indicate to the caller that the request was completed succesfully,
                    // No parameters are passed back.

                    resolve();
                },
                function(err) {

                    // The second function provided as a parameter to "then"
                    // is called if the promise is rejected. "err" is set to
                    // to the error passed by the "connect" method.

                    console.log("Error connecting: " + err.message);

                    // Indicate to the caller that the request failed and pass back
                    // the error that was returned from "connect"

                    reject(err.message);
                }
            )
        }
    })
}

DB.prototype.countDocuments = function(coll) {

    // Returns a promise which resolves to the number of documents in the
    // specified collection.

    var _this = this;

    return new Promise(function (resolve, reject){

        // {strict:true} means that the count operation will fail if the collection
        // doesn't yet exist

        _this.db.collection(coll, {strict:true}, function(error, collection){
            if (error) {
                console.log("Could not access collection: " + error.message);
                reject(error.message);
            } else {
                collection.count()
                .then(
                    function(count) {
                        // Resolve the promise with the count
                        resolve(count);
                    },
                    function(err) {
                        console.log("countDocuments failed: " + err.message);
                        // Reject the promise with the error passed back by the count
                        // function
                        reject(err.message);
                    }
                )
            }
        });
  })
