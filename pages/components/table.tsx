import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "@/styles/styles";
import { MenuItem } from "./header";

type TableProps = {
  column: string[];
  rows: MenuItem[];
};
const HeaderTable = (props: TableProps): JSX.Element => {
  const { rows, column } = props;
  return (
    <TableContainer className="wallet-table" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Wallet Details
            </TableCell>
          </TableRow>
          <TableRow>
            {column.map((tableHead) => (
              <StyledTableCell key={tableHead}>{tableHead}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow
              key={row.key + index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <StyledTableCell component="th" scope="row">
                {row.key}
              </StyledTableCell>
              <StyledTableCell align="right">{row.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default HeaderTable;
