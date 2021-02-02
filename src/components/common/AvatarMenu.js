/* eslint-disable */
import React, { useRef, useState } from 'react'
import { Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useToggle } from '../../hooks/useToggle'
import { useAuth } from '../../hooks/useAuth'
import { useNavTo } from '../../hooks/useNavTo'

export const AvatarMenu = ({ user }) => {
  const ref = useRef(null)
  const [open, toggle] = useToggle(false)
  const { signOut } = useAuth()
  const navTo = useNavTo()
  const closeAndNav = url => () => {
    toggle()
    navTo(url)()
  }

  return (
    <>
      <IconButton ref={ref} aria-controls="avatar-menu" aria-haspopup="true" onClick={toggle}>
        <Avatar alt={user.displayName} src={user.photoURL} />
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={ref.current}
        getContentAnchorEl={null}
        keepMounted
        open={open}
        onClose={toggle}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem onClick={closeAndNav('/profile')}>My Profile</MenuItem>
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}

AvatarMenu.propTypes = {
  user: PropTypes.object.isRequired,
}
