const router = require("express").Router();
let db = require("../db/db.json");

router.get("/notes", function(req,res){
    res.json(db);
})

router.post('/notes', function (req, res){
    req.body.id = db.length + 1;
     req.body;
    console.log("POST NOTES", req.body)

    db.push(req.body);
    res.json(db);
})

router.delete("/notes/:id", function(req, res){

    newDB = []
    console.log("REQ.PARAMS", req.params)
    for(var i =0; i < db.length; i++){

        if(parseInt(req.params.id) !== db[i].id){
            newDB.push(db[i])

        }
    }

    console.log("NEW DB", newDB)
    db = newDB;
    res.json(db);


})

module.exports = router;
