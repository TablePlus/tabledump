import { getTableStruct } from './lib';

// check data_type and return value
function checType(type){
    type = type && type.toLowerCase();
    if (type.indexOf('char') >= 0 || type.indexOf('text') >= 0) return "";
    if (type.indexOf('int') >= 0 || type.indexOf("al")) return 0;
    if (type.indexOf('bool') >= 0) return true;
    if (type.indexOf('time') >= 0 || type.indexOf('year') >= 0 || type.indexOf('date') >= 0) return new Date();
    return null;
}

// Cory as JSON
function copyAsJSON(context, item){
    let obj = {};
    getTableStruct(context, item, (err, res) => {
        for (let row of res.rows) {
            obj[row.raw("column_name")] = checType(row.raw("data_type"));
        }
        SystemService.insertToClipboard(JSON.stringify(obj, null, 4));
        SystemService.notify(
          "JSON export",
          item.type() + " " + item.name() + " export statement is copied!"
        );
    });
};

export { copyAsJSON };