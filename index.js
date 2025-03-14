// index.js
import express from 'express';
import { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee } from './dbOperations.js'; // Assuming your database logic is in dbOperation.js

const app = express(); //Create Express Application on the app variable
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies //used the json file

// Get all employees //Get =read
app.get('/employees', (req, res) => {
  res.json(getEmployees());
});

// Get an employee by ID
app.get('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const employee = getEmployeeById(id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Add a new employee // post= create
app.post('/employees', (req, res) => {
  const newEmployee = req.body;
  if (!newEmployee.name || !newEmployee.position) {
    return res.status(400).json({message: "Employee must have name and position"});
  }
  const addedEmployee = addEmployee(newEmployee);
  res.status(201).json(addedEmployee);
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const updatedEmployee = updateEmployee(id, updatedData);
  if (updatedEmployee) {
    res.json(updatedEmployee);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = deleteEmployee(id);
  if (deleted) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});