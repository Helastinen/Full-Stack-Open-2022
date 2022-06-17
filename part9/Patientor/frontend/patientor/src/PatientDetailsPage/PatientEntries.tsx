import { Table, TableCell, TableRow, TableBody } from "@material-ui/core";
import { MonitorHeart, LocalHospital, Sick } from '@mui/icons-material/';

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
    <>
      Discharge:<br/>
      <ul>
        <li key={discharge.date}>{discharge.date}</li>
        <li key={discharge.criteria}>{discharge.criteria}</li>
      </ul>
    </>
  );
};

const OccupationalHealthcareSickLeave = ({ sickLeave }: { sickLeave: SickLeave }) => {

  return (
    <>
      Sickleave:<br/>
      <ul>
        <li key={sickLeave.startDate}>{sickLeave.startDate}</li>
        <li key={sickLeave.endDate}>{sickLeave.endDate}</li>
      </ul>
    </>
  );
};

const PatientEntries = ({ patient }: { patient: Patient }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const entryType = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthCheck healthCheckRating={entry.healthCheckRating}/>;

      case "Hospital":
        return <Hospital key={entry.discharge.criteria} discharge={entry.discharge} />;

      case "OccupationalHealthcare":
        if (entry.sickLeave) {  
          return (
            <>
              Employer: {entry.employerName}<br/>
              <OccupationalHealthcareSickLeave key={entry.sickLeave.startDate} sickLeave={entry.sickLeave} />
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