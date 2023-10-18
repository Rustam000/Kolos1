import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomTable({ data, columns }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                sx={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                key={col.dataKey}
                align={col.align}
              >
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
                if (col.dataKey === "rowIndex") {
                  return (
                    <TableCell key={col.dataKey + row._id}>
                      {rowIndex + 1}
                    </TableCell>
                  );
                }
                if (col.dataKey === "action") {
                  return (
                    <TableCell key={col.dataKey + row._id}>
                      <button onClick={() => col.onClick(row._id)}>
                        {col.icon}
                      </button>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={col.dataKey + row._id}
                    data-cell={`${rowIndex}-${col.dataKey}`}
                  >
                    {row[col.dataKey]}
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
