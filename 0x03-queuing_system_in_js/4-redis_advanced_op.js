const redis = require('redis');
import { createClient } from 'redis';

const client = createClient()
  .on('error', err => {
    console.log('Redis client not connected to the server:', err.message);
  })

console.log("Redis client connected to the server");

// Store a hash using hset
client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

// Display the stored hash using hgetall
client.hgetall('HolbertonSchools', (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
