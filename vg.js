var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    spawn = require('child_process').spawn,
    webfont = require('webfont').default,
    mustache = require('mustache');

if (webfont) {
    webfont({
        files: './**/*.ttf',
        fontName: 'webfonts'
    }).then(result => {
        console.log(result);
    });
}

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

var downloadFile = function(file_url, path, cb) {
    var file_name = url.parse(file_url).pathname.split('/').pop();
    if (!fs.existsSync(path + file_name)) {
        var file = fs.createWriteStream(path + file_name);
        var curl = spawn('curl', ['-L', file_url]);
        curl.stdout.on('data', function(data) { file.write(data); });
        curl.stdout.on('end', function(data) {
            file.end();
            console.log(file_name + ' downloaded to ' + path);
            if (cb)
                cb();
        });
        curl.on('exit', function(code) {
            if (code != 0) {
                console.log('Failed: ' + code);
            }
        });
    } else if (cb)
        cb();
};

// downloadFile('https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vuex/dist/vuex.js');
// downloadFile('https://cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js');
if (mustache) {
    var json = fs.readFileSync('./dist/env/index/prod.json', 'utf8'),
        header = fs.readFileSync('./dist/template/pages/_header.mustache', 'utf8'),
        footer = fs.readFileSync('./dist/template/pages/_footer.mustache', 'utf8'),
        html = fs.readFileSync('./dist/template/pages/index.mustache', 'utf8');
    html = mustache.to_html(header + html + footer, JSON.parse(json));
    fs.writeFile('./dist/pages/index.html', html, function(err) {
        if (err)
            return console.log(err);
    });
}