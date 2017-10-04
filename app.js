let express = require('express')
let path = require('path')
let favicon = require('serve-favicon')
let logger = require('morgan')
let cookieParser = require('cookie-parser')
let bodyParser = require('body-parser')
let sassMiddleware = require('node-sass-middleware')
let hbs = require('express-handlebars')
const compression = require('compression')
let index = require('./routes/index')
let users = require('./routes/users')

let app = express()
// app.use(sslRedirect(['test', 'production']))
app.disable('x-powered-by')
app.use(compression())
let exphbs = hbs.create({
  extname: 'hbs', defaultLayout: 'layout', helpers: {
    section: function (name, options) {
      if (!this._sections) {
        this._sections = {}
      }
      this._sections[name] = options.fn(this)
      return null
    },
    increment: function (index) {
      return index + 1
    },
    formatDate: function (date) {
      return moment(date).format('L')

    },
    formatDateTime: function (date) {
      return moment(date).format('LLL')

    },
    printCode: function (code) {
      return JSON.stringify(code, null, 2)
    },
    ifCond: function (v1, operator, v2, options) {

      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this)
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this)
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this)
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this)
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this)
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this)
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this)
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this)
        default:
          return options.inverse(this)
      }
    },
    printYesOrNo: function (isTrue) {
      return (isTrue) ? 'Yes' : 'No'
    }
  }
})
app.engine('hbs', exphbs.engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
