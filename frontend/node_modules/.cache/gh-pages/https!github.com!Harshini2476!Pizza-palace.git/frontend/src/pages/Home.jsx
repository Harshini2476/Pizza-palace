import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PizzaCard from "../components/PizzaCard";
import { pizzaService } from "../services/pizzaService";

import heroImage from "../assets/banners/hero-banner.jpg";

import {
  ArrowRight,
  Award,
  Clock,
  Star,
  Truck,
} from "lucide-react";

const WHY_US = [
  {
    icon: Clock,
    title: "Fast Delivery",
    desc: "30 minutes or it's free. We promise hot, fresh pizza at your door.",
  },
  {
    icon: Award,
    title: "Premium Ingredients",
    desc: "Sourced from artisan producers. Every ingredient chosen for flavor.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On all orders over ₹500. No hidden fees.",
  },
  {
    icon: Star,
    title: "Top Rated",
    desc: "Thousands of happy customers trust our pizzas.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    text: "The pizza was absolutely amazing. Best I've had in years!",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "Carlos R.",
    text: "Fast delivery and delicious taste. Highly recommended.",
    rating: 5,
    avatar: "CR",
  },
  {
    name: "Emily K.",
    text: "Fresh ingredients and great customer service.",
    rating: 5,
    avatar: "EK",
  },
];

function Home() {
  const [featuredPizzas, setFeaturedPizzas] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    pizzaService
      .getAll()
      .then((all) => {
        setFeaturedPizzas(all.slice(0, 4));
      })
      .catch(() => {
        setFeaturedPizzas([]);
      })
      .finally(() => {
        setLoadingFeatured(false);
      });
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="max-w-xl">
            <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full mb-6 text-sm">
              🔥 Now Delivering in 30 Minutes
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Authentic
              <br />
              Italian Taste
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Handcrafted pizzas made with premium ingredients and delivered
              fresh to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition"
              >
                Explore Menu
              </Link>

              <Link
                to="/menu"
                className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pizzas */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-red-600 font-semibold">
                Our Best Sellers
              </p>

              <h2 className="text-4xl font-bold">
                Featured Pizzas
              </h2>
            </div>

            <Link
              to="/menu"
              className="text-red-600 font-semibold flex items-center gap-2"
            >
              See All
              <ArrowRight size={18} />
            </Link>
          </div>

          {loadingFeatured ? (
            <div className="text-center py-10">
              Loading pizzas...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPizzas.map((pizza) => (
                <PizzaCard
                  key={pizza.id}
                  pizza={pizza}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Why Choose Pizza Palace?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-gray-600 italic mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                    {testimonial.avatar}
                  </div>

                  <span className="font-semibold">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Order?
          </h2>

          <p className="text-red-100 mb-8 text-lg">
            Fresh, hot and delicious pizza delivered to your doorstep.
          </p>

          <Link
            to="/menu"
            className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Order Now
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
