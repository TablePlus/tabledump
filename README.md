# TableDump Plugin for TablePlus

This is a TablePlus's Plugin, by install `tabledump` you will have a menu `Copy Script As` in context menu.

This fork includes support for Phinx migrations, and will also export any indexes and foreign keys associated with the chosen table.

![tabledump](https://github.com/TablePlus/tabledump/blob/master/images/export-laravel.gif "tabledump")

## Support

TablePlus build 200 and above.

## Install

### From release

Install via Plugin Manager: `command + L`

### Build from source

```console
git clone git@github.com:TablePlus/tabledump.git
cd tabledump/tabledump.tableplusplugin
npm install
npm run build
open .
```

## How to use

1. Open a connection.
2. Right on a item in left panel.
3. Select `Copy Script As` in menu.

## License

tabledump is released under the MIT license. See [LICENSE](https://github.com/TablePlus/DummiesData/blob/master/LICENSE) for details.
