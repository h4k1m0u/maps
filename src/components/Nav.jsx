import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

const Nav = ({ onClick }) => (
  <>
    <List component="nav">
      <ListItem button onClick={onClick}>
        <ListItemIcon>
          <SaveIcon />
        </ListItemIcon>
        <ListItemText primary="Save" />
      </ListItem>
    </List>
  </>
);

// props validation
Nav.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Nav;
