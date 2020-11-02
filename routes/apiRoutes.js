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
const util = require('util');

// DB filename
const dbPath = path.join(cwd, "/db/db.json");

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
    const data = await readFileAsync(dbPath, "utf8");
    console.log((data));
    const  dataJ = JSON.parse(data);
    console.log(dataJ);
    return res.json(dataJ);
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
      const data = await readFileAsync(dbPath, "utf8");
      const  dataJ = JSON.parse(data);
    }catch (error){
      console.log(error)
    }
  
    note.id = uuidv4();
    dataJ.push(note);
    try{
      await fs.writeFileAsync(dbPath, JSON.stringify(dataJ));
    }catch (error){
        console.log(error)
    }
    
    return res.json(true);
  });
      
  

    
    // DELETE /api/notes/:id - A 'delete note' request  will delete a note frome the database  based on 
    // ID. All saved  notes are then  rewritten to the db.json file.

     app.delete("/api/notes/:id", async(req, res)  => {
      const id = req.params.id;
     try {
       const readFileAsync = util.promisify(fs.readFile);
      const  data = await readFileAsync(dbPath, "utf8");
      const  dataJ = JSON.parse(data);
      return res.json(dataJ);
    }catch (error){
      console.log(error)
    };
      
    const filteredNotes = data.filter( dataJ => dataJ.id !== id);
    console.log("Filtered notes: " + filteredNotes);
     
     const writeFileAsync = util.promisify(fs.writeFile); 
    try{
      writeFileAsync(dbPath, JSON.stringify(filteredNotes));
    }catch (error){
      console.log(error);
    }
    return res.json(true);
    });
    }
    
  







