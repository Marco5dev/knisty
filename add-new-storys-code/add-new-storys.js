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