import { v1 as uuid } from "uuid";

import { PublicPatientData, NewPatient, Patient, NewEntry, Entry } from "../types";
import patients from "../../data/patients";

const getPatients = (): PublicPatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(obj => obj.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const id = uuid() as string;
  
  const newPatient = {
    id: id,
    ...patient
  };
  patients.push(newPatient);

  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const id = uuid();

  const newEntry: Entry = {
    id: id,
    ...entry
  };
  console.log("patientsService.ts --> addEntry() --> newEntry{}:", newEntry);
 
  patients
    .find(p => p.id === patientId)?.entries.push(newEntry);

  return newEntry;
};

export default { getPatients, getPatient, addPatient, addEntry };