import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {  Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import './App.css'

interface CarroProps {
  modeloCarro: string;
  marcaCarro: string;
  categoriaCarro: string;
  anoCarro: string;
  capacidadeCarro: string;
  cvCarro: string;
}

function App() {
  /* ------------------- CADASTRO ------------------------ */
  const [carros, setCarros] = useState<CarroProps[]>(JSON.parse(localStorage.getItem('carros') || ''))
  const [modeloCarro, setModeloCarro] = useState('')
  const [categoriaCarro, setCategoriaCarro] = useState('')
  const [marcaCarro, setMarcaCarro] = useState('')
  const [anoCarro, setAnoCarro] = useState('')
  const [capacidadeCarro, setCapacidadeCarro] = useState('')
  const [cvCarro, setCvCarro] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(modeloCarro, marcaCarro, anoCarro, capacidadeCarro, cvCarro)
    setCarros(carros => [...carros, { id: carros?.length || 0, modeloCarro, categoriaCarro, marcaCarro, anoCarro, capacidadeCarro, cvCarro }])

    setModeloCarro('')
    setMarcaCarro('')
    setAnoCarro('')
    setCategoriaCarro('')
    setCapacidadeCarro('')
    setCvCarro('')
  }

  useEffect(() => {
    localStorage.setItem("carros", JSON.stringify(carros))
  }, [carros])

  /* ------------------- TABELA ------------------------ */
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'modeloCarro',
      headerName: 'Modelo do Carro',
      width: 150,
    },
    {
      field: 'marcaCarro',
      headerName: 'Marca do Carro',
      width: 130,
    },
    {
      field: 'categoriaCarro',
      headerName: 'Categoria do Carro',
      width: 130,
    },
    {
      field: 'anoCarro',
      headerName: 'Ano do Carro',
      width: 200,
    },
    {
      field: 'capacidadeCarro',
      headerName: 'Capacidade',
      width: 200,
    },
    {
      field: 'cvCarro',
      headerName: 'Potência',
      width: 200,
    },
  ];

  return (
    <div className="container">
      <div className="formulario">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column", gap: "10px" }}> {/*onSubmit*/}
          <TextField
            label="Modelo do Carro"
            type="text"
            required
            value={modeloCarro}
            onChange={(e) => setModeloCarro(e.target.value)}
          />
          <TextField
            label="Marca do Carro"
            type="text"
            required
            value={marcaCarro}
            onChange={(e) => setMarcaCarro(e.target.value)}
          />
          <FormControl >
            <InputLabel id="demo-simple-select-helper-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={categoriaCarro}
              label="Categoria"
              onChange={(e) => setCategoriaCarro(e.target.value)}
            >
              <MenuItem value={"Hatch"}>Hatch</MenuItem>
              <MenuItem value={"Sedã"}>Sedã</MenuItem>
              <MenuItem value={"SUV"}>SUV</MenuItem>
              <MenuItem value={"Picape"}>Picape</MenuItem>

            </Select>
          </FormControl>

          {/* <InputLabel id="categ">Categoria</InputLabel>
          <Select
            labelId="categ"

            value={categoria}
            label="Categoria"
            onChange={(e) => setModeloCarro(e.target.value)}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={'Hatch'}>Hatch</MenuItem>
            <MenuItem value={'Sedã'}>Sedã</MenuItem>
            <MenuItem value={'SUV'}>SUV</MenuItem>
            <MenuItem value={'Picape'}>Picape</MenuItem>

          </Select> */}
          <TextField
            label="Ano"
            type="text"
            required
            value={anoCarro}
            onChange={(e) => setAnoCarro(e.target.value)}
          />
          <TextField
            label="Capacidade"
            type="text"
            required
            value={capacidadeCarro}
            onChange={(e) => setCapacidadeCarro(e.target.value)}
          />
          <TextField
            label="Potência em Cavalos"
            type="text"
            required
            value={cvCarro}
            onChange={(e) => setCvCarro(e.target.value)}
          />
          <Button variant="contained" type="submit">
            + ADICIONAR CARRO
          </Button>
        </form>
      </div>
      <div className="tabela">
        <DataGrid
          rows={carros}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  )
}

export default App
