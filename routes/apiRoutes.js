// ==================================================================================
// LOAD DATA
// The below routes are linked  to a "data" source.
// Thes data source  holds an array containing information pertaining to saved notes.
// ==================================================================================

const  notes = require("../db/db.json");
const fs = require("fs");
const uuid = require("uuid");


// =====================================================================================================
// ROUTING
// =====================================================================================================

module.exports = function(app) {
  // API GET Request(s)
  // the reqwuest is handled by the code below  when a user visits a link.
  // For  each of the cases below, a user visiting  a link results in a response in the form of a note 
  // (consisting of data in JSON  format.
  // ----------------------------------------------------------------------------------------------------

app.get("/api/notes", function(req, res) {
res.json(notes);
  });
}

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below scenario(s), when a user submits form data (in the form of a  JSON object)
  // , a new note is saved to  the request body and then added to the db.json file along with an 
  // associated ID.
  // ----------------------------------------------------------------------------------------------------

  app.post("/api/notes", (req, res) => {
    // Note the code here. Our "server" will respond to the requests and then save a new note to the 
    // database.
   
    const newNote = {
        title: req.body.title,
        text:  req.body.text,
        id:     uuidv1(),
    }
    notes.push(newNote);  
    });

    fs.writeFileSync("./db/db.json", JSON.stringify(notes),  (err) => {
      if (err){
        throw err;
      }
    else {
        res.json(true);
      }
    });
        
    
    // DELETE /api/notes/:id - A 'delete note' request  will delete a note frome the database  based on 
    // ID. All saved  notes are then  rewritten to the db.json file.

    app.delete("/api/notes/:id", (req, res)  => {
    const savedNotes = notes.filter (id != req.id);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), err => { 
      if (err) {
        throw err;
      }
      res.json({ delete : "success" });
    });
  })
   
   

  