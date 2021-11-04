const router = require("express").Router();
let db = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

router.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname, "../db/db.json"));
          
})

router.post('/notes', function (req, res){

    const { title, text } = req.body;

    const newNote = { 
        title, 
        text,
        id: uuidv4(),
    }

    fs.readFile(path.join(__dirname, "../db/db.json"),'utf-8', function(err, data) {
        const parsedNotes = JSON.parse(data)
        parsedNotes.push(newNote)
      

    fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(parsedNotes), function (err) {
        if (err) throw err;
        console.log('Saved!');

      });
    });
      res.sendFile(path.join(__dirname, "../db/db.json"));

})

router.delete("/notes/:id", function(req, res){

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', function(err, data) {
        const parsedNotes = JSON.parse(data)
       
        for(let i =0; i < parsedNotes.length; i++){
            if(req.params.id === parsedNotes[i].id){
                parsedNotes.splice(i, 1)
            }
        }
        fs.writeFile(path.join(__dirname, "../db/db.json"),JSON.stringify(parsedNotes), (err)=>{
            console.log(err)
        })
        res.sendFile(path.join(__dirname, "../db/db.json"))
    })

})

module.exports = router;
