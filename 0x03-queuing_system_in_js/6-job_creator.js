const kue = require('kue');
const queue = kue.createQueue();

// Object containing job data
const jobData = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account',
};

// Create a job and push it to the queue
const notificationJob = queue.create('push_notification_code', jobData).save((err) => {
  if (!err) {
    console.log(`Notification job created: ${notificationJob.id}`);
  } else {
    console.error('Error creating job:', err);
  }
});

// Event handler when the job completes
notificationJob.on('complete', () => {
  console.log('Notification job completed');
});

// Event handler when the job fails
notificationJob.on('failed', (errorMessage) => {
  console.error('Notification job failed:', errorMessage);
});
