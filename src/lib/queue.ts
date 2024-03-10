import Queue from "bull";
const name = "JOBS";

const jobQueue = new Queue(name, "redis://127.0.0.1:6379");

export default jobQueue;
