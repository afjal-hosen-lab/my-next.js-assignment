# FitLog – Workout Library

FitLog is a simple workout library and planning website where users can explore different exercises, check workout details, save workouts, and create a personal daily workout plan.

I built this project using Next.js, React, and Tailwind CSS. The main goal of the project was to practice building a responsive website with reusable components, client-side state management, localStorage, and basic user interactions.

## Live Website



## Features

* Browse a collection of workout exercises
* Search workouts by name
* Sort workouts by duration, calories, or rating
* View individual workout details
* Add workouts to Today's Plan
* Maximum 5 workouts can be added to Today's Plan
* Save workouts for later
* Remove workouts from Plan or Saved
* Mark planned workouts as completed
* Show Plan and Saved workout counts in the navbar
* Store Plan, Saved, and Completed data in localStorage
* Show toast notifications for user actions
* Responsive layout for mobile, tablet, and desktop
* Loading animation while workout data is loading

## Technologies

* Next.js
* React
* JavaScript
* Tailwind CSS
* React Toastify
* localStorage

## Main Pages

### Home Page

The home page contains:

* Navigation bar
* Hero section
* Workout library
* Search and sorting options
* Workout cards

### Workout Details

Each workout has a separate details page where users can see the workout information and perform actions such as:

* Add to Today's Plan
* Save for Later

### My Plan

The My Plan page contains two sections:

* Today's Plan
* Saved Workouts

Users can also sort the workouts and mark planned workouts as completed.

## Data Storage

For this project, I used browser `localStorage` instead of a database.

The following keys are used:

```text
fitlog-plan
fitlog-saved
fitlog-done
```

This allows the selected workouts to remain available even after refreshing the page.

## Plan Limit

Today's Plan has a limit of 5 workouts.

If 5 workouts have already been added, the user cannot add another workout until one is removed.

The application also prevents the same workout from being added more than once.

## Responsive Design

The interface is responsive and adjusts to different screen sizes.

It is designed for:

* Mobile
* Tablet
* Laptop
* Desktop

## Getting Started

First, install the project dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open the project in your browser:

```text
http://localhost:3000
```

## Project Structure

```text
app/
├── page.js
├── my-plan/
│   └── page.js
└── workout/
    └── [id]/
        └── page.js

components/
├── Navbar.js
├── Footer.js
├── Hero.js
├── Library.js
├── WorkoutCard.js
├── WorkoutActions.js
└── PlanWorkoutCard.js

public/
└── assets/
```

## What I Practiced

While building this project, I practiced:

* React components
* React state and effects
* Next.js routing
* Tailwind CSS
* localStorage
* Search and sorting
* Responsive design
* Reusable components
* Client-side interactions
* Toast notifications

## Author

Developed as a frontend development practice project.

