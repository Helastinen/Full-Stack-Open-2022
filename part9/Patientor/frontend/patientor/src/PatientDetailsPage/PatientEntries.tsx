import { Table, TableCell, TableRow, TableBody } from "@material-ui/core";
import { MonitorHeart, LocalHospital, Sick } from '@mui/icons-material/';
import { v1 as uuid } from "uuid";

import { Patient, Entry, Discharge, SickLeave, HealthCheckRating } from "../types";
import PatientDiagnosis from "./PatientDiagnosis";
import HealthRatingBar from "../components/HealthRatingBar";

const HealthCheck = ({ healthCheckRating }: { healthCheckRating: HealthCheckRating }) => {
  return (
    <>
      healthCheckRating: {healthCheckRating} {" "}
      <HealthRatingBar showText={false} rating={healthCheckRating} /><br/>
    </>
  );
};

const Hospital = ({ discharge }: { discharge: Discharge }) => {
  
  return (
    <p>
      Discharge:<br/>
      {" "}date: {discharge.date}<br/>
      {" "}criteria: {discharge.criteria}<br/>
    </p>
  );
};

const OccupationalHealthcareSickLeave = ({ sickLeave }: { sickLeave: SickLeave }) => {

  return (
    <p>
      Sickleave:<br/>
      {" "}start date: {sickLeave.startDate}<br/>
      {" "}end date: {sickLeave.endDate}<br/>
    </p>
  );
};

const PatientEntries = ({ patient }: { patient: Patient }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const listId = uuid();

  const entryType = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheck key={listId} healthCheckRating={entry.healthCheckRating}/>;

      case "Hospital":
        return <Hospital key={listId} discharge={entry.discharge} />;

      case "OccupationalHealthcare":
        if (entry.sickLeave) {  
          return (
            <>
              Employer: {entry.employerName}<br/>
              <OccupationalHealthcareSickLeave key={listId} sickLeave={entry.sickLeave} />
            </>
          );
        }
        return <>Employer: {entry.employerName}<br/></>;
        
      default:
        return assertNever(entry);
    }
  };

  const entryIcon = (entry: Entry) => {
    switch (entry.type){
      case "HealthCheck":
        return <MonitorHeart />;

      case "Hospital":
        return <LocalHospital />;

      case "OccupationalHealthcare":
        return <Sick />;

      default:
        return assertNever(entry);
    }
  };

  return (
    <>
      {Object
        .values(patient.entries)
        .map((entry: Entry) => (
          <>
            <Table style={{ marginBottom: "1em" }}>
              <TableBody>
                <TableRow> 
                  <TableCell>
                    <b>{entry.date}</b> {entryIcon(entry)}<br/>
                    <PatientDiagnosis key={entry.id} entry={entry}/>
                    Description: <i>{entry.description}</i><br/><br/>
                    {entryType(entry)}
                    Diagnose by <i>{entry.specialist}</i>.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
      ))}

      
    </>
  );
};

export default PatientEntries;