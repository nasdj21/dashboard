import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from "../interface/item";
import { useEffect, useState } from 'react';

interface MyProp{
  itemsln: Item[];
}





export default function BasicTable(props: MyProp) {

  let[rows, setRows] = useState<Item[]>([]);

  useEffect( () => {
    setRows(props.itemsln)
  }, [props])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>Intervalo horario</TableCell>
            <TableCell align="center">Precipitación</TableCell>
            <TableCell align="center">Humedad</TableCell>
            <TableCell align="center">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.intervaloHorario}
              </TableCell>
              <TableCell align="center">{row.precipitation}</TableCell>
              <TableCell align="center">{row.humidity}</TableCell>
              <TableCell align="center">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}