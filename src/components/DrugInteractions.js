import React, { useEffect } from "react";
// import { useState, useEffect } from "react";

const DrugInteractions = (props) => {
  useEffect(props.loadDrugInteractions, []);

  let interactions = props.drugInteractions;
  if (interactions.fullInteractionTypeGroup) {
    const source = interactions.fullInteractionTypeGroup[0].sourceName;
    const disclaimer =
      interactions.fullInteractionTypeGroup[0].sourceDisclaimer;
    console.log(
      `🐠${JSON.stringify(
        interactions.fullInteractionTypeGroup[0].fullInteractionType
      )}`
    );

    const drugComponents = [];
    for (const pairs of interactions.fullInteractionTypeGroup[0]
      .fullInteractionType) {
      drugComponents.push(pairs.interactionPair[0].description);
    }
    return (
      <div>
        <code>-- {JSON.stringify(drugComponents)}</code>
        <h4>Drug Interactions:</h4>
        <h5>Source:{source}</h5>
        <p>{disclaimer}</p>
        <ul>{drugComponents}</ul>
      </div>
    );
  }
};

export default DrugInteractions;
