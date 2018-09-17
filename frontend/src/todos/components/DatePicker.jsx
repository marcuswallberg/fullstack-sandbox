import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  //   todoLine: {
  //     display: "flex",
  //     alignItems: "center"
  //   },
  //   textField: {
  //     flexGrow: 1
  //   },
  //   standardSpace: {
  //     margin: theme.spacing.unit
  //   },
  //   form: {
  //     display: "flex",
  //     flexDirection: "column",
  //     flexGrow: 1
  //   },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 200
  }
});

function DatePickers(props) {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);
