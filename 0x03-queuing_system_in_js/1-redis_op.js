import redis from 'redis';
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
function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, value) => {
        if (err) {
            console.error(`Error retrieving value for ${schoolName}: ${err.message}`);
        } else {
            console.log(value);
        }
    });
}

// Call the functions
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
