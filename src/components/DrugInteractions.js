import React from "react";
import DrugPair from "./DrugPair";

const DrugInteractions = (props) => {
  let interactions = props.drugInteractions;
  if (interactions.fullInteractionTypeGroup) {
    const source = interactions.fullInteractionTypeGroup[0].sourceName;
    const disclaimer =
      interactions.fullInteractionTypeGroup[0].sourceDisclaimer;

    const drugComponents =
      interactions.fullInteractionTypeGroup[0].fullInteractionType.map(
        (pair, i) => {
          return (
            <DrugPair
              key={i}
              drugInteractions={props.drugInteractions}
              description={pair.interactionPair[0].description}
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
        <p id="drug-interactions-additional-disclaimer">
          Additional interactions may exist but are not listed here.
        </p>
        <ul>{drugComponents}</ul>
      </div>
    );
  }
};

export default DrugInteractions;
