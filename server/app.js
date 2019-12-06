var createError = require("http-errors");
var express = require("express");
var json = express.json;
var urlencoded = express.urlencoded;

var join = require("path").join;
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var accountRouter = require("./routes/accountRouter");
var postRouter = require("./routes/postRouter");
var pingRouter = require("./routes/ping");

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use(accountRouter);
app.use(postRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
