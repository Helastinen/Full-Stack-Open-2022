import { Table, TableCell, TableRow, TableBody, Typography } from "@material-ui/core";
import { Transgender, Female, Male } from "@mui/icons-material";

import { Patient } from "../types";

const BasicPatientData = ({ patient }: { patient: Patient }) => {
  const genderIcon = (patient: Patient) => {
    switch (patient.gender) {
      case "male":
        return <Male />;
      case "female":
        return <Female />;
      case "other":
        return <Transgender />;
      default:
        return null;
    }
  };
  
  return (
    <>
      <Typography align="left" variant="h4">
        {patient.name} {genderIcon(patient)}
      </Typography>

      <Table style={{ marginBottom: "1em" }}>
        <TableBody>
          <TableRow>
            <TableCell>Ssn: {patient.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Occupation: {patient.occupation}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default BasicPatientData;