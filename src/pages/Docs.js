import React from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  }
}))

export const Docs = () => {
  const classes = useStyles()
  return (
    <div>
      <h1>Docs</h1>
      <Typography variant="body1">
        Basic idea for experiment is to see about having documents with various
        types of blocks.  Blocks can have values that can be used in computations
        of other blocks like a spreadsheet.  Think Notion + Mathematic + spreadsheet.
      </Typography>
      <Container maxWidth="md">
        <Paper elevation={3} className={classes.root}>
          <Typography variant="body1">test</Typography>
        </Paper>
      </Container>
    </div>
  )
}
