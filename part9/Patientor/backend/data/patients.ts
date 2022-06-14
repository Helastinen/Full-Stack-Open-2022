import { Patient } from "../src/types";
import { toNewPatient } from "../src/utils";

const patientData = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop",
        "entries": []
    },
    {
        "id": "a35c55ff-17c3-4f35-b567-a0d8c07e6507",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop",
        "entries": []
    },
    {
        "id": "361750ff-ec04-47eb-889b-5dc0166c40d8",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": "male",
        "occupation": "Technician",
        "entries": []
    },
    {
        "id": "618dce7e-523c-4c78-ad5e-918098697b76",
        "name": "Dana Scully",
        "dateOfBirth": "1974-01-05",
        "ssn": "050174-432N",
        "gender": "female",
        "occupation": "Forensic Pathologist",
        "entries": []
    },
    {
        "id": "b14aa90c-9c49-4f6e-823d-38119c5262dd",
        "name": "Matti Luukkainen",
        "dateOfBirth": "1971-04-09",
        "ssn": "090471-8890",
        "gender": "male",
        "occupation": "Digital evangelist",
        "entries": []
    }
  ];

const patients: Patient[] = patientData.map(obj => {
    const object = toNewPatient(obj) as Patient;
    object.id = obj.id;

    return object;
});

export default patients;