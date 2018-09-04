var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url'),
    spawn = require('child_process').spawn,
    webfont = require('webfont').default,
    mustache = require('mustache'),
    compressor = require('node-minify');

http.createServer(function(req, res) {
    var file = {
            path: '.' + req.url,
            ext: path.extname(req.url),
            type: ''
        },
        indexOf = exts.indexOf(file.ext);
    if (indexOf < 0) {
        file.type = types[0];
        file.path = file.path.replace(/\/$/, '') + '/index.html';
    } else
        file.type = types[indexOf];
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
if (webfont && !webfont) {
    webfont({
        files: './**/*.ttf',
        fontName: 'webfonts'
    }).then(result => {
        console.log(result);
    });
}
if (compressor) {
    compressor.minify({
        compressor: 'uglify-es',
        input: './dist/vendor/js/*.js',
        output: './dist/vendor/bundle/vendor.min.js',
        callback: function(err, min) {
            console.log('MINIFIED JS');
        }
    });
    compressor.minify({
        compressor: 'crass',
        input: './dist/vendor/css/*.css',
        output: './dist/vendor/bundle/vendor.min.css',
        callback: function(err, min) {
            console.log('MINIFIED CSS');
        }
    });
}