import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if ( !name || !isString(name) ) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDoB = (DoB: unknown): string => {
  if ( !DoB || !isString(DoB) || !isDate(DoB) ) {
    throw new Error("Incorrect or missing date: " + DoB);
  }
  return DoB;
};

const parseSsn = (ssn: unknown): string => {
  if ( !ssn || !isString(ssn) ) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if ( !occupation || !isString(occupation) ) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  
  return gender;
};

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: PatientFields)
  : NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDoB(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
  return newPatient;
};

export default toNewPatient;