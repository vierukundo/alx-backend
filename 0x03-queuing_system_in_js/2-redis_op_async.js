import redis from 'redis';
import { promisify } from "util";
import { createClient } from 'redis';

const client = createClient()
  .on('error', err => {
    console.log('Redis client not connected to the server:', err.message);
  })

console.log("Redis client connected to the server");


// Function to set a new school in Redis
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

// Function to display the value for a given school in Redis
const getAsync = promisify(client.get).bind(client);

async function displaySchoolValue(schoolName) {
  getAsync(schoolName).then((res) => {
    console.log(res);
  });
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
