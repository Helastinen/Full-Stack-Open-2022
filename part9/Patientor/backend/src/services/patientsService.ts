import { v1 as uuid } from "uuid";

import { NonSensitivePatientData, NewPatient, Patient } from "../types";
import patients from "../../data/patients";

const getPatients = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid() as string;
  
  const newPatient = {
    id: id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };