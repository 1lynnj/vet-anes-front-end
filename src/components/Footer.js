import React from "react";

const Footer = () => {
  return (
    <div>
      <p className="mb-10" id="page-divider"></p>
      <p id="footer-text">Copyright ©️ 2023 Lynn Jansheski</p>
      {/* Removing NIH API disclaimers for now. Drug interaction api deprecated. 
      TODO: Replace with human/vet drug classification */}
      {/* <p id="footer-text">
        "This product uses publicly available data from the U.S. National
        Library of Medicine (NLM), National Institutes of Health, Department of
        Health and Human Services; NLM is not responsible for the product and
        does not endorse or recommend this or any other product."
      </p> */}
      {/* <cite id="footer-text">
        Citing DrugBank: Wishart DS, Knox C, Guo AC, Shrivastava S, Hassanali M,
        Stothard P, Chang Z, Woolsey J. DrugBank: a comprehensive resource for
        in silico drug discovery and exploration. Nucleic Acids Res. 2006 Jan
        1;34(Database issue):D668-72. 16381955
      </cite> */}
    </div>
  );
};

export default Footer;
