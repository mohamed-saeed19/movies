import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState([]);

  let navigate = useNavigate();

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    console.log(myUser);
    setUser(myUser);
  }

  function ValidateUserData() {
    let scheme = Joi.object({
      age: Joi.number().integer().positive().greater(14),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setLoading(true);
    let validation = ValidateUserData();
    if (validation.error) {
      setValidationError(validation.error.details);
    } else {
      SendUserDataToApi();
    }
  }
  async function SendUserDataToApi() {
    let { data } = await Axios.post(
      `https://movies-api.routemisr.com/signin`,
      user
    );
    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      saveUserData();
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
      setError(data.message);
    }
  }

  return (
    <>
      <div className="w-75 mx-auto py-3">
        <h3 className="my4">Login form</h3>
        {error.length > 0 ? <p className="text-danger">{error}</p> : ""}
        <form onSubmit={submitLoginForm}>
          <label htmlFor="email">E-mail :</label>
          <input
            onChange={getUserData}
            className="form-control my-input my-3"
            type="email"
            id="email"
            name="email"
          />
          <p className="text-danger">
            {
              validationError.filter(
                (error) => error.context.label === "email"
              )[0]?.message
            }
          </p>

          <label htmlFor="password">Password :</label>
          <input
            onChange={getUserData}
            className="form-control my-input my-3"
            type="password"
            id="password"
            name="password"
          />
          {validationError.map((error, index) => {
            if (error.context.label === "password") {
              return (
                <p key={index} className="text-danger">
                  enter a valid password
                </p>
              );
            }
          })}

          <button
            onClick={submitLoginForm}
            type="submit"
            className="btn btn-info"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
