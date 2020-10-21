import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Save, FolderOpen } from '@material-ui/icons';
import PropTypes from 'prop-types';

const Nav = ({ onOpen, onSave }) => (
  <>
    <List component="nav">
      <ListItem button onClick={onOpen}>
        <ListItemIcon>
          <FolderOpen />
        </ListItemIcon>
        <ListItemText primary="Open" />
      </ListItem>
      <ListItem button onClick={onSave}>
        <ListItemIcon>
          <Save />
        </ListItemIcon>
        <ListItemText primary="Save" />
      </ListItem>
    </List>
  </>
);

// props validation
Nav.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Nav;
