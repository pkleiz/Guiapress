const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article.js");
const Category = require("./categories/Category.js");

//View engine
app.set("view engine", "ejs");

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso");
  })
  .catch((error) => {
    res.render("index");
  });

app.use("/", categoriesController);
app.use("/", articlesController);

//static
app.use(express.static("public"));

app.get("/", (req, res) => {
  Article.findAll().then((articles) => {
    res.render("index", { articles: articles });
  });
});

app.listen(8080, () => {
  console.log("O servidor está rodando!");
});
