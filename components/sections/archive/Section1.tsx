"use client"
import Link from 'next/link'
import Pagination from '@/components/elements/Pagination';
import { useState, useEffect } from 'react';
import moment from 'moment';


const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""

export default function Section1() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${APP_URL}/blog/posts/?page=${currentPage}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setArticles(data.results);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [APP_URL, currentPage]);

  const articlesPerPage = 12; // must match DRF pagination page_size
  const totalPages = Math.ceil(count / articlesPerPage);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div
      className='justify-content-center align-items-center'
      style={{ height: '50vh', display: 'flex' }}

    >
      Loading...
    </div>;
  }

  // get the first article with the fields needed for the featured section
  const featuredArticle = articles[0];
  // get all the articles except the first one for the AllArticles section
  const AllArticles = articles.slice(1);

  return (

    <>

      <div className="content-widget">
        <div className="container">
          {/*Begin Archive Header*/}
          <div className="row">
            <div className="col-12 archive-header text-center pt-3 pb-3">
              <h1 className="mb-3">The Ascent of The Millions</h1>
            </div>
          </div>
          <div className="divider" />
          {/*End Archive Header*/}
          {/*Begin Featured Post*/}

          <div className="row justify-content-between post-has-bg ml-0 mr-0">
            <div
              className="col-lg-6 col-md-4 bgcover d-none d-md-block pl-md-0 ml-0"
              style={{
                backgroundImage: `url(${featuredArticle?.featured_image})`,
                minHeight: 400,
                objectFit: "cover",
              }}
            />
            <div className="col-lg-6 col-md-8">
              <div className="pt-5 pb-5 ps-md-5 pe-5 align-self-center">
                <div className="capsSubtle mb-2">{`Featured Article`}</div>
                <h2 className="entry-title mb-3">
                  <Link href={`/article/${featuredArticle?.slug}`}>{featuredArticle?.title}</Link>
                </h2>
                <div className="entry-excerpt">
                  <p>
                    {featuredArticle?.content.length > 300
                      ? featuredArticle?.content.slice(0, 300) + "..."
                      : featuredArticle?.content
                    }
                  </p>
                </div>
                <div className="entry-meta align-items-center">
                  <Link href={`/author/${featuredArticle?.author?.id}`}>{featuredArticle?.author?.user.first_name}</Link> in <Link href={`/categories/${featuredArticle?.category?.slug}`}>{featuredArticle?.category?.name}</Link>
                  <br />
                  <span>{moment(featuredArticle?.published_date).format("MMMM D, YYYY")}</span>
                  <span className="middotDivider" />
                  <span className="readingTime" title={featuredArticle?.read_time}>
                    {featuredArticle?.read_time} min read
                  </span>
                  <span className="svgIcon svgIcon--star">
                    <svg className="svgIcon-use" width={15} height={15}>
                      <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />
          {/*End Featured Post*/}
          <div className="row">
            {AllArticles.map((article, idx) => (
              <article key={idx} className="post-list-style-2 mb-5 col-md-4">
                <Link href={`/article/${article.slug}`}>
                  <figure
                    className="bgcover d-none d-md-block"
                    style={{
                      backgroundImage: `url(${article.featured_image})`,
                      minHeight: 200,
                    }}
                  />
                </Link>
                <h3 className="entry-title mb-3">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <div className="entry-excerpt">
                  <p>
                    {article.content.length > 200
                      ? article.content.slice(0, 200) + "..."
                      : article.content
                    }
                  </p>
                </div>
                <div className="entry-meta align-items-center">
                  <Link href={`/author/${article.author?.id}`}>{article.author?.user.first_name}</Link> in <Link href={`/categories/${article.category?.slug}`}>{article.category?.name}</Link>
                  <br />
                  <span>
                    {moment(article.published_at).format("MMM DD, YYYY")}
                  </span>
                  <span className="middotDivider" />
                  <span className="readingTime" title={article.read_time}>
                    {article.read_time} min read
                  </span>
                  <span className="svgIcon svgIcon--star">
                    <svg className="svgIcon-use" width={15} height={15}>
                      <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        {/*content-widget*/}
      </div>
      {/*content-widget*/}
    </>
  );
}
