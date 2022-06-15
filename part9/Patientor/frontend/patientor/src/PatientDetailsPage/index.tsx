import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect} from "react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, getPatientDetails } from "../state";

import BasicPatientData from "./BasicPatientData";
import PatientEntries from "./PatientEntries";

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  
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

    // update patient ssn and entries to state only if they do not already exits there 
    if ( patients[id as string] && 
      ( !patients[id as string].ssn || 
        !patients[id as string].entries )) {
      void getPatient(id as string);
    }
  }, [dispatch]);
  
  const patient = patients[id as string];
  
  if (patient === undefined || 
    !patients[id as string].ssn || 
    !patients[id as string].entries) {
    return null;
  }
  console.log("PatientDetailsPage.ts --> patient:", patient);

  return (
    <div>
      <p></p>
      <BasicPatientData patient={patient} />
      <PatientEntries key={patient.id} patient={patient} />
    </div>
  );
};

export default PatientDetailsPage;