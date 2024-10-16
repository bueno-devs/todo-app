import React, { useState } from 'react'
import {
  Menu,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Box,
  Button,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

const columnsLeft = (handleMenuOpen) => [
  {
    field: 'título',
    headerName: 'Título',
    flex: 1,
    width: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'quantidade',
    headerName: 'Quantidade',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: '16px',
          marginTop: '5px',
        }}
      >
        <Tooltip
          title="Editar"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <IconButton edge="end" aria-label="edit" onClick={handleMenuOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Deletar"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <IconButton edge="end" aria-label="delete" sx={{ ml: 2 }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
]

const columnsRight = (handleMenuOpen) => [
  {
    field: 'título',
    headerName: 'Título',
    flex: 1,
    width: 100,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'quantidade',
    headerName: 'Quantidade',
    width: 150,
    disableColumnMenu: true,
  },
  {
    field: 'cor',
    headerName: 'Cor',
    width: 100,
    disableColumnMenu: true,
  },
  {
    field: 'actions',
    headerName: '',
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: '16px',
          marginTop: '5px',
        }}
      >
        <Tooltip
          title="Editar"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <IconButton edge="end" aria-label="edit" onClick={handleMenuOpen}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Deletar"
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <IconButton edge="end" aria-label="delete" sx={{ ml: 2 }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
]

const rows = [
  { id: 1, título: 'Trabalho', quantidade: 10, cor: 'Azul' },
  { id: 2, título: 'Escola', quantidade: 20, cor: 'Vermelho' },
]

function Adicionar() {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div style={{ paddingTop: '16px' }}>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Adicionar Categoria"
              variant="outlined"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: '16px', width: '100px', height: '38px' }}
            >
              Salvar
            </Button>
          </Box>
          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid rows={rows} columns={columnsLeft(handleMenuOpen)} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField label="Adicionar Tag" variant="outlined" fullWidth />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: '16px', width: '100px', height: '38px' }}
            >
              Salvar
            </Button>
          </Box>

          <div style={{ height: '80vh', marginTop: '20px' }}>
            <DataGrid rows={rows} columns={columnsRight(handleMenuOpen)} />
          </div>
        </Grid>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            width: '400px',
          },
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField label="Editar" variant="outlined" fullWidth />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleMenuClose}
              sx={{
                height: '40px',
                width: '130px',
                fontSize: '1rem',
                marginRight: 2,
              }}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleMenuClose}
              sx={{ height: '40px', width: '130px', fontSize: '1rem' }}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Menu>
    </div>
  )
}

export default Adicionar
