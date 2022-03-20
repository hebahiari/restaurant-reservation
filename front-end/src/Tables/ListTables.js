import React from "react";
import TableCard from "./TableCard";

function ListTables({ tables }) {
  let mapped = tables.map((table) => <TableCard table={table} />);

  return <div>{mapped}</div>;
}

export default ListTables;
