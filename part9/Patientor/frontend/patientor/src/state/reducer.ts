import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

type AddEntry = {
  entry: Entry;
  patientId: string;
};

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT_DETAILS";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: AddEntry;
  };

export const reducer = (state: State, action: Action): State => {
  const s = {...state };
  console.log("reducer.ts -> GET_PATIENT_DETAILS -> state:", s);

  switch (action.type) {
    case "SET_PATIENT_LIST":
      //console.log("reducer.ts -> SET_PATIENT_LIST -> action.payload (patientListFromApi):", action.payload);

      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

    case "ADD_PATIENT":
      //console.log("reducer.ts -> ADD_PATIENT -> action.payload:", action.payload);
      
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "GET_PATIENT_DETAILS":
      //console.log("reducer.ts -> GET_PATIENT_DETAILS -> action.payload:", action.payload);  

      const patientBeforeDetails = state.patients[action.payload.id];
      //console.log("reducer.ts -> GET_PATIENT_DETAILS -> patientBeforeDetails{}:", patientBeforeDetails);
      const patientAfterDetails = { 
        ...patientBeforeDetails, 
        ssn: action.payload.ssn,
        entries: action.payload.entries
      };
      //console.log("reducer.ts -> GET_PATIENT_DETAILS -> patientAfterDetails{}:", patientAfterDetails);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: patientAfterDetails
        }
      };
      case "SET_DIAGNOSIS_LIST":
        //console.log("reducer.ts -> SET_DIAGNOSIS_LIST -> action.payload:", action.payload);

        return {
          ...state,
          diagnosis: {
            ...action.payload.reduce(
              (list, diagnose) => ({ ...list, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnosis
          }
        };

      case "ADD_ENTRY":
        //console.log("reducer.ts -> ADD_ENTRY -> action.payload:", action.payload);

        const patientBeforeNewEntry = state.patients[action.payload.patientId];
        //console.log("reducer.ts -> ADD_ENTRY -> patientBeforeNewEntry{}:", patientBeforeNewEntry);
        //const PatientAfterNewEntry: Patient = patientBeforeNewEntry.entries.concat(action.payload.entry);
        const patientAfterNewEntry = {
          ...patientBeforeNewEntry,
          entries: [...patientBeforeNewEntry.entries, action.payload.entry]
        };
        //console.log("reducer.ts -> ADD_ENTRY -> patientAfterNewEntry{}:", patientAfterNewEntry);

        return { 
          ...state,
          patients: {
            ...state.patients,
            [action.payload.patientId]: patientAfterNewEntry
          }
        };

    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const getPatientDetails = (patient: Patient): Action => {
  return {
    type: "GET_PATIENT_DETAILS",
    payload: patient
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis
  };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry,
      patientId
    }
  };
};