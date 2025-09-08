'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import moment from 'moment';
import DOMPurify from "dompurify";


import { useParams } from 'next/navigation'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""


export default function Section1() {
  interface ArticleData {
    category_name: string;
    posts: {
      results: any[]; // 👈 instead of a full Post type
      [key: string]: any;
    };
    [key: string]: any;
  }


  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const { slug } = useParams<{ slug: string }>();


  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await fetch(`${APP_URL}/blog/categories/${slug}/posts/`);
        if (!response.ok) throw new Error("Failed to fetch article");
        const data = await response.json();
        setArticleData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();

  }, [slug]);

  const mainArticle = articleData?.posts.results[0] ? articleData.posts.results[0] : null;
  const sideArticles = articleData?.posts.results.slice(1) ? articleData.posts.results.slice(1, 12) : [];

  // get those posts from the catagorydata with popular=true
  const popularArticles = articleData?.posts.results.filter((post: any) => post.popular).slice(0, 5);

  return (
    <>

      <div className="content-widget">
        {loading && (
          <div
            className='justify-content-center align-items-center'
            style={{ height: '50vh', display: 'flex' }}
          >
            Loading...
          </div>
        )}

        {!loading && articleData && (
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h4 className="spanborder">
                  <span>{articleData?.category_name}</span>
                </h4>

                {
                  mainArticle && (
                    <article className="first mb-3">
                      <figure>
                        <Link href={`/article/${mainArticle?.slug}`}>
                          <Image
                            src={mainArticle?.featured_image}
                            alt={mainArticle?.title}
                            width={736}
                            height={520}
                            style={{
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                        </Link>
                      </figure>
                      <h1 className="entry-title mb-3">
                        <Link href={`/article/${mainArticle?.slug}`}>{mainArticle?.title}</Link>
                      </h1>
                      <div className="entry-excerpt">
                        <p>
                          {/* {mainArticle?.content.length > 300
                        ? mainArticle?.content.slice(0, 300) + "..."
                        : mainArticle?.content
                      } */}
                          <div className="blog-content">
                            {mainArticle?.content ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    mainArticle.content.length > 150
                                      ? mainArticle.content.slice(0, 150) + "..."
                                      : mainArticle.content
                                  ),
                                }}
                              />
                            ) : null}
                          </div>
                        </p>
                      </div>
                      <div className="entry-meta align-items-center">
                        <Link className="author-avatar" href="#">
                          <Image
                            src={mainArticle?.author?.image || ''}
                            alt="author avatar"
                            width={40}
                            height={40}
                          />
                        </Link>
                        <Link href={`/author/${mainArticle?.author?.id}`}>{mainArticle?.author?.user.first_name}</Link> in <Link href={`/categories/${mainArticle?.category?.slug}`}>{mainArticle?.category?.name}</Link>
                        <br />
                        <span>{moment(mainArticle?.date).format("MMMM D")}</span>
                        <span className="middotDivider" />
                        <span className="readingTime" title={mainArticle?.read_time}>
                          {mainArticle?.read_time} min read
                        </span>
                        <span className="svgIcon svgIcon--star">
                          <svg className="svgIcon-use" width={15} height={15}>
                            <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z" />
                          </svg>
                        </span>
                      </div>
                    </article>
                  )
                }

                <div className="divider" />
                {sideArticles?.map((article: any, idx: any) => (
                  <article key={idx} className="row justify-content-between mb-5 mr-0">
                    <div className="col-md-9 ">
                      <div className="align-self-center">
                        {article.category && <div className="capsSubtle mb-2">{article.category?.name}</div>}
                        <h3 className="entry-title mb-3">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h3>
                        <div className="entry-excerpt">
                          {/* {article?.content.length > 300
                              ? article?.content.slice(0, 300) + "..."
                              : article?.content
                            } */}
                          <div className="blog-content">
                            {article?.content ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    article.content.length > 150
                                      ? article.content.slice(0, 150) + "..."
                                      : article.content
                                  ),
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="entry-meta align-items-center">
                          <Link href={`/author/${article?.author?.id}`}>{article?.author?.user.first_name}</Link> in <Link href={`/categories/${article?.category?.slug}`}>{article?.category?.name}</Link>
                          <br />
                          <span>{moment(article?.published_date).format("MMMM D, YYYY")}</span>
                          <span className="middotDivider" />
                          <span className="readingTime" title={article?.read_time}>
                            {article?.read_time} min read
                          </span>
                          <span className="svgIcon svgIcon--star">
                            <svg className="svgIcon-use" width={15} height={15}>
                              <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-3 bgcover"
                      style={{
                        backgroundImage: `url(${article.featured_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "150px",
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                  </article>
                ))}

              </div>
              {/*col-md-8*/}
              <div className="col-md-4 pl-md-5 sticky-sidebar">
                <div className="sidebar-widget latest-tpl-4">
                  <h5 className="spanborder widget-title">
                    <span>Category Description </span>
                  </h5>
                  {/* add the category_description  in a paragraph */}
                  <p style={{ whiteSpace: 'pre-line' }}>{articleData?.category_description}</p>
                  <h5 className="spanborder widget-title mt-3">
                    <span>Popular in {articleData?.category_name}</span>
                  </h5>
                  <ol>
                    {
                      popularArticles?.map((article: any, index: number) => (
                        <li className="d-flex" key={index}>
                          <div className="post-count">
                            0{index + 1}
                          </div>
                          <div className="post-content">
                            <h5 className="entry-title mb-3">
                              <Link href={`/article/${article.slug}`}>
                                {article.title}
                              </Link>
                            </h5>
                            <div className="entry-meta align-items-center">
                              <Link href={`/author/${article?.author?.id}`}>{article?.author?.user.first_name}</Link> in <Link href={`/categories/${article?.category?.slug}`}>{article?.category?.name}</Link>
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
                          </div>
                        </li>
                      ))
                    }
                  </ol>
                </div>
              </div>
              {/*col-md-4*/}
            </div>
          </div>
        )}
        {/*content-widget*/}
      </div>

      {/*content-widget*/}
    </>
  );
}
