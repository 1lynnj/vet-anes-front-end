# Veterinary Anesthesia Protocol

A web application to reduce drug calculation errors with veterinary anesthetic protocols. 

Popular tools currently in use:
- blank forms where medical staff manually write in and calculate drug dosages using a calculator
- excel spreadsheets where some calculations can be automated but are prone to user error through spreadsheet interference 

## Features

- Allows custom protocols for cats and dogs by entering each required drug and the required dose individually. 
 - Auto populates protocols for healthy cats and dogs with the click of a button.
 - Calculates drug dosages for anesthesia, Fentanyl (pain) continuous rate infusion, fluid rates, and emergency drugs.

## Setup and Dependencies

Initial setup. 
More information can be found at 
[Create React App](https://github.com/facebook/create-react-app#creating-an-app).

**npm**

`npm init react-app my-app`
`cd my-app`
`npm start`

**Yarn**

`yarn create react-app my-app
cd my-app
yarn start`

**Additional dependencies**

`yarn add axios`

`yarn add react-select`

`yarn add react-script`

## Database and Backend

This app uses a postgreSQL database of a limited number of drugs with a backend written in Django.

[Veterinary Anesthesia Protocol - Backend](https://github.com/1lynnj/vet-anes.git)
  
## Future Versions

- Ability by user to add standard protocols to autopopulate form.
- Ability by user to store protocols for individual patients to recall for reference or usage at a later time.
- Ability by user to add drugs to the database.
- User login and authentication to allow above actions.
- Printable document with generated protocol and monitoring grid for use by anesthetist on the medical floor.