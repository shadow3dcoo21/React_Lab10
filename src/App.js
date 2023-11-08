import React, { Component } from 'react';
import './App.css';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper'; 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false
    };
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/Productos/v1/productos/')
      .then((response) => {
        return response.json();
      })
      .then((prod) => {
        this.setState({ 
          productos: prod,
          recuperado: true
        });
      });
  }

  render() {
    if (this.state.recuperado)
      return this.mostrarTabla();
    else
      return (<div>Recuperando datos...</div>);
  }

  mostrarTabla() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Código</TableCell>
              <TableCell align="left">Descripción</TableCell>
              <TableCell align="left">Precio</TableCell>
            </TableRow >
          </TableHead>
          <TableBody>
            {this.state.productos.map(prod => (
              <TableRow key={prod.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{prod.codigo}</TableCell>
                <TableCell align="left">{prod.descripcion}</TableCell>
                <TableCell align="left">{prod.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default App;

