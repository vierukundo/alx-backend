function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error("Jobs is not an array");
  }
  for (let job of jobs) {
    job = queue
      .create("push_notification_code_3", job)
    job
      .on("complete", () => console.log(`Notification job ${job.id} completed`))
      .on("failed", (err) =>
        console.log(`Notification job ${job.id} failed: ${err}`)
      )
      .on("progress", (perc) =>
        console.log(`Notification job ${job.id} ${perc}% complete`)
      )
      .save(() => {
        console.log("Notification job created:", job.id);
      });
  }
}

module.exports = createPushNotificationsJobs;
