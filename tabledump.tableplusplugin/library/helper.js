"use strict";

function dumpTableAsDefinition(context, item) {
  context.itemDefinition(item, function(creation) {
    SystemService.insertToClipboard(creation);
    SystemService.notify(
      "Copy creation",
      item.type() + " " + item.name() + " creation statement is copied!"
    );
  });
}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w|_\w)/g, function(letter, index) {
      return letter.toUpperCase();
    })
    .replace(/\s+|-|_/g, "");
}

function getColumnMigrate(columnName, dataType, isNullable, defaultVal, extra, columnComment) {
  var typeArr = dataType.split("(");
  var typeOnly = typeArr[0];
  var typeLength = "";
  if (typeArr.length > 1) {
    typeLength = typeArr[1];
  }
  var migration = "";
  switch (typeOnly) {
    case "varchar":
      if (typeLength.length > 0) {
        migration = "$table->string('" + columnName + "', " + typeLength + "";
      } else {
        migration = "$table->string('" + columnName + "')";
      }
      break;
    case "float":
    case "double":
    case "decimal":
      if (typeLength.length > 0) {
        // Pretty length format: 8,2) => 8, 2)
        typeLength = typeLength.replace(",", ", ");
        migration =
          `$table->${typeOnly}('` + columnName + "', " + typeLength + "";
      } else {
        migration = `$table->${typeOnly}('` + columnName + "')";
      }
      break;
    case "float4":
    case "float8":
      migration = "$table->float('" + columnName + "')";
      break;
    case "char":
      migration = "$table->char('" + columnName + "', " + typeLength + "";
      break;
    case "enum":
      typeLength = typeLength.substring(0, typeLength.length - 1);
      migration = "$table->enum('" + columnName + "', [" + typeLength + "])";
      break;
    case "int8":
    case "bigint":
      migration = "$table->bigInteger('" + columnName + "')";
      break;
    case "int":
    case "int4":
      migration = "$table->integer('" + columnName + "')";
      break;
    case "int3":
    case "mediumint":
      migration = "$table->mediumInteger('" + columnName + "')";
      break;
    case "int2":
    case "smallint":
      migration = "$table->smallInteger('" + columnName + "')";
      break;
    case "int1":
    case "tinyint":
      migration = "$table->tinyInteger('" + columnName + "')";
      break;
    default:
      migration = `$table->${typeOnly}('` + columnName + "')";
      break;
  }
  if (dataType.includes("unsigned")) {
    migration += "->unsigned()";
  }
  
  if (isNullable.toLowerCase().startsWith("y")) {
    migration += "->nullable()";
  }
  
  if (defaultVal) {
    migration += "->default(" + defaultVal + ")";
  }
    
  if (extra) {
    switch (extra) {
      case "auto_increment":
        migration += "->autoIncrement()";
        break;
    }
  }
  
  if (typeof columnComment != 'undefined' && columnComment) {
    migration += "->comment('" + columnComment.trim() + "')";
  }

  return migration + ";";
}

function dumpTableAsLaravel(context, item) {
  var nameCamelcase = camelize(item.name());
  var header = `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

/**
 * Migration auto-generated by TablePlus ${Application.appVersion()}(${Application.appBuild()})
 * @author https://tableplus.com
 * @source https://github.com/TablePlus/tabledump
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('${item.name()}', function (Blueprint $table) {
`;
  var columnNames = [];
  var columnTypes = [];
  var isNullables = [];
  var defaultVals = [];
  var columnComments = [];
  var extras = [];
  var query;
  var driver = context.driver();
  switch (driver) {
    case "MySQL":
    case "MariaDB":
      query = `SELECT ordinal_position as ordinal_position,column_name as column_name,column_type AS data_type,is_nullable as is_nullable,column_default as column_default,extra as extra,column_name AS foreign_key,column_comment AS comment FROM information_schema.columns WHERE table_schema='${item.schema()}'AND table_name='${item.name()}';`;
      break;
    case "PostgreSQL":
      query = `SELECT ordinal_position,column_name,udt_name AS data_type,numeric_precision,datetime_precision,numeric_scale,character_maximum_length AS data_length,is_nullable,column_name as check,column_name as check_constraint,column_default,column_name AS foreign_key,pg_catalog.col_description(16402,ordinal_position) as comment FROM information_schema.columns WHERE table_name='${item.name()}'AND table_schema='${item.schema()}';`;
      break;
    default:
      context.alert("Error", driver + " is not supported");
      return;
  }
  context.execute(query, res => {
    res.rows.sort((l, r) => {
      return (
        parseInt(l.raw("ordinal_position")) >
        parseInt(r.raw("ordinal_position"))
      );
    });
    
    res.rows.forEach(row => {
      let columnName = row.raw("column_name");
      let columnType = row.raw("data_type");
      let isNullable = row.raw("is_nullable");
      let defaultVal = row.raw("column_default");
      let extra = row.raw("extra");
      columnNames.push(columnName);
      columnTypes.push(columnType);
      isNullables.push(isNullable);
      defaultVals.push(defaultVal);
      extras.push(extra);
      columnComments.push(row.raw("comment"));
    });
    
    var result = header;
    
    for (let i = 0; i < columnNames.length; i++) {
      var columnMigrate = getColumnMigrate(
        columnNames[i],
        columnTypes[i],
        isNullables[i],
        defaultVals[i],
        extras[i],
        columnComments[i]
      );
      result += `            ${columnMigrate}\n`;
    }
    result += `        });
    }
   
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('${item.name()}');
    }
}
`;
    SystemService.insertToClipboard(result);
    SystemService.notify(
      "Laravel export",
      item.type() + " " + item.name() + " export statement is copied!"
    );
  });
}

export { dumpTableAsDefinition, dumpTableAsLaravel };
