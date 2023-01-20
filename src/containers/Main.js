import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Typography, Dialog, DialogTitle, DialogContent, IconButton, CircularProgress } from '@mui/material'
import {
  Close as CloseIcon
} from '@mui/icons-material'
import { useGetPokemon } from '../hook/pokemon/useGetPokemon'
import CardBasic from '../components/CardBasic'
import DetailBase from '../components/DetailBase'
import ListBase from '../components/ListBase'

const viewType = {
  list: 'list',
  card: 'card'
}

const view = viewType.list

const Main = () => {
  const classes = useStyles()

  const [pokemonSelected, setPokemonSelected] = useState(null)

  const { loading, pokemons } = useGetPokemon()

  const handleClick = (pokemon) => {
    setPokemonSelected(pokemon)
  }

  const handleCloseDialog = () => {
    setPokemonSelected(null)
  }

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>Main</Typography>
      <Box className={classes.container}>
        {
          loading && (
            <CircularProgress />
          )
        }
        {
          view === viewType.card && !loading && pokemons.map((item, index) => (
            <CardBasic
              key={`MainCard-${index}`}
              title={item.name}
              url={item.url}
              photo={item.photo}
              onClick={() => handleClick(item)} />
          ))
        }
        {
          view === viewType.list && (
            <ListBase
              pokemons={pokemons}
            />
          )
        }
      </Box>
      {
        Boolean(pokemonSelected) && (
          <Dialog open onClose={handleCloseDialog} maxWidth='md'>
            <DialogTitle classes={{root: classes.dialogTitle}}>
              {`Pokemon: ${pokemonSelected.name}`}
              <IconButton onClick={handleCloseDialog}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DetailBase {...pokemonSelected} />
            </DialogContent>
          </Dialog>
        )
      }
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display       : 'flex',
    justifyContent: 'space-between',
    alignItems    : 'center'
  },
  root: {
    display      : 'flex',
    flexDirection: 'column',
    gap          : theme.spacing(1),
    padding      : theme.spacing(1, 0)
  },
  container: {
    width        : '100%',
    display      : 'flex',
    flexDirection: 'row',
    flexWrap     : 'wrap',
    gap          : theme.spacing(1)
  }
}), { name: 'Main' })

export default Main