import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
  },
  pre: {
  }
}))

export const WidgetExample = ({ code, children, title }) => {
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h3">{title}</Typography>
        {children}
        <br />
        <pre className={classes.pre}>{code}</pre>
      </Paper>
    </Container>
  )
}

WidgetExample.propTypes = {
  title: PropTypes.string,
  code: PropTypes.string,
  children: PropTypes.node,
}
