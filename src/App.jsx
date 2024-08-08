import { useState } from "react";
import Generator from "./components/Generator";
import Hero from "./components/Hero";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/functions";

function App() {
  const [workout, setWorkout] = useState(null);
  const [poision, setPoision] = useState("individual");
  const [muscels, setMuscels] = useState([]);
  const [goals, setGoals] = useState("Strenght and power");

  function updateWorkout() {
    if (muscels.length < 1) {
      return;
    }

    let newWorkout = generateWorkout({ poision, muscels, goals });

    setWorkout(newWorkout);
    window.location.href = "#workout";
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poision={poision}
        setPoision={setPoision}
        muscels={muscels}
        setMuscels={setMuscels}
        goals={goals}
        setGoals={setGoals}
        updateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} />}
    </main>
  );
}

export default App;
