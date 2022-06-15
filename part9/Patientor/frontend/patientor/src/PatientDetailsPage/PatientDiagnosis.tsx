
import { useEffect} from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue, setDiagnosisList } from "../state";
import { Table, TableCell, TableRow, TableBody } from "@material-ui/core";

import { Entry, Diagnosis } from "../types";

const PatientDiagnosis = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDiagnosisList();
  }, [dispatch]);

  if ( !diagnosis || 
    diagnosis === undefined || 
    Object.keys(diagnosis).length === 0 ||
    !entry.diagnosisCodes) {
    return null;
  }

  console.log("PatientDiagnosis.ts --> Object.values(diagnosis):", Object.values(diagnosis));
  //* iterates each code in array, and then shows code and gets corresponding name (codeObj.name) for the code from diagnoses list 
  return (
    <>
    <Table style={{ marginBottom: "1em" }}>
      <TableBody>
        <TableRow> 
          <TableCell>
            <ul>
              {Object
                .values(entry.diagnosisCodes)
                .map((code: Diagnosis["code"]) => (
                  <li key={code}>
                    {code} {' '}
                    {Object
                      .values(diagnosis)
                      .filter((codeObj: Diagnosis) => codeObj.code === code)
                      .map((codeObj: Diagnosis) => codeObj.name)
                    }
                  </li>
              ))}
            </ul>
            </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </>
  );
};

export default PatientDiagnosis;