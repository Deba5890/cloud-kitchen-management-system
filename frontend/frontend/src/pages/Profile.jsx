import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

function Profile() {

const user = JSON.parse(localStorage.getItem("user")) || {

name: "Guest User",

email: "guest@example.com",

};

return (

<div className="min-h-screen bg-gray-100 py-10 px-4">

<div className="max-w-4xl mx-auto">

<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

{/* Header */}

<div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white text-center">

<FaUserCircle className="text-8xl mx-auto mb-4" />

<h1 className="text-3xl font-bold">{user.name}</h1>

<p className="text-orange-100 mt-2">Cloud Kitchen Customer</p>

</div>

{/* Details */}

<div className="p-8">

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-gray-50 p-5 rounded-2xl flex items-center gap-4">

<FaEnvelope className="text-orange-500 text-2xl" />

<div>

<p className="text-gray-500 text-sm">Email</p>

<p className="font-semibold">{user.email}</p>

</div>

</div>

<div className="bg-gray-50 p-5 rounded-2xl flex items-center gap-4">

<FaPhoneAlt className="text-orange-500 text-2xl" />

<div>

<p className="text-gray-500 text-sm">Phone</p>

<p className="font-semibold">+91 9876543210</p>

</div>

</div>

<div className="bg-gray-50 p-5 rounded-2xl flex items-center gap-4 md:col-span-2">

<FaMapMarkerAlt className="text-orange-500 text-2xl" />

<div>

<p className="text-gray-500 text-sm">Address</p>

<p className="font-semibold">Bhubaneswar, Odisha, India</p>

</div>

</div>

</div>

{/* Action Buttons */}

<div className="flex flex-col sm:flex-row gap-4 mt-8">

<button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition">

<FaEdit /> Edit Profile

</button>

<button

className="flex-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-bold transition"

onClick={() => {

localStorage.removeItem("token");

localStorage.removeItem("user");

window.location.href = "/login";

}}

>

Logout

</button>

</div>

</div>

</div>

</div>

</div>

);

}

export default Profile;