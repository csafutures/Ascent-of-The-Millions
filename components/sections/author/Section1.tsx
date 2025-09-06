"use client";
import Link from 'next/link'
import Pagination from '@/components/elements/Pagination';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';


import { useParams } from 'next/navigation'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""

export default function Section1() {
  const [authorProfile, setAuthorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  const params = useParams();
  const authorId = params.id as string;

  // useEffect to fetch the author's profile from the API if needed
  useEffect(() => {
    const fetchAuthorProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${APP_URL}/blog/authors/${authorId}/`);
        const data = await response.json();
        setAuthorProfile(data);
      } catch (error) {
        console.error("Error fetching author profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);


  const articlesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(authorProfile?.posts.length / articlesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const startIdx = (currentPage - 1) * articlesPerPage;
  const endIdx = startIdx + articlesPerPage;
  const paginatedArticles = authorProfile?.posts.slice(startIdx, endIdx);

  // filter through the posts to only get the ones with popular=true
  const highlightPosts = {
    title: "Popular Posts",
    articles: authorProfile?.posts.filter((post: any) => post.popular).slice(0, 5) || [],
  };

  if (loading) {
    return <div
      className='justify-content-center align-items-center'
      style={{ height: '50vh', display: 'flex' }}>
      <span>Loading...</span>
    </div>;
  }

  return (
    <>
      <div className="content-widget">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="box box-author m_b_2rem">
                <div className="post-author row-flex">
                  <div className="author-img">
                    <Image
                      alt="author avatar"
                      src={authorProfile.image}
                      className="avatar"
                      width={106}
                      height={106}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="author-content">
                    <div className="top-author">
                      <h5 className="heading-font">
                        <Link href={`/author/${authorProfile?.id}`} title={`${authorProfile?.first_name} ${authorProfile?.last_name}`} rel="author">
                          {authorProfile?.first_name} {authorProfile?.last_name}
                        </Link>
                      </h5>
                    </div>
                    <p className="d-none d-md-block" style={{
                      whiteSpace: 'pre-line'
                    }}>
                      {authorProfile?.bio || 'This author has no bio'}
                    </p>

                    <div className="content-social-author">
                      <Link target="_blank" className="author-social" href={authorProfile?.facebook || 'https://www.facebook.com'}>
                        Facebook
                      </Link>
                      <Link target="_blank" className="author-social" href={authorProfile?.twitter || 'https://www.twitter.com'}>
                        Twitter
                      </Link>
                      <Link target="_blank" className="author-social" href={authorProfile?.instagram || 'https://www.instagram.com'}>
                        Instagram
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="spanborder">
                <span>Latest Posts</span>
              </h4>
              {paginatedArticles?.map((article: any, idx: number) => (
                <article key={idx} className="row justify-content-between mb-5 mr-0">
                  <div className="col-md-9 ">
                    <div className="align-self-center">
                      {article.slug && <div className="capsSubtle mb-2">{article.slug}</div>}
                      <h3 className="entry-title mb-3">
                        <Link href={`/article/${article.slug}`}>{article.title}</Link>
                      </h3>
                      <div className="entry-excerpt">
                        <p>
                          {article.content.length > 150
                            ? article.content.slice(0, 150) + "..."
                            : article.content
                          }
                        </p>
                      </div>
                      <div className="entry-meta align-items-center">
                        <Link href={`/author/${article.author.id}`}>{article.author.user.first_name}</Link> in <Link href={`/categories/${article.category.slug}`}>{article.category.name}</Link>
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
                      minHeight: "200px",
                      borderRadius: "8px",
                      objectFit: 'cover',
                    }}
                  />
                </article>
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            {/*col-md-8*/}
            <div className="col-md-4 pl-md-5 sticky-sidebar">
              <div className="sidebar-widget latest-tpl-4">
                <h5 className="spanborder widget-title">
                  <span>Popular Posts</span>
                </h5>
                <ol>
                  {highlightPosts?.articles.map((article: any, index: number) => (
                    <li key={index} className="d-flex">
                      <div className="post-count">{(index + 1).toString().padStart(2, '0')}</div>
                      <div className="post-content">
                        <h5 className="entry-title mb-3">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h5>
                        <div className="entry-meta align-items-center">
                          <Link href={`/author/${article.author.id}`}>{article.author.user.first_name}</Link> in <Link href={`/categories/${article.category.slug}`}>{article.category.name}</Link>
                          <br />
                          <span>
                            {moment(article.published_at).format("MMM DD")}
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
                  ))}
                </ol>
              </div>
            </div>
            {/*col-md-4*/}
          </div>
        </div>
        {/*content-widget*/}
      </div>

      {/*content-widget*/}
    </>
  );
}
