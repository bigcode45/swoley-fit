import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Generator(props) {
  const {
    poision,
    setPoision,
    muscels,
    setMuscels,
    goals,
    setGoals,
    updateWorkout,
  } = props;

  const [showModal, setShowModal] = useState(false);

  // Functions-----------------------

  function toggleModle() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscelsGroup) {
    if (muscels.includes(muscelsGroup)) {
      setMuscels(muscels.filter((val) => val !== muscelsGroup));

      return;
    }

    if (muscels.length > 2) {
      return;
    }

    if (poision !== "individual") {
      setMuscels([muscelsGroup]);

      setShowModal(false);
      return;
    }

    setMuscels([...muscels, muscelsGroup]);
    if (muscels.length === 2) {
      setShowModal(false);
    }
  }

  function Header(props) {
    const { index, title, discription } = props;
    return (
      <div className=" flex flex-col gap-4">
        <div className=" flex items-center justify-center gap-2">
          <p className=" text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
            {index}
          </p>
          <h4 className=" text-xl sm:text-2xl md:text-3xl">{title}</h4>
        </div>
        <p className=" text-sm sm:text-base mx-auto">{discription}</p>
      </div>
    );
  }

  // End of functions-------------

  return (
    <SectionWrapper
      id={"generate"}
      header={"generate your workout"}
      title={["It's", "Huge", "O'Clock"]}
    >
      <Header
        index={"01"}
        title={"Pick your Poision"}
        discription={"Select the workout"}
      />

      <div className=" grid  sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((items, itemsIndex) => {
          return (
            <button
              onClick={() => {
                setMuscels([]);
                setPoision(items);
              }}
              className={
                " bg-slate-950  border border-blue-400 py-3 rounded-lg hover:border-blue-600 px-4" +
                (items === poision ? " border-blue-600" : "border-blue-400")
              }
              key={itemsIndex}
            >
              <p className=" capitalize">{items.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------------------------------- */}

      <Header
        index={"02"}
        title={"Lock on Target"}
        discription={"Select the Muscels"}
      />

      <div className=" bg-slate-950 border border-blue-400 border-solid  rounded-lg flex flex-col">
        <button
          onClick={toggleModle}
          className="flex relative justify-center items-center p-3"
        >
          <p className=" capitalize">
            {muscels.length == 0 ? "Select Muscle groups" : muscels.join(" ")}
          </p>
          <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
        </button>
        {showModal && (
          <div className="flex flex-col  px-3 pb-3">
            {(poision === "individual"
              ? WORKOUTS[poision]
              : Object.keys(WORKOUTS[poision])
            ).map((muscelsGroup, muscelsGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscelsGroup);
                  }}
                  key={muscelsGroupIndex}
                  className={
                    " hover:text-blue-400 duration-200 " +
                    (muscels.includes(muscelsGroup) ? "text-blue-400 " : " ")
                  }
                >
                  <p className="uppercase">{muscelsGroup}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ==================== */}

      <Header
        index={"03"}
        title={"Become Powerfull"}
        discription={"Select your Goals"}
      />

      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoals(scheme);
              }}
              className={
                " bg-slate-950  border border-blue-400 py-3 rounded-lg hover:border-blue-600 px4 " +
                (scheme === goals ? " border-blue-600" : "border-blue-400")
              }
              key={schemeIndex}
            >
              <p className=" capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      <Button fun={updateWorkout} text={"Formulate"}></Button>
    </SectionWrapper>
  );
}

export default Generator;
