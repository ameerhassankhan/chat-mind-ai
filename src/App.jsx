import { useState } from "react";
import "./App.css";
import { FULL_URL } from "./constants";
import QueresBlock from "./components/QueresBlock";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQueryByAI = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    try {
      const payload = {
        contents: [{ parts: [{ text: trimmed }] }],
      };

      let response = await fetch(FULL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      const text =
        json?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "No response from AI.";
      let cleanData = text.split("* ");
      cleanData = cleanData.map((item)=> item.trim());
      
      setResult([...result,{type:'q',text:query},{type:'a',text:cleanData}]);
      setQuery("");
    } catch (error) {
      console.error("Error fetching AI response: ", error);
      setResult("Error: " + (error.message || "Failed to fetch"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1">
        <h1 className="text-3xl p-2 my-4">Recent Searches</h1>
      </div>
      <div className="col-span-4 bg-zinc-800 ">
        <div className="container h-120 p-4">
          <h1 className="text-4xl text-pink-500 p-4 m-3">
            Hello Hassan, Ask me Everything!!!!
          </h1> 

          <div className="p-4 m-4 h-3/4 overflow-y-auto">
          {
            result && result.map((item, index) => (
              item.type === 'q'?
              ( 
                <div key={index} className="justify-end flex p-2">
                  <span className="p-1 text-right border-6 border-zinc-700 bg-zinc-700 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl w-fit text-xl">{item.text}</span>
                </div>
              ):
              (
                item.text.map((word,wordID)=>
                  <QueresBlock key={wordID} index={wordID} ans={word} />
                )
              )
              
            ))
          
          }
           
          </div>

          <form
            onSubmit={handleQueryByAI}
            className="flex rounded-4xl text-white bg-zinc-900 p-1 w-75 item-center m-auto mb-4 border border-zinc-700"
          >
            <input
              className="rounded-md h-full w-full p-3 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your prompt here..."
              aria-label="AI prompt"
            />
            <button
              type="submit"
              className="p-2 enter"
              disabled={loading || !query.trim()}
            >
              {loading ? "Processing..." : "Ask"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
