import { postUsers } from "../Models/postUsers.js";

export const fetchUser = async (req, res) => {
    try {
        const user = await postUsers.findById(req.user._id, {
            name: 1,
            email: 1
        });

        if (!user)
            return res.send({ ok: false, message: "User not found" });

        res.send({ ok: true, data: user });

    } catch (err) {
        console.log(err);
        res.send({ ok: false, message: "Failed to fetch user" });
    }
};
