import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  listItemButton: {
    whiteSpace: 'nowrap',
  },
}))

export const CTAButton = ({ children, onClick }) => {
  const classes = useStyles()
  return (
    <Button
      size="large"
      variant="contained"
      color="primary"
      component="a"
      onClick={onClick}
      className={classes.listItemButton}
    >{children}</Button>
  )
}

CTAButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
}
