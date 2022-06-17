import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { Entry } from "../types";

/*
 * use type Entry, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        "date": "",
        "type": "Hospital",
        "specialist": "",
        "diagnosisCodes": [],
        "description": "",
        "discharge": {
          "date": "",
          "criteria": ""
         }
      }}
      onSubmit={onSubmit}
    >
      {({ dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="MD"
              name="specialist"
              component={TextField}
            />
            <Field
              label="DiagnosisCodes"
              placeholder="DiagnosisCodes"
              name="diagnosisCodes"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: "right" }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }
      }
    </Formik>
  );
};

export default AddEntryForm;