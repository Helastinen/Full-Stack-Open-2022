import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient, parseId, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
    const id = parseId(req.params.id); // parsing, validation and type guards
    const patient = patientsService.getPatient(id);
    //console.log("Routes -> patients.ts -> patient:", patient);
    
    if (patient) {
      res.send(patient);
    } else {
      res.status(404);
    }
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body); // parsing, validation and type guards
    const addedPatient = patientsService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patientId = parseId(req.params.id); // parsing, validation and type guards
    //console.log("patients.ts --> POST Entry --> patientId:", patientId);
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body); // parsing, validation and type guards
    const addedEntry = patientsService.addEntry(newEntry, patientId);
    
    //console.log("patients.ts --> POST Entry --> addedEntry():", addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;