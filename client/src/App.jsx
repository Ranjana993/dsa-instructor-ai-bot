import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setAnswer("");
  }, []);

  const fetchAnswer = async (q) => {
    if (!q.trim()) return;

    setLoading(true);
    setHasInteracted(true);
    try {
      // http://localhost:5000/  https://dsa-instructor-ai-bot-backend.onrender.com/api/ask
      const res = await axios.post("https://dsa-instructor-ai-bot-server.onrender.com/api/ask ", {
        question: q,
      });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchAnswer, 700), []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedFetch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      debouncedFetch.cancel();
      fetchAnswer(query);
    }
  };

  const handleClear = () => {
    setQuery("");
    setAnswer("");
    setHasInteracted(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col overflow-hidden">
      {/* Header - Made more compact */}
      <div className="shrink-0 px-4 pt-6 pb-2">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-block px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs font-medium shadow-sm mb-2">
              DSA Interview Mentor
            </div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Algorithmic Reasoning Assistant
            </h1>

            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              Structured explanations with optimal solutions and complexity analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Increased height */}
      <div className="flex-1 overflow-hidden px-4">
        <div className="h-full w-full max-w-6xl mx-auto flex flex-col">
          {/* Answer Area - Larger content area */}
          <div className="flex-1 min-h-0 rounded-lg bg-white shadow-sm overflow-hidden mb-4">
            <div className="h-full overflow-y-auto">
              {loading ? (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="h-12 w-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-indigo-700 font-medium text-lg">
                        Analyzing optimal approaches
                      </div>
                      <p className="text-gray-500 text-xs">
                        Evaluating time and space complexity
                      </p>
                    </div>
                  </div>
                </div>
              ) : answer ? (
                <div className="p-6">
                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {answer}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8">
                  {/* Empty state - minimal */}
                </div>
              )}
            </div>
          </div>

          {/* Input Section - More compact */}
          <div className="shrink-0 pt-4 pb-6">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask a DSA question (e.g., Two Sum, Binary Search, Dynamic Programming...)"
                  value={query}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="
                    w-full rounded-lg border border-gray-300
                    bg-white
                    px-5 py-3 text-sm
                    shadow-sm
                    focus:outline-none focus:ring-2
                    focus:ring-indigo-300 focus:border-transparent
                    transition-all duration-200
                    hover:border-indigo-300
                  "
                  autoFocus={hasInteracted}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {query.trim() && (
                    <button
                      onClick={handleClear}
                      className="text-gray-400 hover:text-gray-600 transition p-1"
                      aria-label="Clear input"
                    >
                      ✕
                    </button>
                  )}
                  <div className="flex items-center gap-1 text-xs text-indigo-500 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                    <span>⏎</span>
                    <span>Enter</span>
                  </div>
                </div>
              </div>

              {/* Suggestions - More compact */}
              <div className="space-y-2">
                <div className="text-center text-xs text-gray-500 font-medium">
                  Common questions:
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => {
                      setQuery("Time complexity of Binary Search");
                      fetchAnswer("Time complexity of Binary Search");
                    }}
                    className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition font-medium text-xs"
                  >
                    Binary Search
                  </button>
                  <button
                    onClick={() => {
                      setQuery("Linked List vs Array trade-offs");
                      fetchAnswer("Linked List vs Array trade-offs");
                    }}
                    className="px-3 py-1.5 rounded-md bg-purple-50 text-purple-600 hover:bg-purple-100 transition font-medium text-xs"
                  >
                    Linked List
                  </button>
                  <button
                    onClick={() => {
                      setQuery("Optimal Two Sum solution");
                      fetchAnswer("Optimal Two Sum solution");
                    }}
                    className="px-3 py-1.5 rounded-md bg-pink-50 text-pink-600 hover:bg-pink-100 transition font-medium text-xs"
                  >
                    Two Sum
                  </button>
                  <button
                    onClick={() => {
                      setQuery("Dynamic Programming principles");
                      fetchAnswer("Dynamic Programming principles");
                    }}
                    className="px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition font-medium text-xs"
                  >
                    Dynamic Programming
                  </button>
                </div>
              </div>

              {/* Footer - Smaller */}
              <div className="text-center text-xs text-gray-400 pt-2">
                Include constraints and edge cases for detailed analysis
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
