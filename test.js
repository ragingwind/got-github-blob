import test from 'ava';
import fn from './';
import os from 'os';
import fs from 'fs';
import path from 'path';

function testWithFiles(files) {
	const tmp = os.tmpdir();
	const req = [];

	for (const f of files) {
		req.push(fn(f, tmp));
	}

	return Promise.all(req);
}

test(t => {
	testWithFiles([
		'https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/patch/src/app/scripts/app.js',
		'https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/src/app/scripts/app.js',
		'https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/patch/src/gulpfile.js',
		'https://raw.githubusercontent.com/ragingwind/mobile-chromeapp-starter-kit/patch/src/gulpfile.js',
		'https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/master/src/platform/config.xml'
	]).then(res => {
		for (const r of res) {
			t.ok(fs.lstatSync(r.dest).isFile());
		}
		return this;
	}, () => {
		t.fail('Not found file');
		return  this;
	}).then(() => {
		t.end();
	});
});

test(t => {
	testWithFiles([
		'https://github.com/ragingwind/mobile-chromeapp-starter-kit/tree/master/src',
		'https://github.com/ragingwind/mobile-chromeapp-starter-kit/blob/master/config.xml',
	]).then(dest => {
		t.fail('It can be possible');
		return this;
	}, () => {
		t.pass('Not found file');
		return  this;
	}).then(() => {
		t.end();
	});
});
