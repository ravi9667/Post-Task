import React, { useState } from "react";
import Loader from "../../ReusableComponents/Loader/Loader";
import show from "../../assets/eye.png";
import hide from "../../assets/hide.png";
import { useNavigate } from "react-router";
import logo from "../../assets/peercoin.png";
import userIcon from "../../assets/user.png";
import emailIcon from "../../assets/mail.png";
import passIcon from "../../assets/padlock.png";
import illustration from "../../assets/login-illustration.png";
import { postRequest } from "../../apiRoutes";
import "./Signup.scss";

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [error, setError] = useState("");
    const [signupFormData, setSignupFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleFormInput = (field, event) => {
        setSignupFormData({ ...signupFormData, [field]: event.target.value });
    };

    const handleSignup = async () => {
        const { name, email, password } = signupFormData;

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("All fields are required");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const data = await postRequest("http://127.0.0.1:5555/signup", signupFormData);

            console.log("Signup Response:", data);

            if (data.ok) {
                localStorage.setItem("token", data.token);
                alert("Signup Successful!");
                navigate("/login");
            } else {
                setError(data.message || "Signup failed");
            }

        } catch (err) {
            console.error("Signup Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="signup-container">
            <div className="signup-main">
                <div className="signup-card">
                    <div className="blogger">
                        <img src={logo} alt="Blogger-logo" width={40} height={40} />
                        <h1 className="blogger-Heading">Post</h1>
                    </div>
                    <div>
                        <h1>Create Account</h1>
                        <p>Join Posts today</p>
                    </div>

                    <div className="input-group group-1">
                        <img src={userIcon} alt="" className="user-icon" />
                        <input
                            type="text"
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("name", e)}
                            value={signupFormData.name}
                        />
                        <label>Name</label>
                    </div>
                    <div className="input-group group-2">
                        <img src={emailIcon} alt="" className="email-icon" />
                        <input
                            type="email"
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("email", e)}
                            value={signupFormData.email}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-group group-3">
                        <img src={passIcon} alt="" className="password-icon" />
                        <input
                            type={isPasswordHidden ? "password" : "text"}
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("password", e)}
                            value={signupFormData.password}
                        />
                        <label>Password</label>
                        {signupFormData.password.trim().length ? (
                            <img
                                src={isPasswordHidden ? hide : show}
                                alt="Eye Icon"
                                className="showIcon"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            />
                        ) : null}
                    </div>
                    <button onClick={handleSignup}>Sign Up</button>
                    <p>
                        Already have an Account?{" "}
                        <button onClick={() => navigate("/login")}>Sign In</button>
                    </p>
                </div>
            </div>

            <div className="signup-bg">
                <img src={illustration} alt="" className="signup-illustrations" />
            </div>
        </div>
    );
};

export default Signup;
