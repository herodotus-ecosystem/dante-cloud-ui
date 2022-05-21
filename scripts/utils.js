const fs = require('fs');
const path = require('path');

const join = path.join;
const resolve = (dir) => join(__dirname, '../', dir);

function getFiles(folders, regex) {
    if (!Array.isArray(folders)) {
        folders = [folders];
    }

    return folders.reduce((array, folder) => {
        let files = fs.readdirSync(folder);

        if (!files.length) return [];

        files = files.reduce((array, file) => {
            let result = [];
            const filePath = join(folder, file);

            regex.test(file) && result.push(filePath);

            // if is directory
            if (fs.statSync(filePath).isDirectory()) {
                result = result.concat(getFiles(filePath, regex));
            }

            return array.concat(result);
        }, []);

        return array.concat(files);
    }, []);
}

function getEntries(folders, regex) {
    let files = getFiles(folders, regex);

    let entries = files.reduce((obj, file) => {
        return Object.assign(obj, {
            [path.basename(path.dirname(file))]: './' + file
        });
    }, {});

    return entries;
}

function assignObject(params = {}, defaultParams = {}) {
    if (params && Object.keys(params).length > 0) {
        return Object.assign(defaultParams, params);
    } else {
        return defaultParams;
    }
}

function assignArray(params = [], defaultParams = []) {
    if (params && params.length > 0) {
        return params.concat(defaultParams);
    } else {
        return defaultParams;
    }
}

module.exports = { path, resolve, getFiles, getEntries, assignObject, assignArray };
