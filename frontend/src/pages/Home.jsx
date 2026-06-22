import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">

          <h1>
            Plan Your Dream
            <span> Trip With AI</span>
          </h1>

          <p>
            Generate itineraries, budgets,
            hotels and packing lists instantly.
          </p>

          <Link to="/register">
            <button className="btn">
              Start Planning
            </button>
          </Link>

        </div>
      </section>

      <section className="features">
        <div className="container">

          <div className="features-grid">

            <div className="feature-card">
              <h3>AI Itinerary</h3>
              <p>
                Generate day-wise plans instantly.
              </p>
            </div>

            <div className="feature-card">
              <h3>Budget Planning</h3>
              <p>
                AI estimates complete trip cost.
              </p>
            </div>

            <div className="feature-card">
              <h3>Hotels</h3>
              <p>
                Smart hotel recommendations.
              </p>
            </div>

            <div className="feature-card">
              <h3>Packing List</h3>
              <p>
                Never forget travel essentials.
              </p>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default Home;