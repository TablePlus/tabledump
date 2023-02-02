'use strict';

function dumpTableAsDefinition(context, item) {
  context.itemDefinition(item, function (creation) {
    SystemService.insertToClipboard(creation);
    SystemService.notify(
      "Copy creation",
      item.type() + " " + item.name() + " creation statement is copied!"
    );
  });
}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_\w)/g, function (letter, index) {
      return letter.toUpperCase();
    })
    .replace(/\s+|-|_/g, "");
}

export { dumpTableAsDefinition, camelize };
