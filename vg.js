var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    spawn = require('child_process').spawn;

http.createServer(function(req, res) {
    var file = {
            path: '.' + req.url,
            ext: path.extname(req.url),
            type: '',
            exts: [
                '.html',
                '.js',
                '.css',
                '.ico',
                '.png',
                '.gif',
                '.jpg',
                '.svg',
                '.json',
                '.ttf',
                '.woff',
                '.woff2',
                '.eot',
                '.otf'
            ],
            types: [
                'text/html',
                'text/javascript',
                'text/css',
                'image/x-icon',
                'image/png',
                'image/gif',
                'image/jpeg',
                'image/svg+xml',
                'application/json',
                'application/x-font-ttf',
                'application/font-woff',
                'application/font-woff2',
                'application/vnd.ms-fontobject',
                'application/x-font-opentype'
            ]
        },
        indexOf = file.exts.indexOf(file.ext);
    if (indexOf < 0) {
        file.type = file.types[0];
        file.path = file.path.replace(/\/$/, '') + '/index.html';
    } else
        file.type = file.types[indexOf];
    fs.readFile(file.path, function(error, content) {
        if (error) {
            console.log(error.code + ': ' + error.path);
            if (error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    res.writeHead(200, { 'Content-Type': file.type });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': file.type });
            res.end(content, 'utf-8');
        }
    });
}).listen(80);

var downloadFile = function(file_url, save_dir, cb) {
    var file_name = path.basename(file_url);
    var file_path = save_dir + file_name;
    if (!fs.existsSync(file_path)) {
        var file = fs.createWriteStream(file_path);
        var curl = spawn('curl', ['-L', file_url]);
        curl.stdout.on('data', function(data) { file.write(data); });
        curl.stdout.on('end', function(data) {
            file.end();
            console.log(file_name + ' downloaded to ' + save_dir);
            if (cb)
                cb();
        });
        curl.on('exit', function(code) {
            if (code != 0) {
                console.error('Failed: ' + code);
            }
        });
    } else if (cb)
        cb();
};

// downloadFile('https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vuex/dist/vuex.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js');
(function() {
    var DOWNLOAD_DIR = './dl/';
    downloadFile('https://cdn.jsdelivr.net/npm/mustache/mustache.min.js', DOWNLOAD_DIR, function() {
        var mustache = require('./dl/mustache.min.js');
        var json = fs.readFileSync('./env/prod/prod.json', 'utf8'),
            html = fs.readFileSync('./env/index.mustache', 'utf8');
        html = mustache.to_html(html, JSON.parse(json));
        fs.writeFile('./index.html', html, function(err) {
            if (err)
                return console.log(err);
        });
    });
}());


