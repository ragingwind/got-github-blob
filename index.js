'use strict';

const got = require('got');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const pathize = require('pathize-github-url');

module.exports = function (filepath, dest) {
	if (!filepath) {
		throw new Error('No files to got');
	}

	return new Promise((resolve, reject) => {
		let file = pathize(filepath);

		if (!file || !/^(raw.githubusercontent.com|github.com)/.test(file.root)) {
			return reject(new TypeError('URL is not a type of github url'));
		} else if (file.type !== 'blob') {
			return reject(new TypeError('No blob url is not allowed'));
		}

		dest = path.resolve(process.cwd(), dest || process.cwd());

		// replace it with the url of github raw
		if (file.root === 'github.com') {
			file = pathize([
				'https://raw.githubusercontent.com',
				file.username,
				file.repo,
				file.branch,
				(file.dir === '' ? file.base : [file.dir, file.base].join('/'))
			].join('/'));
		}

		file.dest = path.join(dest, file.dir, file.base);

		mkdirp(path.dirname(file.dest), err => {
			if (err) {
				return reject(err);
			}

			got.stream(file.url.href).on('error', err => {
				reject(err);
			}).pipe(fs.createWriteStream(file.dest)).on('close', () => {
				resolve(file);
			}).on('error', err => {
				reject(err);
			});
		});
	});
};
