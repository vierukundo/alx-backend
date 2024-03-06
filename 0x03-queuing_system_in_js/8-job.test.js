import { assert, expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

const queue = kue.createQueue();
describe('createPushNotificationsJobs', () => {

  before(() => {
    queue.testMode.enter();
  });

  after(() => {
    // Clear the queue and exit test mode after all tests
    queue.testMode.exit();
  });

  it("should throw error if jobs is not an array", () => {
    assert.throws(
      () => createPushNotificationsJobs('Invalid', queue),
      Error,
      "Jobs is not an array"
    );
  });

  it('create two new jobs to the queue', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 5678 to verify your account',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Validate the number of jobs in the queue
    expect(queue.testMode.jobs.length).to.equal(2);
  });
});
