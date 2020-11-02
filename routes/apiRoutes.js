// ==================================================================================
// LOAD DATA
// The below routes are linked  to a "data" source.
// Thes data source  holds an array containing information pertaining to saved notes.
// ==================================================================================


const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const process = require("process");
const cwd = process.cwd();
// DB filename
const dbPath = path.join(cwd, "/db/db.json");

// =====================================================================================================
// ROUTING
// =====================================================================================================
module.exports = (app) => {
  // API GET Request(s)
  // the reqwuest is handled by the code below  when a user visits a link.
  // For  each of the cases below, a user visiting  a link results in a response in the form of a note 
  // (consisting of data in JSON  format.
  // ----------------------------------------------------------------------------------------------------

app.get("/api/notes", (req, res) => {

fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) throw err;
    const  dataJ = JSON.parse(data);
    return res.json(dataJ);
  });
});


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below scenario(s), when a user submits form data (in the form of a  JSON object)
  // , a new note is saved to  the request body and then added to the db.json file along with an 
  // associated ID.
  // ----------------------------------------------------------------------------------------------------

  app.post("/api/notes", (req, res) => {
    // Note the code here. Our "server" will respond to the requests and then save a new note to the 
    // database.

    const note = req.body; 
    const data = fs.readFileSync(dbPath, "utf-8");
    const dataJ = JSON.parse(data);
    note.id = uuidv4();
    dataJ.push(note);
  
    fs.writeFileSync(dbPath, JSON.stringify(dataJ),  err => {
    if (err){
      throw err;
      return res.json(false);
    }
    return res.json(true);
    });
      
  })

    
    // DELETE /api/notes/:id - A 'delete note' request  will delete a note frome the database  based on 
    // ID. All saved  notes are then  rewritten to the db.json file.

     app.delete("/api/notes/:id", (req, res)  => {
      const id = req.params.id;
      let currentNotes  =  JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      
      const filteredNotes = currentNotes.filter( dataJ => dataJ.id !== id);
     
      
      fs.writeFileSync(dbPath, JSON.stringify(filteredNotes), err => { 
      if (err) {
        throw err;
      }
      return res.json(true);
      });
       // if ID is not found
    return res.status(404).json(false); 
    });
    
  }







