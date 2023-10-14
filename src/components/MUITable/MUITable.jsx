import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ data, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} align={col.align}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((col) => {
                if (col.id === "index") {
                  return (
                    <TableCell key={col.id + row._id}>{rowIndex + 1}</TableCell>
                  );
                }
                if (col.id === "action") {
                  return (
                    <TableCell key={col.id + row._id}>
                      <button onClick={() => col.onClick(row._id)}>
                        {col.icon}
                      </button>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={col.id + row._id}
                    data-cell={`${rowIndex}-${col.id}`}
                  >
                    {row[col.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
