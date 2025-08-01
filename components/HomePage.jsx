import Navbar from "./Navbar"; // Adjust the import path if necessary

const HomePage = () => {
  return (
    <div>
      {/* Include Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20">
        <section className="text-center py-16 bg-gray-50">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to StyleMatch</h1>
          <p className="text-gray-600 mt-4">
            Transform your room with our AI-powered interior design tools.
          </p>
          <div className="mt-8">
            <button className="bg-decor-accent text-white text-sm px-6 py-3 rounded-md hover:bg-decor-accent/90">
              Get Started
            </button>
            <button className="ml-4 text-decor-accent border border-decor-accent text-sm px-6 py-3 rounded-md hover:bg-decor-light">
              Learn More
            </button>
          </div>
        </section>

        <section className="py-16 bg-white">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Our Products</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <div className="p-6 shadow-md border rounded-md">
              <h3 className="font-bold text-lg">Product 1</h3>
              <p className="text-gray-600 mt-2">Description of Product 1.</p>
            </div>
            <div className="p-6 shadow-md border rounded-md">
              <h3 className="font-bold text-lg">Product 2</h3>
              <p className="text-gray-600 mt-2">Description of Product 2.</p>
            </div>
            <div className="p-6 shadow-md border rounded-md">
              <h3 className="font-bold text-lg">Product 3</h3>
              <p className="text-gray-600 mt-2">Description of Product 3.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>© 2025 DecorMind. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
