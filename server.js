const express = require('express')
const app = express()
const path = require( "path" )
const fs = require('fs')
const formidable = require('express-formidable')


var PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT ||  3000
var ADDRESS = process.env.OPENSHIFT_NODEJS_IP || process.env.HOST ||  '127.0.0.1'
var PROJECT =  process.env.PROJECT || 'project/demo'
var projectPath = path.join(__dirname, PROJECT)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/maptiles', express.static(path.join(projectPath, 'maptiles')))
app.use('/images', express.static(path.join(projectPath, 'images')))
app.use('/places.md', express.static(path.join(projectPath, 'places.md')))
app.use('/readme.md', express.static(path.join(__dirname, 'README.md')))

app.use(formidable({
  encoding: 'utf-8',
  uploadDir: path.join(projectPath, 'images'),
  multiples: false // req.files to be arrays of files 
}));

app.post('/save', (req, res) => {
  filepath = path.join(projectPath, 'places.md');
  fileContent = req.fields.md;
  fs.writeFileSync(filepath, fileContent);
  res.send("The file was succesfully saved!");
/*  fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    res.send("The file was succesfully saved!");
  });*/ 
})
app.post('/upload', (req, res) => {
  console.log();
  res.type('json');
  res.json({filename:'/images/'+path.basename(req.files.file.path)})
})

app.listen(PORT, ADDRESS, () => console.log('Example app listening on '+ ADDRESS + ':' + PORT + '!'))
