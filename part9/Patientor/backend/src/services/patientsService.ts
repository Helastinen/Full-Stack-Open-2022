import { v1 as uuid } from "uuid";

import { PublicPatientData, NewPatient, Patient } from "../types";
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

export default { getPatients, getPatient, addPatient };