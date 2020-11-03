// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require("path");
const process = require("process");
const cwd = process.cwd();

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = app => {
  // HTML GET Requests.
  // The following code handles when users "visit" a page.
  // The cases below result in  the user being  shown a page of HTML content.
  // ---------------------------------------------------------------------------
  
  app.get("/index", (req, res) => {
    res.sendFile(path.join(cwd, "/public/index.html"));
  });

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(cwd, "/public/notes.html"));
  });

  // If no matching route is found, then the  default route is set to index.
  app.get("*", (req, res) => {
    res.sendFile(path.join(cwd, "/public/assets/index.html"));
  });
};
