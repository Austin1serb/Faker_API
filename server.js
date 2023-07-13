const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

// Function to create a new user object
const createUser = () => {
  const newUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    _id: faker.datatype.uuid(),
  };
  return newUser;
};

// Function to create a new company object
const createCompany = () => {
  const newCompany = {
    _id: faker.datatype.uuid(),
    name: faker.company.companyName(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    },
  };
  return newCompany;
};

// API route to generate a new user
app.get('/api/users/new', (req, res) => {
  const newUser = createUser();
  res.json(newUser);
});

// API route to generate a new company
app.get('/api/companies/new', (req, res) => {
  const newCompany = createCompany();
  res.json(newCompany);
});

// API route to generate a new user and company
app.get('/api/user/company', (req, res) => {
  const newUser = createUser();
  const newCompany = createCompany();
  res.json({ user: newUser, company: newCompany });
});

// Route to serve the HTML page
app.get('/', (req, res) => {
  const newUser = createUser();
  const newCompany = createCompany();
  const html = `
    <h1>New User:</h1>
    <pre>${JSON.stringify(newUser, null, 2)}</pre>
    <h1>New Company:</h1>
    <pre>${JSON.stringify(newCompany, null, 2)}</pre>
  `;
  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
