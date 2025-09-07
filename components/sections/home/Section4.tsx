"use client"
import Link from 'next/link'
import moment from 'moment';



export default function Section4({ MostRecent, Popular }: { MostRecent: any, Popular: any }) {



  // Tính toán các bài viết cần hiển thị cho trang hiện tại
  return (
    <>
      <div className="content-widget">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="spanborder h4">
                <span>{MostRecent.title}</span>
              </h2>
              {MostRecent.articles.map((article: any, index: number) => (
                <article key={index} className="row justify-content-between mb-5 mr-0">
                  <div className="col-md-9">
                    <div className="align-self-center">
                      <div className="capsSubtle mb-2">{article.category.name}</div>
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
                    </div>
                  </div>
                  <div
                    className="col-md-3 bgcover"
                    style={{
                      backgroundImage: `url(${article.featured_image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "200px",
                    }}
                  />
                </article>
              ))}

            </div>
            {/*col-md-8*/}
            <div className="col-md-4 pl-md-5 sticky-sidebar">
              <div className="sidebar-widget latest-tpl-4">
                <h4 className="spanborder">
                  <span>{Popular.title}</span>
                </h4>
                <ol>
                  {Popular.articles.map((article: any, index: number) => (
                    <li key={index} className="d-flex">
                      <div className="post-count"> 0{index + 1}</div>
                      <div className="post-content">
                        <h5 className="entry-title mb-3">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h5>
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
      <div className="content-widget">
        <div className="container">
          <div className="sidebar-widget ads">
            {/* <Link href={mostRecent.ad.link}>
              <Image
                src={mostRecent.ad.image}
                alt="ads"
                width={600}
                height={71}
              />
            </Link> */}
          </div>
          <div className="hr" />
        </div>
      </div>
      {/*content-widget*/}
    </>
  );
}
