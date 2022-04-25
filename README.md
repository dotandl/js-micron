# js-micron

[![NPM](https://nodei.co/npm/js-micron.png?compact=true)](https://npmjs.com/package/js-micron)

[![Continuous Integration](https://github.com/dotandl/js-micron/actions/workflows/CI.yml/badge.svg)](https://github.com/dotandl/js-micron/actions/workflows/CI.yml)

JS minifying tool drastically reducing the size of scripts.
Inspired by [JS Crush](http://www.iteral.com/jscrush/).

## Installation

- Global installation:

```sh
$ npm install -g js-micron
```

- Local installation:

```sh
$ npm install js-micron

# Dev-dependency
$ npm install -D js-micron
```

## How does it work?

`js-micron` passes your code through [`uglify-js`](https://www.npmjs.com/package/uglify-js)
in order to compress & optimize the code. Then repeated chunks of code are found
and replaced with shorter tokens.

Example:

```js
const hello = 'Hello world!';
const name = prompt('What\'s your name?');
console.log(hello);
console.log('Your name is', name);
console.log('Goodbye world!');
```

Result of `uglify-js`'s work will be something like:

```js
var o = prompt('What\'s your name?');
console.log('Hello world!');
console.log('Your name is', o);
console.log('Goodbye world!');
```

As you can see, `const` has been replaced with `var` (because it's shorter),
`name` has been changed to `o` (shorter variable name) and variable `hello` is
known at compile-time, so it has been removed completely.

Then repeated chunks are being replaced with tokens:

```js
var o = prompt('What\'s your <01>?');
<02>('Hello <03>!');
<02>('Your <01> is', o);
<02>('Goodbye <03>!');
```

where <XX> are non-printable characters (tokens) (XX is the hexadecimal number
of the character).

Then code is minified:

```js
var o=prompt('What\'s your <01>?');<02>('Hello <03>!');<02>('Your <01> is',o);<02>('Goodbye <03>!');
```

And the last step - replaced chunks and decompressing code is added:

```js
_="var o=prompt('What\'s your <01>?');<02>('Hello <03>!');<02>('Your <01> is',o);<02>('Goodbye <03>!')<01>name<02>console.log<03>name";for($ of "<03><02><01>")with(_.split($))_=join(pop());eval(_)
```

Of course in this case compression is not effective, but in larger projects
result can be impressive.

## CLI

Usage: `[npx] js-micron [OPTIONS] <INPUT FILE> <OUTPUT FILE>`

Options:

- `-h`, `--help` Displays help
- `-V`, `--version` Displays `js-micron`'s version
- `-v`, `--verbose` Verbose output

## In-code usage

```js
// ES6
import { compress } from 'js-micron';
// CommonJS
const { compress } = require('js-micron');

const input = `console.log('Hello world!');`;
const output = compress(input);
```
