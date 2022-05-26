/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

//* BMI
app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
    
  try {
    const category = calculateBmi(height, weight);

    const data = {
      weight: weight,
      height: height,
      bmi: category
    };
  
    res
      .status(200)
      .json(data);
  } catch (error: unknown) {
    res
      .status(400)
      .send({ error: "malformatted parameters" });
  }
});

//* Calculate exercises
app.post("/exercises", (req, res) => {
  console.log("reqData:", req.body);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getParameter = (obj: any, param: string): any => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const value = obj[param];
    if (!value ) {
      throw new Error("parameters missing");
    }

    return value;
  };

  try {
    const dailyExercises = getParameter(req.body, "daily_exercises");
    const target = getParameter(req.body, "target");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const allNumbers = Array.isArray(dailyExercises) && dailyExercises.every((day) => {
        return typeof day === "number";
    });

    if ( typeof target !== "number" || !allNumbers) {
      throw new Error("malformatted parameters");
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const exerciseData = calculateExercises(dailyExercises, target);

    res
      .status(200)
      .json(exerciseData);
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = "error: " + error.message;
    }
    res
      .status(400)
      .send({ errorMessage });
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});