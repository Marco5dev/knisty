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
const db = `mongodb+srv://mark:marco@marcodb.awz9vmu.mongodb.net/${dbname}?retryWrites=true&w=majority`;
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

// add new story controlers
app.get("/add-new-story", (req, res) => {
    res.render("add-new-story", {
      mytitle: "create new story"
    });
  });
  app.post("/add-new-story", (req, res) => {
    const storys = new Storys(req.body);
  
    storys
      .save()
      .then(result => {
        res.redirect("/storys");
        console.log(`New story had been sent to ${dbname} Database`);
      })
      .catch(err => {
        console.log(err);
      });
  });

// Sitemap
app.get('/sitemap.xml', (req, res) => {
  res.set('Content-Type', 'application/xml');
  res.send(`
<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://knisty.repl.co/</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/add-new-story</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/about-me</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/630212a06593a02b0903e8df</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056d01dbc79384f0746e88</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056dc333eb1f5970561d6c</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056e2333eb1f5970561d70</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056e6b33eb1f5970561d73</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056eaa33eb1f5970561d76</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056efb33eb1f5970561d79</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056f6133eb1f5970561d7c</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056fa733eb1f5970561d7f</loc>
  </url>
  <url>
    <loc>https://knisty.repl.co/storys/63056fed33eb1f5970561d82</loc>
  </url>
</urlset>
  `);
});

//  404 page
app.use((req, res) => {
  res.status(404).render("404", {
    mytitle: "404 page not found"
  });
});
