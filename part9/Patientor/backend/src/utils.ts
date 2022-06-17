import {
  NewPatient,
  Gender,
  Entry,
  NewEntry,
  Diagnosis,
  HealthCheckRating,
  Type,
  Discharge,
  SickLeave,
  NewBaseEntry } from "./types";

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

const parseDate = (DoB: unknown): string => {
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

const isEntry = (entries: unknown): entries is Entry[] => {
  return typeof entries === "object" || entries instanceof Array;
};

const parseEntries = (entries: unknown): Entry[] => {
  if ( !entries || !isEntry(entries) ) {
    throw new Error("Incorrect or missing entries: " + entries);
  }

  return entries;
};

type PatientFields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,  
  occupation: unknown,
  entries?: unknown
};

const toNewPatient = ({ 
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries = []
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  console.log("utis.ts -> toNewPatient() -> newPatient{}:", newPatient);
  
  return newPatient;
};

const parseId = (id: unknown): string => {
  if ( !id || !isString(id) ) {
    throw new Error("Incorrect or missing id: " + id);
  }
  return id;
};

const isType = (type: unknown): type is Type => {
  console.log("utils.ts --> isType() --> typeof type: ", typeof type);
  return typeof type === "string" || type instanceof String;
};

const parseType = (type: unknown): Type => {
  if ( !type || !isType(type) ) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if ( !description || !isString(description) ) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if ( !specialist || !isString(specialist) ) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<Diagnosis["code"]> => {
  return typeof diagnosisCodes === "object" || diagnosisCodes instanceof Array;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis["code"]> => {
  if ( !diagnosisCodes || !isDiagnosisCodes(diagnosisCodes) ) {
    throw new Error("Incorrect or missing diagnosisCodes: " + diagnosisCodes);
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ishealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
if (( healthCheckRating !== 0 && !healthCheckRating ) || !ishealthCheckRating(healthCheckRating) ) {
    throw new Error("Incorrect or missing healthCheckRating: " + healthCheckRating);
  }
  
  return healthCheckRating;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return typeof discharge === "object" || discharge instanceof Array;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if ( !discharge || !isDischarge(discharge) ) {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if ( !employerName || !isString(employerName) ) {
    throw new Error("Incorrect or missing employerName: " + employerName);
  }
  return employerName;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  return typeof sickLeave === "object" || sickLeave instanceof Object;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if ( !isSickLeave(sickLeave) ) {
    throw new Error("Missing sickLeave: " + sickLeave);
  }
  return sickLeave;
};

type EntryFields = {
  type: unknown,
  description: unknown,
  date: unknown,
  specialist: unknown,  
  diagnosisCodes?: unknown,
  healthCheckRating?: unknown,
  discharge?: unknown,
  employerName?: unknown,
  sickLeave?: unknown
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toNewEntry = ({ 
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: EntryFields) : NewEntry => {
  const baseEntry: NewBaseEntry = {
    type: parseType(type),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    ...diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)} : null, 
  };

  switch ((type)) {
    case "HealthCheck":
      const newHealthCheckEntry: NewEntry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      console.log("utis.ts -> toNewEntry() -> newHealthCheckEntry{}:", newHealthCheckEntry);
      return newHealthCheckEntry;

    case "Hospital":
      const newHospitalEntry: NewEntry = {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(discharge),
      };
      console.log("utis.ts -> toNewEntry() -> newHospitalEntry{}:", newHospitalEntry);
      return newHospitalEntry;

    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry: NewEntry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(employerName),
        ...sickLeave ? {sickLeave: parseSickLeave(sickLeave)} : null,
      };
      console.log("utis.ts -> toNewEntry() -> newOccupationalHealthcareEntry{}:",newOccupationalHealthcareEntry);
      return newOccupationalHealthcareEntry;

    default:
      return assertNever(type as never);
  }
};


export { toNewPatient, parseId, toNewEntry };