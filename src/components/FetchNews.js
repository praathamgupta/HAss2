import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const fetchNews = async (query, setItems, setLargeTitle, setIsLoading) => {
  setIsLoading(true);

  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
    const res = await fetch(url);
    const data = await res.json();
    setItems(data.hits);
    setLargeTitle(data.hits[0]);
  } catch (error) {
    console.error("Error fetching news:", error);
  } finally {
    setIsLoading(false);
  }
};

const FetchNews = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("programming");
  const [text, setText] = useState("");
  const [largeTitle, setLargeTitle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews(query, setItems, setLargeTitle, setIsLoading);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      console.log("Input is empty");
    } else {
      setQuery(text);
      setText("");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="first">
        <h1 className="head">Hacker News</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mb-8"
        >
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Search for something..."
            autoComplete="off"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full py-2 px-4 rounded bg-transparent border border-gray-700 focus:border-gray-600 transition-all duration-150 outline-none text-gray-700 placeholder-gray-700 text-xl lg:text-4xl lg:pb-4 mb-3"
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit"
          >
           Search
            
          </button>
        </form>

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <article className="my-10">
               <h4 className="se">
                {largeTitle.title}
              </h4>
              <a
                href={largeTitle.url}
                target="_blank"
                rel="noreferrer"
                className="border-b border-gray-700 text-gray-600 text-lg hover:text-gray-400 hover:border-gray-400 mb-5"
              >
                Read Full Story
              </a>
            </article>

            <section className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
              {items.map((item) => {
                const { author, created_at, objectID, title, url } = item;

                return (
                  <div key={objectID} className="result-box">
                    <h3 className="font-bold text-white text-lg mb-3">
                      {title}
                    </h3>
                    <article className="flex items-center justify-between">
                      <p className="text-gray-600">
                        By <em>{author}</em>
                      </p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopenner noreferrer"
                        className="border-b border-gray-700 text-gray-600 text-lg hover:text-gray-400 hover:border-gray-400"
                      >
                        Read More
                      </a>
                    </article>
                    <p className="text-gray-400 mt-10">
                      {format(new Date(created_at), "dd MMM yyyy")}
                    </p>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default FetchNews;
