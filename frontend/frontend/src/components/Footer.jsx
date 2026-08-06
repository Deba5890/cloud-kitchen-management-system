function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-orange-500">
            🍽 Cloud Kitchen
          </h2>

          <p className="mt-4 text-gray-400">
            Delicious food delivered to your doorstep with quality,
            freshness and fast delivery.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Menu</li>
            <li>Orders</li>
            <li>Profile</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Contact</h3>

          <p className="text-gray-400">
            📍 Bhubaneswar, Odisha
          </p>

          <p className="text-gray-400">
            📧 support@cloudkitchen.com
          </p>

          <p className="text-gray-400">
            📞 +91 9876543210
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 py-4 text-center text-gray-400">
        © 2026 Cloud Kitchen. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;