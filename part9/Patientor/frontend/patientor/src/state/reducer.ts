import { State } from "./state";
import { Patient } from "../types";

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
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log("reducer.ts -> SET_PATIENT_LIST -> action.payload (patientListFromApi):", action.payload);

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
      console.log("reducer.ts -> ADD_PATIENT -> action.payload:", action.payload);
      
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "GET_PATIENT_DETAILS":
      console.log("reducer.ts -> GET_PATIENT_DETAILS -> action.payload:", action.payload);  
      const s = {...state };
      console.log("reducer.ts -> GET_PATIENT_DETAILS -> state:", s);

      const patientToChange = state.patients[action.payload.id];
      console.log("...and patientToChange:", patientToChange);
      const changedPatient = { 
        ...patientToChange, 
        ssn: action.payload.ssn,
        entries: action.payload.entries
      };
      console.log("...and changedPatient:", changedPatient);

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: changedPatient
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