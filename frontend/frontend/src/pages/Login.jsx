import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {

const navigate = useNavigate();

const [formData, setFormData] = useState({

email: "",

password: "",

});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {

setFormData({

...formData,

[e.target.name]: e.target.value,

});

};

const handleSubmit = async (e) => {

e.preventDefault();

try {

setLoading(true);

const res = await API.post("/auth/login", formData);
console.log("LOGIN RESPONSE:", res.data);
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));
toast.success("Login Successfully🎉");
if (res.data.user.role === "admin") {
  navigate("/admin/menu");
} else {

navigate("/");
}

} catch (error) {

console.log(error.response?.data || error);
toast.error("Invalid Email or Password");

} finally {

setLoading(false);

}

};

return (

<div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-50 flex justify-center items-center px-4">

<div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

<div className="text-center mb-8">

<h1 className="text-4xl font-bold text-orange-500">

Cloud Kitchen

</h1>

<p className="text-gray-500 mt-2">

Welcome back! Please login

</p>

</div>

<form onSubmit={handleSubmit} className="space-y-5">

<div className="relative">

<FaEnvelope className="absolute left-4 top-4 text-gray-400" />

<input

type="email"

name="email"

placeholder="Email Address"

value={formData.email}

onChange={handleChange}

className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"

required

/>

</div>

<div className="relative">

<FaLock className="absolute left-4 top-4 text-gray-400" />

<input

type="password"

name="password"

placeholder="Password"

value={formData.password}

onChange={handleChange}

className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"

required

/>

</div>

<button

type="submit"

disabled={loading}

className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-lg font-bold transition disabled:opacity-50"

>

{loading ? "Logging in..." : "Login"}

</button>

</form>

<p className="text-center mt-6 text-gray-600">

Don't have an account?{" "}

<Link to="/register" className="text-orange-500 font-semibold">

Register

</Link>

</p>

</div>

</div>

);

}

export default Login;