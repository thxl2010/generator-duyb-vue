const fs = require('fs');
const path = require('path');
const glob = require('glob');

function getGlobFiles(pattern) {
  glob(pattern, (err, files) => {
    console.log(files);
  });
}

getGlobFiles('../generators/app/templates/**/*');
// getGlobFiles('../**/*');
