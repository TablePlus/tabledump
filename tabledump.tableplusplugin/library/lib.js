// Get current table struct
function getTableStruct(context, item, callback){
    let driver = context.driver();
    let query = "";
    switch (driver) {
      case "MySQL":
        query = `SELECT ordinal_position as ordinal_position,column_name as column_name,column_type AS data_type,is_nullable as is_nullable,column_default as column_default,extra as extra,column_name AS foreign_key,column_comment AS comment FROM information_schema.columns WHERE table_schema='${item.schema()}'AND table_name='${item.name()}';`;
        break;
      case "PostgreSQL":
        query = `SELECT ordinal_position,column_name,udt_name AS data_type,numeric_precision,datetime_precision,numeric_scale,character_maximum_length AS data_length,is_nullable,column_name as check,column_name as check_constraint,column_default,column_name AS foreign_key,pg_catalog.col_description(16402,ordinal_position) as comment FROM information_schema.columns WHERE table_name='${item.name()}'AND table_schema='${item.schema()}';`;
        break;
      case "MicrosoftSQLServer":
        query = `SELECT ordinal_position,column_name,data_type,is_nullable,column_default,NULL extra,NULL foreign_key,NULL comment FROM information_schema.columns WHERE table_name='${item.name()}' AND table_catalog = '${item.schema()}';`
        break;
      default:
        context.alert("Rrror", driver + " is not supported");
        return;
    }
    context.execute(query, res => {
        // sort result 
        res.rows.sort((l, r) => {
            return (
                parseInt(l.raw("ordinal_position")) >
                parseInt(r.raw("ordinal_position"))
            );
        });
        callback(null, res)
    });
}

export { getTableStruct };