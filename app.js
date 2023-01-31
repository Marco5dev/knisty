/// website controll panel
// requires
const express = require("express");
const mongoose = require("mongoose");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const path = require("path");
const Storys = require("./models/storysSchema");
const About = require("./models/aboutSchema");
const { isAbsolute } = require("path");

// express sittings
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("public/images"));
app.use(
  express.urlencoded({
    extended: true
  })
);

// for auto refresh in localhost
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose sittings
const dbname = "church";
const db = `proccess.env.DB`;
mongoose
  .connect(db)
  .then(result => {
    // express
    app.listen(process.env.PORT || port, () => {
      console.log(`Knisty App is listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

/// pages
// HOME
app.get("/", (req, res) => {
  res.render("home", {
    mytitle: "قصص الاباء البطاركة كاملة"
  });
});

// ABOUT
app.get("/about-me", (req, res) => {
  About.find()
    .then(result => {
      res.render("about", {
        mytitle: "About Me",
        arrAbout: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// STORYS
app.get("/storys", (req, res) => {
  Storys.find()
    .then(result => {
      res.render("storys-control-panel", {
        mytitle: "جميع القصص",
        arrStory: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

// DYNAMIC STORYS LINK
app.get("/storys/:id", (req, res) => {
  const id = req.params.id;

  Storys.findById(id)
    .then(result => {
      res.render("story", {
        mytitle: result.title,
        arrStory: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//  404 page
app.use((req, res) => {
  res.status(404).render("404", {
    mytitle: "404 page not found"
  });
});
