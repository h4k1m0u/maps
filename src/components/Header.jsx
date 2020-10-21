import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ appName }) => {
  // hooks
  const styles = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            { appName }
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

// avoids eslint warning about props
Header.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default Header;
