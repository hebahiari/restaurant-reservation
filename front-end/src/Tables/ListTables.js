import React from "react";
import TableCard from "./TableCard";

function ListTables({ tables }) {
  let mapped = tables.map((table) => <TableCard key={table.table_id} table={table} />);

  return <div >{mapped}</div>;
}

export default ListTables;
