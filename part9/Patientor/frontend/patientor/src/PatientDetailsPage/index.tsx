import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { Button, Typography } from "@material-ui/core";

import { Patient, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, getPatientDetails, addEntry } from "../state";

import BasicPatientData from "./BasicPatientData";
import PatientEntries from "./PatientEntries";
import { EntryFormValues } from "../AddEntryForm/AddEntryForm";
import AddEntryModal from "../AddEntryForm";

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
  
  //* Add Entry
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
        );
      console.log("PatientDetailsPage.ts -> submitNewEntry() -> newEntry:", newEntry);
      dispatch(addEntry(newEntry, id as string));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };

  return (
    <div>
      <p></p>
      <BasicPatientData patient={patient} />
      <Typography style={{ marginBottom: "1em" }} align="left" variant="h5">Entries</Typography>
      <Button variant="contained" onClick={() => openModal()}>
        Add new Hospital entry
      </Button>
      <PatientEntries key={patient.id} patient={patient} />
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      
    </div>
  );
};

export default PatientDetailsPage;