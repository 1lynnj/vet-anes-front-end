const DrugInteractions = (props) => {
  let drugData = props.drugInteractions;
  // console.log(`🐝${JSON.stringify(drugData)}`);
  const source = drugData.fullInteractionTypeGroup[0].sourceName;
  // console.log(`👑${JSON.stringify(source)}`);
  const disclaimer = drugData.fullInteractionTypeGroup[0].sourceDisclaimer;
  // console.log(`🦋${JSON.stringify(disclaimer)}`);
  console.log(
    `🐠${JSON.stringify(
      drugData.fullInteractionTypeGroup[0].fullInteractionType
    )}`
  );

  const drugComponents = [];
  for (const pairs of drugData.fullInteractionTypeGroup[0]
    .fullInteractionType) {
    drugComponents.push(pairs.interactionPair[0].description);
  }

  return (
    <div>
      <h4>Drug Interactions:</h4>
      <h5>Source: {source}</h5>
      <p>{disclaimer}</p>
      <ul>{drugComponents}</ul>
    </div>
  );
};

export default DrugInteractions;
