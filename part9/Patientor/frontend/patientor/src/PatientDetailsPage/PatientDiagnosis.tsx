import { Table, TableCell, TableRow, TableBody } from "@material-ui/core";

import { Entry, Diagnosis } from "../types";

const PatientDiagnosis = ({ entry }: { entry: Entry }) => {

  if ( !entry.diagnosisCodes ) {
    return null;
  }

  return (
    <>
    <Table style={{ marginBottom: "1em" }}>
      <TableBody>
        <TableRow> 
          <TableCell>
            <ul>
              {Object
                .values(entry.diagnosisCodes)
                .map((code: Diagnosis["code"]) => (
                  <li key={code}>{code}</li>
              ))}
            </ul>
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </>
  );
};

export default PatientDiagnosis;