# got-github-blob [![Build Status](https://travis-ci.org/ragingwind/got-github-blob.svg?branch=master)](https://travis-ci.org/ragingwind/got-github-blob)

> Got a blob from github


## Install

```
$ npm install --save got-github-blob
```


## Usage

```js
const gotBlog = require('got-github-blob');

gotBlog('https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/app.js').then(() => {
	//=> save to ./app.js
});

gotBlog('https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/gulpfile.js', './dist').then(() => {
	//=> save to ./dist/gulpfile.js
});

gotBlog('https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/master/src/platform/config.xml').then(() => {
	//=> save to ./src/platform/config.xml
});

gotBlog('https://github.com/ragingwind/mobile-chromeapp-starter-kit/tree/master/src').catch(err => {
	//=> error
});
```


## API

### ghFile(urlOfGithub, [dest])

#### urlOfGithub

Type: `string`

URL of related with github such as github.com and githubusercontent.com

#### dest

Root path for writing

## License

MIT © [ragingwind](http://ragingwind.me)
