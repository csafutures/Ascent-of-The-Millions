import Link from 'next/link'
import Image from 'next/image';
import moment from 'moment';
import DOMPurify from "dompurify";


export default function Section3({ MostViewed }: { MostViewed: any }) {
  const { articles } = MostViewed;


  return (
    <>
      <div className="content-widget">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="row justify-content-between">
                {articles.map((article: any, index: number) => (
                  <article key={index} className="col-md-6">
                    <div className="mb-3 d-flex row">
                      <figure className="col-md-5">
                        <Link href={`/article/${article.slug}`}>
                          <Image
                            src={article.featured_image}
                            alt={article.title}
                            width={180}
                            height={180}
                            className="lazy"
                            loading="lazy"
                            style={{
                              objectFit: 'cover',

                            }}
                          />
                        </Link>
                      </figure>
                      <div className="entry-content col-md-7 pl-md-0">
                        <h5 className="entry-title mb-3">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h5>
                        <div className="entry-excerpt">
                            <div className="blog-content">
                              {article?.content ? (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                      article.content.length > 50
                                        ? article.content.slice(0, 50) + "..."
                                        : article.content
                                    ),
                                  }}
                                />
                              ) : null}
                            </div>
                        </div>
                        <div className="entry-meta align-items-center">
                          <Link href={`/author/${article.author?.id}`}>{article.author?.user.first_name} {article.author?.user.last_name}</Link> in <Link href={`/categories/${article.category?.slug}`}>{article.category?.name}</Link>
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
                  </article>
                ))}
              </div>
            </div>
            <div className="col-md-2">
              <div className="sidebar-widget ads">
                {/* <Link href={todayHighlights.ad.link}>
                  <Image
                    src={todayHighlights.ad.image}
                    alt="ads"
                    width={166}
                    height={346}
                  />
                </Link> */}
              </div>
            </div>
          </div>
          <div className="divider-2" />
        </div>
      </div>
      {/*content-widget*/}
    </>
  );
}
