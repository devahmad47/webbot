import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupRequest, signupSuccess, signupFailure } from "../../StoreRedux/adminSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp } from "react-icons/fa";

const serverUrl = process.env.REACT_APP_Server_Url;

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin); // Accessing the admin state
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(signupRequest());

    try {
      const response = await axios.post(`${serverUrl}/api/admin/signup`, {
        name,
        email,
        phone,
        country,
        password,
      });
      if (response && response.status === 200) {
        toast.success("SignUp Success");
        dispatch(signupSuccess(response.data.admin));
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error("Signup failed. Please try again.");
        dispatch(signupFailure(error.response.data.message)); // Dispatching failure with error message
      } else {
        dispatch(signupFailure("Failed to Sign Up")); // Fallback error message
      }
    }
  };

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex items-center justify-center">
            <FaWhatsapp className="text-green-400 h-12 w-12" />
              <h2 className="my-2 text-center text-2xl font-bold leading-9 tracking-tight text-purple-500">
             WhatsApp Admin Panel
              </h2>
            </div>
            <h2 className="my-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign-Up
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>

              <div className="col-span-2 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-5"
                >
                  {passwordVisible ? <LockOpenIcon className="h-5 w-5 text-gray-500" /> : <LockClosedIcon className="h-5 w-5 text-gray-500" />}
                </button>
              </div>

              <div className="col-span-2 relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-5"
                >
                  {confirmPasswordVisible ? <LockOpenIcon className="h-5 w-5 text-gray-500" /> : <LockClosedIcon className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="#" className="text-gray-700 underline">terms and conditions</a> and{" "}
                <a href="#" className="text-gray-700 underline">privacy policy</a>.
              </p>
            </div>

            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <button
                type="submit"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
              <p className="text-sm mt-4 sm:mt-0">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline">Log in</Link>
              </p>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
