import React from "react";
import axios from "axios";
import { Table } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useEffect} from "react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

import { useStateValue, getPatientDetails } from "../state";
import { TableCell, TableRow, TableBody, Typography } from "@material-ui/core";
import { Transgender, Female, Male } from "@mui/icons-material";

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id as string];
  console.log("PatientDetailsPage.ts --> patient:", patient);
  
  if (patient === undefined) {
    return null;
  }
  
  useEffect(() => {
    console.log('PatientDetailsPage.ts: useEffect triggered');

    const getPatient = async (id: string) => {
      try {
        const {data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(getPatientDetails(patient));
      } 
      catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if ( axios.isAxiosError(error) && error.response ) {
          errorMessage += " Error: ", error.response.data.message;
        }
        console.error(errorMessage);
      }
    };

    if (!patient.ssn || !patient.entries) {
      void getPatient(id as string);
    }
  }, [dispatch]);


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
    <div>
      <p></p>
    <Typography align="left" variant="h5">
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
    </div>
  );
};

export default PatientDetailsPage;