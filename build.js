const fs = require('fs');
const fetch = require('node-fetch');
const { builtinModules } = require('module');
const fse = require('fs-extra');
const { title } = require('process');
var JavaScriptObfuscator = require('javascript-obfuscator');

var data = {};

// fetch data
readFolder(data, 'blog');

if (!fs.existsSync('./public/article')) {
  fs.mkdirSync('./public/article', 0744);
}

fse.copySync('./src/tpl/style.css', './public/style.css');

// console.log(data.blog);

var head = fs.readFileSync('./src/tpl/header.html').toString().replace('{{title}} - ', '');
var foot = fs.readFileSync('./src/tpl/footer.html').toString();

var body = `<h1>ZompLab</h1>`;
data.blog.forEach(function(myitem){

body += `<a class="article-list" href="/article/${myitem.slug}">${readableTitle(myitem.slug)}</a>`;

});

var page = head + body + foot;

fs.writeFileSync('./public/index.html', page);

data.blog.forEach(function(myitem){

  let src = './src/article/'+myitem.slug;
  let dest = './public/article/'+myitem.slug;

  // create article folders
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, 0744);
    fs.mkdirSync(dest+'/img', 0744);
  }

  var head = fs.readFileSync('./src/tpl/header.html').toString().replace('{{title}}', `${readableTitle(myitem.slug)}`);
  var foot = fs.readFileSync('./src/tpl/footer.html').toString();
  var title = `<h1>${readableTitle(myitem.slug)}</h1>`;
  var page = head + title + myitem.body + foot;

  fs.writeFileSync(dest+'/index.html', page);
     
  // copy images
  if (fs.existsSync(src+'/img/')) {
  fse.copySync(src+'/img/', dest+'/img/');
  }

  if (fs.existsSync(src+'/large/')) {
    fse.copySync(src+'/large/', dest+'/large/');
  }

  if (fs.existsSync(src+'/assets/')) {
    fse.copySync(src+'/assets/', dest+'/assets/');
  }else{
    fs.mkdirSync(dest+'/assets/', 0744);
  }


if (fs.existsSync(src+'/js/scripts.js')) {
// Read the file of your original JavaScript Code as text
fs.readFile(src+'/js/scripts.js', "UTF-8", function(err, data) {
    if (err) {
        throw err;
    }

    // Obfuscate content of the JS file
    var obfuscationResult = JavaScriptObfuscator.obfuscate(data);
    
    // Write the obfuscated code into a new file
    fs.writeFile(dest+'/assets/bundle.js', obfuscationResult.getObfuscatedCode() , function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
});
}

})


/* --- helpers --- */

function readFolder(data, folder){
  const myFolder = './src/article/';

  data[folder] = [];
  fs.readdirSync(myFolder).forEach(filename => {

  if(filename!=='.DS_Store'){
      var newItem = {}
      newItem.body = fs.readFileSync('./src/article/'+filename+'/body.html').toString();
      newItem.slug = filename;

      // list the images
      newItem.images = [];
      if (fs.existsSync(myFolder+filename+'/img')) {
      fs.readdirSync(myFolder+filename+'/img/').forEach(imgname => {
        if(imgname!=='.DS_Store'){
          newItem.images.push(imgname);

        }
      });
      }

      
      data[folder].push(newItem);
  }
   
   
  
  });
  
  data[folder] = [...data[folder]].reverse();
  return data;
}


function readableTitle(slug){
  let title = slug.replace('-', ' ');
  title = title.split('.')[1];
  title = ucWords(title);
  return title;
}

function ucWords(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}