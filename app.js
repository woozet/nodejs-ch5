var fs = require('fs'),
    async = require('async');

try {
    async.parallel({
        data1: function(callback) {
                   async.waterfall([
                       function readFile(callback) {
                           fs.readFile('./data/data1.txt', 'utf8', function(err, data) {
                               callback(err, data);
                           });
                       },
                       function modify(text, callback) {
                           var adjdata = text.replace(/./, 'K');
                           callback(null, adjdata);
                       },
                       function writeData(data, callback) {
                           fs.writeFile('./data/data1.txt', data, function(err) {
                               callback(err, './data/data1.txt');
                           });
                       }
                   ], function(err, result) {
                       if(err) throw err;
                       console.log('modified ' + result);
                       callback(err, 'modified ' + result);
                   });
               },
        data2: function(callback) {
                   fs.readFile('./data/data2.txt', 'utf8', function(err, data) {
                       callback(err, data);
                   });
               },
        data3: function(callback) {
                   fs.readFile('./data/data3.txt', 'utf8', function(err, data) {
                       callback(err, data);
                   });
               },
    }, function(err, result) {
        if(err) throw err;
        console.log(result);
    });
} catch(err) {
    console.log(err);
}
