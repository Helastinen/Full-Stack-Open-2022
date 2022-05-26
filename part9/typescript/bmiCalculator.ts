type Result = string;

interface inputValues {
  val1: number;
  val2: number;
}

const parseArguments = (args: Array<string>): inputValues => {
  if (args.length > 4) throw new Error("Too many arguments.");
  if (args.length < 4) throw new Error("Not enough arguments.");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val1: Number(args[2]),
      val2: Number(args[3])
    };
  } else {
    throw new Error("Provided values were not numbers.");
  }
};

const calculateBmi = (height: number, mass: number): Result => {
  const heightInMeters: number = height / 100;
  const bmi: number = mass / (heightInMeters * heightInMeters);
  let category = "";

  if (isNaN(Number(bmi))) {
    throw new Error("height and mass must be numbers!");
  } else if (height <= 0 || mass <= 0) {
    throw new Error("height and mass must be above zero!");
  } else if (bmi < 16) {
    category = "Underweight (Severe thinness)";
  } else if (16 < bmi && bmi < 17) {
    category = "Underweight (Moderate thinness)	";
  } else if (17 <= bmi && bmi < 18.4) {
    category = "Underweight (Mild thinness)";
  } else if (18.4 <= bmi && bmi < 24.9) {
    category = "Normal weight";
  } else if (24.9 <= bmi && bmi < 29.9) {
    category = "Overweight (Pre-obese)";
  } else if (29.9 <= bmi && bmi < 34.9) {
    category = "Obese (Class I)";
  } else if (34.9 <= bmi && bmi < 39.9) {
    category = "Obese (Class II)";
  } else if (40 <= bmi) {
    category = "Obese (Class III)";
  } else throw new Error ("must be a number");

  return category;
};

try {
  const { val1, val2 } = parseArguments(process.argv);
  console.log(calculateBmi(val1, val2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong!";
  
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;