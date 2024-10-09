import React, { useEffect, useState } from "react";
import "../Register/register.css";
import google from "../../../src/assets/google.png";
import apple from "../../../src/assets/apple-logo.png";
import man from "../../../src/assets/man2.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import config from "../../../config";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const Rigster = () => {
  const [loading, setLoading] = useState(false);
  const [Erroremail, setError] = useState("");
  const [Errorphone, setErrorphone] = useState("");
  // const [Error, setError] = useState('');
  const MySwal = withReactContent(Swal);
  const [years, setYears] = useState([]);
  const start_year = 1950;
  const current_year = new Date().getFullYear();
  const navigate = useNavigate();
  useEffect(() => {
    const yearsList = [];
    for (let year = current_year; year >= start_year; year--) {
      yearsList.push(year);
    }
    setYears(yearsList);
  }, []);
  // Alert functions
  const showAlert = () => {
    MySwal.fire({
      title: "Welcome!",
      text: "You have successfully registered.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const showAlertFailed = () => {
    MySwal.fire({
      title: "Sorry!",

      text: Erroremail ? Erroremail : "Regesteration Faild",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      country_id: "",
      city_id: "",
      date_of_birth: "",
      gender: "",
      day: "",
      month: "",
      year: "",
    },
    onSubmit: async (values) => {
      // Construct the date_of_birth dynamically from day, month, year
      const date_of_birth = `${values.year}-${values.month}-${values.day}`;

      const payload = {
        ...values,
        date_of_birth,
      };

      setLoading(true);
      try {
        const res = await axios.post(
          `${config.basUrl}/api/customers/register`,
          payload
        );
        showAlert();
        navigate("/");
      } catch (error) {
        showAlertFailed();
        setError(error.response.data.errors.email);
        setErrorphone(error.response.data.errors.phone);
        console.log(error)
      } finally {
        setLoading(false);
        formik.resetForm;
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = "Your first name is required!";
      }
      if (!values.last_name) {
        errors.last_name = "Your last name is required!";
      }
      if (!values.email) {
        errors.email = "Your email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address!";
      }
      if (!values.password) {
        errors.password = "Your password is required!";
      }
      if (values.password.length < 8) {
        errors.password = "The password must be at least 8 characters.";
      }
      if (values.password !== values.password_confirmation) {
        errors.password_confirmation = "Passwords do not match!";
      }
      if (!values.day) {
        errors.day = "Your day is required!";
      }
      if (!values.phone) {
        errors.phone = "Your phone is required!";
      }
      if (!values.country_id) {
        errors.country_id = "Your country is required!";
      }
      if (!values.city_id) {
        errors.city_id = "Your city is required!";
      }
      if (!values.month) {
        errors.month = "Your month is required!";
      }
      if (!values.year) {
        errors.year = "Your year is required!";
      }
      if (!values.gender) {
        errors.gender = "Your gender is required!";
      }
      return errors;
    },
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get(`${config.basUrl}/api/countries`);
      setCountries(response.data.countries);
    } catch (error) {
      console.log("No country data found.");
    }
  };

  const getCities = async (country_id) => {
    try {
      const response = await axios.get(
        `${config.basUrl}/api/cities-of-country/${country_id}`
      );
      setCities(response.data.cities);
    } catch (error) {
      console.log("No city data found for this country.");
    }
  };

  useEffect(() => {
    getCountries();
    formik.resetForm
  }, [],Rigster);
  return (
    <div className="Register">
      <div className="form-register">
        <h3>Let’s Get Started!</h3>
        <h2>
          Create A new Account to Join <span>Reach</span>
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
          />
          {formik.errors.first_name && (
            <small className="error">{formik.errors.first_name}</small>
          )}
          {formik.errors.last_name && (
            <small className="error">{formik.errors.last_name}</small>
          )}

          <input
            type="email"
            placeholder="Your Email"
            name="email"
            className="long-input"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <small className="error">{formik.errors.email}</small>
          )}
          {Erroremail&& (
            <small className="error">{Erroremail}</small>
          )}

          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className="long-input"
            onChange={formik.handleChange}
            value={formik.values.phone}
            maxLength={11}
          />
          {formik.errors.phone && (
            <small className="error">{formik.errors.phone}</small>
          )}
          {Errorphone && ( 
            <small className="error">{Errorphone}</small>
          )}

          <input
            type="password"
            placeholder="New Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            onChange={formik.handleChange}
            value={formik.values.password_confirmation}
          />
          {formik.errors.password && (
            <small className="error">{formik.errors.password}</small>
          )}
          {formik.errors.password_confirmation && (
            <small className="error">
              {formik.errors.password_confirmation}
            </small>
          )}

          {/* Country and City Selection */}
          <div className="region">
            <div className="country">
              <label>Your Country</label>
              <select
                name="country_id"
                id="country"
                onChange={(e) => {
                  formik.handleChange(e);
                  const selectedcountry_id = e.target.value;
                  getCities(selectedcountry_id);
                }}
                value={formik.values.country_id}
              >
                <option value="" hidden>
                  Select Country
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="city">
              <label>Your City</label>
              <select
                name="city_id"
                id="city"
                onChange={formik.handleChange}
                value={formik.values.city_id}
              >
                <option value="" hidden>
                  Select City
                </option>
                {cities.length === 0 ? (
                  <option>No cities available</option>
                ) : (
                  cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name_en}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>
          {formik.errors.country_id && (
            <small className="error">{formik.errors.country_id}</small>
          )}
          {formik.errors.city_id && (
            <small className="error">{formik.errors.city_id}</small>
          )}
          {/* Date of Birth */}
          <label>Date Of Birth</label>
          <div className="age">
            <select
              name="day"
              id="day"
              onChange={formik.handleChange}
              value={formik.values.day}
            >
              <option value="" hidden>
                Day
              </option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              name="month"
              id="month"
              onChange={formik.handleChange}
              value={formik.values.month}
            >
              <option value="" hidden>
                Month
              </option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              name="year"
              id="year"
              onChange={formik.handleChange}
              value={formik.values.year}
            >
              <option value="" hidden>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {formik.errors.day && (
            <small className="error">{formik.errors.day}</small>
          )}
          {formik.errors.month && (
            <small className="error">{formik.errors.month}</small>
          )}
          {formik.errors.year && (
            <small className="error">{formik.errors.year}</small>
          )}

          {/* Gender */}
          <label>Gender</label>
          <div className="gender">
            <input
              type="radio"
              name="gender"
              id="gender-male"
              value="male"
              onChange={formik.handleChange}
            />
            <label htmlFor="gender-male">Male</label>

            <input
              type="radio"
              name="gender"
              id="gender-female"
              value="female"
              onChange={formik.handleChange}
            />
            <label htmlFor="gender-female">Female</label>
          </div>
          {formik.errors.gender && (
            <small className="error">{formik.errors.gender}</small>
          )}

          {loading ? (
            <input className="btn-login" type="submit" value="sending...." />
          ) : (
            <input className="btn-login" type="submit" value="Register" />
          )}
          <small>
            By clicking sign up, you agree to our{" "}
            <span>Terms, Privacy Policy and Cookies Policy</span>, and you may
            receive SMS notifications from us, which you can opt out of at any
            time.
          </small>

          <div className="login-icon">
            <Link to="/">
              <img className="log-icon" alt="google" src={google} />
            </Link>
            <Link to="/">
              <img className="log-icon" alt="icloud" src={apple} />
            </Link>
          </div>

          <p>
            Already have an account?
            <Link to="/">
              <span> Login</span>
            </Link>
          </p>
        </form>
      </div>

      <div className="reg-img">
        <img className="login-img" src={man} alt="Welcome image" />
      </div>
    </div>
  );
};
