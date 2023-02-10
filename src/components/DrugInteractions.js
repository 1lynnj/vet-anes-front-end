import React, { useEffect } from "react";
import DrugPair from "./DrugPair";
// import { useState, useEffect } from "react";

const DrugInteractions = (props) => {
  let interactions = props.drugInteractions;
  if (interactions.fullInteractionTypeGroup) {
    const source = interactions.fullInteractionTypeGroup[0].sourceName;
    const disclaimer =
      interactions.fullInteractionTypeGroup[0].sourceDisclaimer;

    const drugComponents = [];
    for (const pairs of interactions.fullInteractionTypeGroup[0]
      .fullInteractionType) {
      drugComponents.push(
        <DrugPair
          drugInteractions={props.drugInteractions}
          description={pairs.interactionPair[0].description}
        ></DrugPair>
      );
    }

    return (
      <div>
        <h4>Drug Interactions:</h4>
        <h5>Source: {source}</h5>
        <p>{disclaimer}</p>
        <ul>{drugComponents}</ul>
      </div>
    );
  }
};

export default DrugInteractions;
