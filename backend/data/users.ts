import bcrypt from "bcryptjs";

const users = [
    {
        name: "Admin",
        email: "admin@example.com",
        password: bcrypt.hashSync("password123", 10),
        isAdmin: true,
    },
    {
        name: "Johnny Boy",
        email: "johnny@example.com",
        password: bcrypt.hashSync("password123", 10),
        isAdmin: false,
    },
    {
        name: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("password123", 10),
        isAdmin: false,
    },
];

export default users;