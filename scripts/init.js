import { input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { z } from "zod";
import fs from 'fs';
import path from 'path';

let stdin = process.stdin;
stdin.on("data", (key) => {
    if (key == "\u0003") {
      console.log('');
      console.log('');
      console.log(chalk.hex('#DC4933')('-------------------------------------------'));
      console.log(chalk.hex('#DC4933')('Init script cancelled.'));
      console.log(chalk.hex('#DC4933')('-------------------------------------------'));
      console.log('');
      console.log('');
      process.exit();
    }
});

const intro = () => {
  console.log(chalk.hex('#61DBFB')('Welcome to the WordPress React Vite Plugin (WRVP) setup tool'));
  console.log(chalk.hex('#0E728D')('This tool will help you setup your project'));
  console.log('');
}

const nameSelector = async () => {

  console.log(chalk.hex('#FAC863')('Your plugin name must be between 5 and 15 characters long and contain only letters (NoSpaces). after the name has been assigned this tool will replace all instances of the name in the project with the name you have chosen. Including PHP clasess, main WordPress shortcode, and javascript variables + selectors.'));
  console.log(chalk.hex('#FAC863')('Please select a name for your plugin:'));
  console.log('');
  const answer = await input({ message: chalk.hex('#8DC891')('Enter the plugin name:') });

  const appNameSchema = z
  .string({ message: "Name must be a string" })
  .min(5, { message: "Name must be between 5 and 15 characters" })
  .max(15, { message: "Name must be between 5 and 15 characters" })
  .regex(/^[a-z]+$/i, { message: "Name must contain only letters (No numbers or spaces)" });

  const appName = appNameSchema.safeParse(answer);

  if (!appName.success) {
      appName.error.issues.forEach((issue) => {
          console.log(chalk.hex('#DC4933')(issue.message));
          console.log('');
      });
      nameSelector();
  } else {
      console.log('');
      console.log(chalk.hex('#8DC891')('Your plugin name is: ') + chalk.hex('#FAC863')(appName.data));
      console.log(chalk.hex('#FAC863')('Are you sure you want to use this name?'));
      const answer = await confirm({ message: chalk.hex('#8DC891')('Enter Y or N:') });
      if(!answer) {
        nameSelector();
      } else {
        nameReplace(appName.data);
      }
  }

}

const nameReplace = async (appName) => {
  const walk = dir => {
    try {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
          // Recurse into subdir
          if(
            !file.includes('node_modules') || 
            !file.includes('.git')
          ) results = [...results, ...walk(file)];
        } else {
          // Is a file
          if(
            file.includes('react_wp.php') || 
            file.includes('plugin_options.php') || 
            file.includes('main.jsx') ||
            file.includes('tailwind.config.js')
          ) results.push(file);
        }
      });
      return results;
    } catch (error) {
      console.error(`Error when walking dir ${dir}`, error);
    }
  };
  
  const edit = filePath => {
    const oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});
    const regex = /WPReact/g;
    const replaceVal = appName;
    const newContent = oldContent.replace(regex, replaceVal);
    fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
    console.log(chalk.hex('#61DBFB')(`Edited file: ${filePath}`));
  };
  
  const main = () => {
    const dir = './';
    const filePaths = walk(dir);
    filePaths.forEach(filePath => edit(filePath));
    console.log('');
    console.log('');
    console.log(chalk.hex('#8DC891')('The plugin name and files have been set to: ') + chalk.hex('#FAC863')(appName));
    console.log(chalk.hex('#8DC891')('Init process complete! Happy coding!'));
    console.log('');
  };
  
  main();
}


(() => {
  intro();
  nameSelector();
})();

