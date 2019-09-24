# Neo Feed

# Task Description

## Requirements

-	use React with Hooks, TypeScript
- use best practices to structure the application, consider that it will be extended with additional features in the future
-	provide means for configuration for different environments (DEV/PROD)
-	cover partially with unit tests (in order to demonstrate the approaches, if have experience)
-	use api.nasa.gov
-	the API-KEY is SPboJP8XCDF9nlUzSqcqzh0Mq9sJuy6Hf27FuTFl (if expired - please register)
-	documentation:  https://api.nasa.gov/api.html#NeoWS


## Task:

Create a single page React application with information about near orbital objects (NEO), organized in list with a maximum of 6 elements. New element should be added every 5 seconds and contain aggregated data about a single day. The oldest element should be removed on new element if list is full. You should start fetching data from 1st day of the month till today. When reach today, start from the 1st day again.

Every element should contain the following data:

-	max estimated diameter of NEO in kilometers for the day (check estimated_diameter_max property)
-	number of potentially hazardous NEOs per day (check is_potentially_hazardous_asteroid property)
-	closest NEO (miss_distance in km)
-	fastest NEO (relative_velocity in kph)

Elements with the 2 highest numbers of hazard objects should have red background and updated with each new element added.

## Contains

- [x] [Typescript](https://www.typescriptlang.org/) 3.6.3
- [x] [React](https://facebook.github.io/react/) 16.9.2
- [x] [RxJS](http://reactivex.io/rxjs/) 6.5.3

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

