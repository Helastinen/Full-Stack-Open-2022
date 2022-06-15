import { Table, TableCell, TableRow, TableBody, Typography } from "@material-ui/core";

import { Patient, Entry } from "../types";
import PatientDiagnosis from "./PatientDiagnosis";

const PatientEntries = ({ patient }: { patient: Patient }) => {

  return (
    <>
      <Typography align="left" variant="h6">Entries</Typography>
  
      {Object
        .values(patient.entries)
        .map((entry: Entry) => (
          <>
            <Table style={{ marginBottom: "1em" }}>
              <TableBody>
                <TableRow> 
                  <TableCell key={entry.id}>{entry.date} {entry.description}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <PatientDiagnosis entry={entry} key={entry.id}/>
          </>
      ))}

      
    </>
  );
};

export default PatientEntries;