import React, { useEffect } from "react";
import DrugPair from "./DrugPair";
// import { useState, useEffect } from "react";

const DrugInteractions = (props) => {
  let interactions = props.drugInteractions;
  if (interactions.fullInteractionTypeGroup) {
    const source = interactions.fullInteractionTypeGroup[0].sourceName;
    const disclaimer =
      interactions.fullInteractionTypeGroup[0].sourceDisclaimer;

    const comment =
      interactions.fullInteractionTypeGroup[0].fullInteractionType[0].comment;
    console.log(`🪲${JSON.stringify(comment.split(" ")[0])}`);

    const drugComponents =
      interactions.fullInteractionTypeGroup[0].fullInteractionType.map(
        (pair, i) => {
          return (
            <DrugPair
              key={i}
              drugInteractions={props.drugInteractions}
              description={pair.interactionPair[0].description}
              drugOne={pair.comment.split(" ")[-1]}
              drugTwo={pair.comment.split(" ")[-3]}
            ></DrugPair>
          );
        }
      );

    return (
      <div>
        <p id="page-divider"></p>
        <h4>Drug Interactions:</h4>
        <p></p>
        <h5>Source: {source}</h5>
        <p id="drug-interactions-disclaimer">{disclaimer}</p>
        <p>Additional interactions may exist but are not listed here.</p>
        <ul>{drugComponents}</ul>
      </div>
    );
  }
};

export default DrugInteractions;
