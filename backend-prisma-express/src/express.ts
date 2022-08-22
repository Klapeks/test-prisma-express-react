import express from "express";

const app = express()
app.use(express.json())

process.on('uncaughtException', err => {
    console.error(`Uncaught Exception: §c${err.message}`);
    console.log(err);
});

export default app;