
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-orange-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 items-center gap-8">


          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Delicious Food

              <br />

              Delivered

              <span className="text-yellow-300">

                {" "}Fast

              </span>

            </h1>

            <p className="mt-6 text-lg">

              Order your favourite meals from the best cloud kitchen.

            </p>
            <button
              onClick={() => navigate("/menu")}
              className="mt-8 bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
             >
             Order Now
          </button>

           

          </div>

          <div>

            <img

              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
                className="w-full max-w-xl mx-auto rounded-xl shadow-xl"



            />

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;