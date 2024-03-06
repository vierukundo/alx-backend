const redis = require('redis');
import { createClient } from 'redis';

const client = createClient()

client.on('error', err => {
  console.log('Redis client not connected to the server:', err.message);
})

client.on('connect', () => {
  console.log("Redis client connected to the server");
})

// Subscribe to the "holberton school channel"
client.subscribe('holberton school channel');

// On receiving a message, log it to the console
client.on('message', (channel, message) => {
  console.log(message);

  if (message === 'KILL_SERVER') {
    client.unsubscribe();
    client.quit();
  }
});
