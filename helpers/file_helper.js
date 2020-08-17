const fs = require('fs');
const path = require('path');

exports.readData = function(reader) {
    fs.readFile(path.resolve(__dirname, "../helpers/file_helper.js"), 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return;
        }
        try {
            return reader = JSON.parse(jsonString)
    } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    });
}
