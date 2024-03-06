const redis = require("redis");
import { promisify } from "util";
const kue = require("kue");
const express = require("express");

const client = redis.createClient();
const app = express();
const q = kue.createQueue();
const port = 1245;

function reserveSeat(number) {
  client.set("available_seats", number);
}

const get = promisify(client.get).bind(client);

async function getCurrentAvailableSeats() {
  return await get("available_seats");
}

reserveSeat(50);
let reservationEnabled = true;

// Route to get the number of available seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats });
});

app.get("/reserve_seat", (req, res) => {
  if (!reservationEnabled) res.json({ status: "Reservation are blocked" });
  else {
    let job = q.create("reserve_seat");
    job
      .on("complete", () =>
        console.log(`Seat reservation job ${job.id} completed`)
      )
      .on("failed", (err) =>
        console.log(`Seat reservation job ${job.id} failed: ${err}`)
      )
      .save((err) => {
        if (err) res.json({ status: "Reservation failed" });
        else res.json({ status: "Reservation in process" });
      });
  }
});

app.get("/process", (req, res) => {
  q.process("reserve_seat", (job, done) => {
    getCurrentAvailableSeats().then((resp) => {
      if (resp == 1) reservationEnabled = false;
      if (resp >= 1) {
        reserveSeat(resp - 1);
        done();
      } else done(new Error("Not enough seats available"));
    });
  });
  res.json({ status: "Queue processing" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
