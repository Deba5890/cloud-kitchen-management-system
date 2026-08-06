import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
function Register() {

const navigate = useNavigate();

const [formData, setFormData] = useState({

name: "",

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

await API.post("/auth/register", formData);
toast.success("Account Created Successfully 🎉");
navigate("/login");

} catch (error) {

console.log(error.response?.data || error);
toast.error(error.response.data.message);
} finally {

setLoading(false);

}

};

return (

<div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-50 flex justify-center items-center px-4">

<div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

<div className="text-center mb-8">

<h1 className="text-4xl font-bold text-orange-500">

Create Account

</h1>

<p className="text-gray-500 mt-2">

Join Cloud Kitchen today

</p>

</div>

<form onSubmit={handleSubmit} className="space-y-5">

<div className="relative">

<FaUser className="absolute left-4 top-4 text-gray-400" />

<input

type="text"

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-orange-400 outline-none"

required

/>

</div>

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

{loading ? "Creating Account..." : "Register"}

</button>

</form>

<p className="text-center mt-6 text-gray-600">

Already have an account?{" "}

<Link to="/login" className="text-orange-500 font-semibold">

Login

</Link>

</p>

</div>

</div>

);

}

export default Register;