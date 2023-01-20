import React from 'react'
import { List } from '@mui/material'
import PropTypes from 'prop-types'
import ListItemBase from './ListItemBase'

const ListBase = ({ pokemons }) => {
  return (
    <List>
      {
        pokemons?.map((item, index) => (
          <ListItemBase
            key={`ListBase-${index}`}
            name={item?.name}
            url={item?.url}
            photo={item?.photo}
          />
        ))
      }
    </List>
  )
}

ListBase.propTypes = {
  pokemons: PropTypes.array
}

export default ListBase



