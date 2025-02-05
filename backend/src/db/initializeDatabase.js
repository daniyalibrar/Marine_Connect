const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// create Super Admin
const adminSchema = {
  firstName: "Admin",
  lastName: "Admin",
  email: "admin@email.com",
  password: "admin",
  role: "admin",
};

async function createAdmin(adminUser) {
  // Step 1: Hash the user password
  const hashedPassword = await bcrypt.hash(adminUser.password, 10);
  // Step 2: Create the admin user
  const user = await User.create({ ...adminUser, password: hashedPassword });
  return user;
}

async function initializeDatabase() {
  try {
    console.log("Inserting data into tables...");
    // call initFunctions here if you don't want to init some table just comment its calling/invocation line.
    const admin = await createAdmin(adminSchema);
    console.log(admin);
    console.log("Data inserted successfully!");
  } catch (error) {
    console.log(error);
  }
}

initializeDatabase();
