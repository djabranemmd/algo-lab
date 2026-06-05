import { useParams } from "react-router-dom";

function AlgorithmPage() {
  const { slug } = useParams();

  return (
    <section className="container-page">
      <div className="glass-card">
        <h1 className="text-4xl font-bold mb-4">
          {slug}
        </h1>

        <p className="text-white/70">
          Algorithm visualizer page.
        </p>
      </div>
    </section>
  );
}

export default AlgorithmPage;