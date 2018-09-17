import React from "react";
import { connect } from "react-redux";
import { compose, branch, renderNothing } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import green from "@material-ui/core/colors/green";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { RegularTextField } from "../../shared/FormFields";
import { required } from "../../shared/FormValidators";
import { saveToDoList } from "../actions";
// import TextField from "@material-ui/core/TextField";
// import DatePicker from "./DatePicker";

const styles = theme => ({
  todoLine: {
    display: "flex",
    alignItems: "center"
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: theme.spacing.unit
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  completeColor: {
    color: green[500],
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: green[50]
    }
  }
});

export const ToDoListForm = compose(
  withStyles(styles),
  connect(
    state => {
      const activeToToList = state.todos.toDoLists.get(
        state.todos.activeToDoList
      );
      return {
        toDoList: activeToToList ? activeToToList.toJS() : undefined
      };
    },
    dispatch => ({
      onSubmit: async ({ id, todos }) => {
        await dispatch(saveToDoList({ listId: id, todos }));
      }
    })
  ),
  branch(({ toDoList }) => !toDoList, renderNothing)
)(({ toDoList, classes, style, onSubmit }) => {
  return (
    <Card style={style}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {toDoList.title}
        </Typography>
        <Form
          onSubmit={onSubmit}
          initialValues={{ id: toDoList.id, todos: toDoList.todos }}
          mutators={{
            ...arrayMutators
          }}
          render={({
            handleSubmit,
            form: {
              mutators: { push, pop }
            },
            submitting,
            values
          }) => {
            return (
              <form onSubmit={handleSubmit} className={classes.form}>
                <FieldArray name="todos">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <div
                        key={name}
                        className={classes.todoLine}
                        onBlur={handleSubmit}
                      >
                        <Typography
                          className={classes.standardSpace}
                          variant="title"
                        >
                          {index + 1}
                        </Typography>
                        <Field
                          name={`${name}`}
                          component={RegularTextField}
                          label={index === 1 ? "long" : "What to do?"}
                          className={classes.textField}
                          validate={required}
                        />
                        {/* <TextField
                          id="date"
                          label="Deadline"
                          type="date"
                          style={{ textField: { width: 100 } }}
                          defaultValue={new Date().toJSON().substr(0, 10)}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true
                          }}
                        /> */}
                        <Button
                          size="small"
                          className={classNames(
                            classes.standardSpace,
                            classes.completeColor
                          )}
                        >
                          <DoneIcon />
                        </Button>
                        <Button
                          type="submit"
                          size="small"
                          color="secondary"
                          className={classes.standardSpace}
                          onClick={() => {
                            fields.remove(index);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ))
                  }
                </FieldArray>
                <CardActions>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => push("todos", undefined)}
                  >
                    Add Todo <AddIcon />
                  </Button>
                  <Button type="submit" variant="raised" color="primary">
                    Save
                  </Button>
                </CardActions>
              </form>
            );
          }}
        />
      </CardContent>
    </Card>
  );
});
