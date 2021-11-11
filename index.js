"use strict";

const { program } = require('commander');
const fetch = require('node-fetch');

program.version('0.0.1');

function myParseInt(value) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

program
  .command('list')
  .option('-p, --page <page_number>', 'page number', myParseInt)
  .option('-s, --size <page_size>', 'page size', myParseInt)
  .action(({page, size}) => {
    page = page || 1;
    size = size || 100;
    fetch(`http://localhost:4000/api/fizz-buzz?page=${page}&page_size=${size}`)
    .then(result => result.json())
    .then(console.log)
  });

program
  .command('like')
  .option('-n, --number <number>', 'number', myParseInt)
  .action(({number}) => {
    fetch(`http://localhost:4000/api/fizz-buzz`, {
      method: "POST",
      body: JSON.stringify({number: number.toString()}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(result => result.json())
    .then(console.log)
  });

program.parse();