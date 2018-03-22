#! /usr/bin/env node
'use strict';

const fs = require('fs');
const chalk = require('chalk');

import Tokenizer from "./src/Tokenizer.js";
import ASTParser from "./src/ASTParser.js";

const args = process.argv;
const [nodeLocation, karcLocation, ...options] = args;

const entryPoint = options.length != 0
  ? options[0]
  : 'index.js';
  
if (fs.existsSync(entryPoint)) {
  //try {
    let tokens = Tokenizer.parse(fs.readFileSync(entryPoint, 'utf8'));
	console.log("\n--- Tokens ----------\n");
	console.log(tokens);
	console.log("\n--- AST ----------\n");
	let ast = ASTParser.parse(tokens);
	console.log(ast);
  //} catch (e) {
    //printError(e);
  //}
} else{
  printError(`Could not find the entry point \`${chalk.magenta(entryPoint)}\``)  
}

function printError(err) {
  console.log(`${chalk.red('Error')} ${err}`);
}