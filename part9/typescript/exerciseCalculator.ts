type exerciseHours = Array<number>;

interface inputVals {
  target: number;
  numberArray: Array<number>;
}

interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArgs = (args: Array<string>): inputVals => {
  if (args.length < 4) throw new Error("Not enough arguments. Provide at least target value and one days exercise hours.");

  const trainingDays: Array<number> = args.map(val => Number(val)).slice(3);
  const hasNaN: boolean = trainingDays.includes(NaN);

  if (!isNaN(Number(args[2])) && !hasNaN) {
    return {
      target: Number(args[2]),
      numberArray: trainingDays
    };
  } else {
    throw new Error("Some or all of provided values are not numbers.");
  }
};

const calculateExercises = (exerciseArray: exerciseHours, target: number): Results => {
  const periodLength = exerciseArray.length;
  const trainingDays = exerciseArray.filter(day => day > 0).length;
  const sumOfHours = exerciseArray.reduce((prev, foll) => 
    prev + foll, 0
  );

  const average =  sumOfHours / exerciseArray.length;
  const success = average >= target ? true : false;
  
  let rating = 0;
  let ratingDescription = "";
  if ( average / target >= 1 ) {
    rating = 3;
    ratingDescription = "Well done Champ!";
  } else if ( average / target >= 0.5 && average / target < 1 ) {
    rating = 2;
    ratingDescription = "Close but no cigar! Find that extra gear!";
  } else if ( average / target < 0.5 ) {
    rating = 1;
    ratingDescription = "You can do better, push yourself harder!";
  }
  
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const {target, numberArray} = parseArgs(process.argv);
  console.log(calculateExercises(numberArray, target));
}
catch (error: unknown) {
  let errorMessage = "Something went wrong!";
  
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateExercises;