import Greetings from "./components/Greetings";
import Header from "./components/Header";
import NewsCard from "./components/NewsCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Greetings user="Charles" />
        <NewsCard />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Homepage Recreation - Powered by NewsAPI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
