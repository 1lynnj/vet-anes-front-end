const DrugInteractions = (props) => {
  let drugData = props.drugInteractions;
  console.log(`🐝${JSON.stringify(drugData)}`);
  const source = drugData.fullInteractionTypeGroup[0].sourceName;
  const disclaimer = drugData.fullInteractionTypeGroup[0].sourceDisclaimer;
  const drugInteractions = () => {
    const drugPairs = []
    for (let drugPair of drugData.fullInteractionType[0].interactionPair) {
      return {
        drugPairs.push(drugPair.description)};
    }
  };
  return (
    <div>
      <h4>Drug Interactions:</h4>
      <h5>Source: {source}</h5>
      <p>{disclaimer}</p>
      <p>{drugPairs}</p>
    </div>
  );
};

export default DrugInteractions;
