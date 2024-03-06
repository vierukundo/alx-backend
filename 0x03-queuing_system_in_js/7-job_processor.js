const kue = require('kue');
const blacklistedNumbers = ['4153518780', '4153518781'];

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track progress of the job (0 out of 100)
  job.progress(0, 100);

  // Check if the phoneNumber is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    // Fail the job with an Error object
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }
  // Track progress to 50%
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber} with message: ${message}`);
  done();
}

const queue = kue.createQueue();

// Process jobs with concurrency set to 2
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
