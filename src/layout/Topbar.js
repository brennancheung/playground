import React from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import { AvatarMenu } from '../components/common/AvatarMenu'
import { CTAButton } from '../components/common/CTAButton'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Hidden, List, ListItem, Toolbar } from '@material-ui/core'
import { useAuth } from '../hooks/useAuth'
import { useNavTo } from '../hooks/useNavTo'

const useStyles = makeStyles(theme => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    maxWidth: theme.layout.contentWidth,
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  navLink: {
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: theme.palette.primary.dark,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: theme.palette.primary.dark,
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  logoContainer: {
    width: 100,
    height: 28,
    border: '1px solid #000',
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '125px',
    height: '50px',
    position: 'relative',
    top: '-10px',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
}))

export const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props
  const { initialized, user, signInWithGoogle } = useAuth()
  const classes = useStyles()
  const navTo = useNavTo()

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer} onClick={navTo('/')}>
        {false && <img className={classes.logoImage} src="/assets/images/logo.png" alt="Logo" />}
        <Link to="/">Logo</Link>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List className={classes.navigationContainer}>
          <Link to="/about">About</Link>
          &nbsp;
          <Link to="/docs">Docs</Link>
          &nbsp;
          <Link to="/widgets">Widgets</Link>
          &nbsp;
          <ListItem className={classes.listItem}>
            {initialized && !user && <CTAButton onClick={signInWithGoogle}>Sign In</CTAButton>}
            {user && <AvatarMenu user={user} />}
          </ListItem>
        </List>
      </Hidden>
      <Hidden mdUp>
        <IconButton className={classes.iconButton} onClick={onSidebarOpen} aria-label="Menu" >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  )
}

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
}

export default Topbar
