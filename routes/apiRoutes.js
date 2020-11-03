// ==================================================================================
// LOAD DATA
// The below routes are linked  to a "data" source.
// Thes data source  holds an array containing information pertaining to saved notes.
// ==================================================================================


const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid'); // Generates a uniquie id.
const process = require("process");
const cwd = process.cwd();
const util = require('util');

// DB filename
const dbPath = path.join(cwd, "/db/db.json");

// DB file.
const  notes = require(dbPath);

// =====================================================================================================
// ROUTING
// =====================================================================================================
module.exports = app => {
  // API GET Request(s)
  // the reqwuest is handled by the code below  when a user visits a link.
  // For  each of the cases below, a user visiting  a link results in a response in the form of a note 
  // (consisting of data in JSON  format.
  // ----------------------------------------------------------------------------------------------------

app.get("/api/notes", async(req, res) => {
  try{
     const readFileAsync = util.promisify(fs.readFile);
    const rawNotes = await readFileAsync(dbPath, "utf8");
    console.log((rawNotes));
    const  currentNotes = JSON.parse(rawNotes);
    return res.json(currentNotes);
  } catch (error){
    console.log(error)
  }
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below scenario(s), when a user submits form data (in the form of a  JSON object)
  // , a new note is saved to  the request body and then added to the db.json file along with an 
  // associated ID.
  // ----------------------------------------------------------------------------------------------------

  app.post("/api/notes", async (req, res) => {
    // Note the code here. Our "server" will respond to the requests and then save a new note to the 
    // database.

    const note = req.body; 
    try {
      const readFileAsync = util.promisify(fs.readFile);
      const rawNotes = await readFileAsync(dbPath, "utf8");
      const  currentNotes = JSON.parse(rawNotes);
    }catch (error){
      console.log(error)
    }
  
    note.id = uuidv4();
    notes.push(note);
    try{
      const writeFileAsync = util.promisify(fs.writeFile);
      await writeFileAsync(dbPath, JSON.stringify(notes));
    }catch (error){
        console.log(error)
    }
    return res.json(true);
  });
      
  

    
    // DELETE /api/notes/:id - A 'delete note' request  will delete a note frome the database  based on 
    // ID. All saved  notes are then  rewritten to the db.json file.

     app.delete("/api/notes/:id", async(req, res)  => {
      const note = req.body;  
      const id = req.params.id;
     try {
      const readFileAsync = util.promisify(fs.readFile);
      const  rawNotes = await readFileAsync(dbPath, "utf8");
      const currentNotes =  JSON.parse(rawNotes);
      console.log(currentNotes);
      const filteredNotes = currentNotes.filter(note => note.id !== id);
      const writeFileAsync = util.promisify(fs.writeFile);
      writeFileAsync(dbPath, JSON.stringify(filteredNotes));
      return res.json(true);
    }catch (error){
      console.log(error)
    };
  })
}
    

    
  







