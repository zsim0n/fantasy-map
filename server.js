const express = require('express')
const app = express()
const path = require( "path" )
const fs = require('fs')
const formidable = require('formidable')

var PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT ||  3000
var ADDRESS = process.env.OPENSHIFT_NODEJS_IP || process.env.HOST ||  '127.0.0.1'
var PROJECT =  process.env.PROJECT || 'project/demo'
var projectPath = path.join(__dirname, PROJECT)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/maptiles', express.static(path.join(projectPath, 'maptiles')))
app.use('/images', express.static(path.join(projectPath, 'images')))
app.use('/places.md', express.static(path.join(projectPath, 'places.md')))
app.use('/readme.md', express.static(path.join(__dirname, 'README.md')))

app.use(function (req, res, next) {
  var form = new formidable.IncomingForm({
      encoding: 'utf-8',
      uploadDir:  path.join(projectPath, '/images'),
      multiples: true,
      keepExtensions: true
  })
  form.once('error', console.log)
  form.parse(req, function (err, fields, files) {
      if (err) {
        next(err);
        return;
      }
      Object.assign(req, {fields, files});
      next();
  })
})

app.post('/save', (req, res) => {
  var fileContent = req.fields.md;
  var filePath = path.join(projectPath, 'places.md');
    fs.writeFile(filePath, fileContent , function(err) {
      if (err) {
        return res.status(500).send('Failed to save places');
      } 
      res.send("Places was succesfully saved!");
    });
});

app.post('/upload', (req, res) => {
  res.type('json');
  res.json({filename:'/images/'+path.basename(req.files.file.path)})
})

app.listen(PORT, ADDRESS, () => console.log('Example app listening on '+ ADDRESS + ':' + PORT + '!'))

