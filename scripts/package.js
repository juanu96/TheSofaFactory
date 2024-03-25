import AdmZip from 'adm-zip'
import fs from 'fs'

var zip = new AdmZip();

  // find all files
// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
      const name = `${dir}/${file}`;
      if(
        name.includes('node_modules') || 
        name.includes('.git') || 
        name.includes('src') || 
        name.includes('.vscode') ||
        name.includes('scripts') || 
        name.includes('public') ||
        name.includes('README.md') || 
        name.includes('.gitignore') || 
        name.includes('package.json') || 
        name.includes('package-lock.json') ||
        name.includes('postcss.config.js') ||
        name.includes('tailwind.config.js') || 
        name.includes('vite.config.js') || 
        name.includes('index.html')
      ) continue;
      // Check if the current file/directory is a directory using fs.statSync
      if (fs.statSync(name).isDirectory()) {
        // If it is a directory, recursively call the getFiles function with the directory path and the files array
        zip.addLocalFolder(name, name)
      } else {
        // If it is a file, push the full path to the files array
        zip.addLocalFile(name)
      }
  }
  return files;
}

// add all files & folders to the Zip
getFiles('.')

// create Zip
if(process.argv[2]) {
  zip.writeZip(`./${process.argv[2]}.zip`)
} else {
  zip.writeZip("./plugin.zip")
}


// delete dist folder
fs.rmSync('./plugin-dist', { recursive: true, force: true })
fs.rmSync('./dist', { recursive: true, force: true })