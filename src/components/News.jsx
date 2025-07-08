import { useEffect, useState } from "react";
import loading from "/loading2.gif";
import Modal from "./Modal";
import noimg from "/noimg.png";
export default function News() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const [headline, setHeadline] = useState([]);
  const [news, setNews] = useState([]);
  const categories = [
    "BUSINESS",
    "ENTERTAINMENT",
    "GENERAL",
    "HEALTH",
    "SCIENCE",
    "SPORTS",
    "TECHNOLOGY",
  ];
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setShowModal(false);
      const url = `https://newsapi.org/v2/top-headlines?language=en&country=us&category=${selectedCategory}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const fetchedNews = data.articles;

      setIsLoading(false);
      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));
    };

    fetchNews();
  }, [selectedCategory]);
  function handleCategoryClick(e, category) {
    e.preventDefault();
    setSelectedCategory(category);
  }
  function handleArticleClick(article) {
    setSelectedArticle(article);
    setShowModal(true);
  }

  return (
    <div className="mx-auto  items-center justify-center  overflow-x-hidden  flex flex-col w-full overflow-y-hidden bg-gradient-to-t from-slate-900 to-rose-800">
      <div className=" w-full   flex  flex-col    bg-black xl:rounded-3xl  lg:mt-4 lg:mb-4  xl:w-10/12 xl:h-225 ">
        <div className="xl:text-3xl  w-full text-white tracking-widest  xl:rounded-t-xl xl:pl-4     xl:flex   ">
          <h1 className=" xl:text-3xl xl:pl-2 text-center text-xl md:text-2xl   xl:tracking-[0.5rem] font-bold">
            News App
          </h1>
        </div>
        <div className="w-full grid grid-col xl:flex xl:flex-row    ">
          <nav className="      xl:w-75    xl:flex  xl:flex-col   lg:space-y-10    xl:px-4 ">
            <div className=" grid grid-cols-2 gap-3 px-4 py-4 lg:text-xl lg:flex lg:flex-row lg:justify-evenly xl:flex xl:flex-col xl:space-y-10       text-white xl:w-55           backdrop-blur-3xl     xl:rounded-3xl xl:h-215">
              <h1 className="xl:text-center xl:text-2xl    hidden xl:flex  text-pink-900 xl:tracking-[0.4rem] xl:font-extrabold">
                Categories
              </h1>
              {categories.map((item, index) => (
                <a
                  href="#"
                  key={index}
                  onClick={(e) => handleCategoryClick(e, item)}
                >
                  {item}
                </a>
              ))}
              <h3 className="xl:pt-20 hidden xl:flex xl:flex-col ">
                <span className="xl:font-light xl:text-2xl text-indigo-900 xl:tracking-[0.4rem]">
                  {" "}
                  UnimaDesign
                </span>
                All Rights Reserved &copy; 2025
              </h3>
            </div>
          </nav>

          <div className=" mt-5  xl:mt-0    ">
            {headline && (
              <div
                className="xl:w-220 mt-5 xl:mt-0 mb-15 xl:mb-5  xl:grid xl:items-end  "
                onClick={() => handleArticleClick(headline)}
              >
                {isLoading ? (
                  <div className="h-60 md:w-full   md:h-full lg:rounded-t-xl   lg:mx-auto xl:w-210 xl:h-85 bg-black ">
                    <img
                      src={loading}
                      className="mx-auto items-center justify-center w-20 h-20 mt-20 "
                    />
                  </div>
                ) : (
                  <img
                    className="h-60 md:w-full   md:h-full lg:rounded-t-xl   lg:mx-auto xl:w-210 xl:h-85 w-full"
                    alt={headline.title}
                    src={headline.urlToImage}
                  />
                )}

                <h2 className="absolute xl:translate-x-5  bg-black/80    text-white     md:px-4 md:text-xl  xl:w-210 ">
                  {headline.title}
                </h2>
              </div>
            )}

            <div className="w-full   grid  md:grid-cols-2 gap-2  md:gap-2 xl:gap-2 lg:grid-cols-3 xl:px-4 mb-2  ">
              {news.map((item, index) => (
                <div
                  onClick={() => handleArticleClick(item)}
                  key={index}
                  className="w-full  h-60 xl:h-60 relative    grid items-end  "
                >
                  <img
                    className="w-full h-60 xl:rounded-t-2xl xl:h-60 xl:rounded-b-2xl   "
                    src={item.urlToImage}
                    alt={item.title}
                  />

                  <h3 className="text-white  bg-black/80 px-2   xl:h-12 xl:rounded-b-1xl absolute  w-full">
                    {item.title.slice(0, 50) + "..."}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        article={selectedArticle}
        onClose={() => setShowModal(false)}
        isLoading={isLoading}
      />
    </div>
  );
}
