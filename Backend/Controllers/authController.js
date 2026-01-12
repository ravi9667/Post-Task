import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { postUsers } from "../Models/postUsers.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.send({ ok: false, message: "All fields required" });

        const exists = await postUsers.findOne({ email });
        if (exists)
            return res.send({ ok: false, message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await postUsers.create({
            name,
            email,
            password: hashed
        });

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.send({ ok: true, message: "Signup Successful", token });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Signup Failed" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).send({ ok: false, message: "All fields required" });

        const user = await postUsers.findOne({ email });
        if (!user)
            return res.status(400).send({ ok: false, message: "Email not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.send({ ok: false, message: "Incorrect password" });

        const token = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.send({ ok: true, message: "Login Successful", token });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Login Failed" });
    }
};
