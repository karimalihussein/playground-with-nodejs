const { Instructors } = require("./data/InstructorsDummyData");
const { Instructor } = require("./models/Instructor");

const connectToDB = require("./config/db");
require("dotenv").config();

connectToDB();

const importData = async () => {
  try {
    await Instructor.insertMany(Instructors);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Instructor.deleteMany();
    console.log("Data Deleted!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-import") {
  importData();
} else if (process.argv[2] === "-delete") {
  deleteData();
}
