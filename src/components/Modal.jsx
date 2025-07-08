import close from "/close.png";
import noimg from "/noimg.png";
export default function Modal({ article, show, onClose, isLoading }) {
  if (!show) return null;
  console.log(article);
  return (
    <div
      className="hidden xl:flex mx-auto items-center justify-center  bg-stone-900 text-white  z-1000 w-130  h-130 sticky-0 rounded-2xl  fixed -translate-y-45"
      onClick={onClose}
    >
      {article && (
        <div>
          <div className="flex justify-end">
            <img src={close} className="w-8 h-8 -translate-x-2.5 " />
          </div>
          <div className="p-">
            <img
              src={article.urlToImage || noimg}
              alt={article.title}
              className="rounded-xl w-115 mx-auto h-50 "
            />
          </div>
          <div className="flex flex-col gap-2 px-8">
            <h2 className="font-bold ">{article.title}</h2>
            <p className="">Source: {article.source.name}</p>
            <p className="">
              date:{" "}
              {new Date(article.publishedAt).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-xm  ">
              {article.content && article.content.replace("&amp;", "&")}
            </p>

            <a
              className="bg-indigo-700 p-2  text-center w-1/3  text-xl rounded-3xl "
              href={article.url}
              rel="noopener"
              target="_blank"
            >
              Read more
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
