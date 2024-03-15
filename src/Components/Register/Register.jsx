import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
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
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().integer().positive().greater(14),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  function submitRegistrationForm(e) {
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
      `https://movies-api.routemisr.com/signup`,
      user
    );
    if (data.message === "success") {
      setLoading(false);
      navigate("/login");
    } else {
      setLoading(false);
      setError("data.message");
    }
  }

  return (
    <>
      <div className="w-75 mx-auto py-3">
        <h3 className="my4">Registeration form</h3>
        {error.length > 0 ? <p className="text-danger">{error}</p> : ""}

        <form onSubmit={submitRegistrationForm}>
          <label htmlFor="password">First Name :</label>
          <input
            onChange={getUserData}
            className="form-control my-input my-3"
            type="text"
            id="first_name"
            name="first_name"
          />
          <p className="text-danger">
            {
              validationError.filter(
                (error) => error.context.label === "first_name"
              )[0]?.message
            }
          </p>

          <label htmlFor="last_name">Last Name :</label>
          <input
            onChange={getUserData}
            className="form-control my-input my-3"
            type="text"
            id="last_name"
            name="last_name"
          />
          <p className="text-danger">
            {
              validationError.filter(
                (error) => error.context.label === "last_name"
              )[0]?.message
            }
          </p>

          <label htmlFor="age">Age :</label>
          <input
            onChange={getUserData}
            className="form-control my-input my-3"
            type="number"
            id="age"
            name="age"
          />
          <p className="text-danger">
            {
              validationError.filter(
                (error) => error.context.label === "age"
              )[0]?.message
            }
          </p>

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
            onClick={submitRegistrationForm}
            type="submit"
            className="btn btn-info"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
