const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

app.set('views', './views');
app.set("view engine", "ejs");
//Middleware parsing the buffer

app.use(express.urlencoded({ extended: true }));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//function to generate random alphanumeric combination that is 6 characters long
function generateRandomString() {
  const alphaNumbericString = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const alphaNumbericCombo = [];
  
  for (let i = 0; i < 6; i++){
    let result = alphaNumbericString[Math.floor(Math.random() * alphaNumbericString.length)]
    alphaNumbericCombo.push(result);
  };
  return alphaNumbericCombo.join('');
};


//Routes

//Home

app.get("/", (req, res) => {
  res.render("Hello!");
});

//MyURLs

app.get('/urls', (req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render('urls_index', templateVars);
});

//Create new URL

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

//Open URL by their short URL ID
app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// Redirect to longURL corresponding to short URL :id
app.get('/u/:id', (req, res) => {
  const longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

// Create short URL
app.post('/urls', (req, res) => {
  console.log(req.body);
  urlDatabase[generateRandomString()] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

