import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import { Box, Card, CardMedia, Divider, LinearProgress, Typography } from '@mui/material'
import { useLazyGetPokemonByUrl } from '../hook/pokemon/useLazyGetPokemonByUrl'
import Label from './Label'

const DetailBase = ({ url, name, id, photo }) => {
  const classes = useStyles()

  const { pokemon, loading } = useLazyGetPokemonByUrl({ url })

  return (
    <Box className={classes.root}>
      <Card sx={{ maxWidth: 175 }} variant='outlined'>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={photo}
        />
      </Card>
      {
        loading && (
          // eslint-disable-next-line no-undef
          <LinearProgress variant="determinate" value={progress} />
        )
      }
      {
        !loading && (
          <Box className={classes.container}>
            <Typography variant='body1'>{id}</Typography>
            <Typography variant='body1'>{name}</Typography>
            <Divider />
            <Label label='Experience' value={pokemon?.base_experience} />
            <Label label='Weight' value={pokemon?.weight} />
            {
              pokemon?.types.map((type, index) => (
                <Label
                  key={`DetailBase-Type-${index}`}
                  label={`Type ${type.slot}`}
                  value={type.type.name} />
              ))
            }
          </Box>
        )
      }
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center',
    gap          : theme.spacing(1)
  },
  container: {
    display      : 'flex',
    flexDirection: 'column',
    gap          : theme.spacing(1)
  }
}), { name: 'DetailBase' })

DetailBase.propTypes = {
  url  : PropTypes.string,
  name : PropTypes.string,
  id   : PropTypes.string,
  photo: PropTypes.string
}

export default DetailBase