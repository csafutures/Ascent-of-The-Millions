import Link from "next/link";
import Image from 'next/image';
import moment from 'moment';

export default function Section1({ featured, trending }: { featured: any, trending: any }) {

  return (
    <>
      <div className="section-featured featured-style-1">
        <div className="container">
          <div className="row">
            {/*begin featured*/}
            <div className="col-sm-12 col-md-9 col-xl-9">
              <h2 className="spanborder h4">
                <span>{featured.title}</span>
              </h2>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <article className="first mb-3">
                    <figure>
                      <Link href={`/article/${featured.mainArticle.slug}`}>
                        <Image
                          className="lazy"
                          src={featured.mainArticle.featured_image}
                          alt={featured.mainArticle.title}
                          width={404}
                          height={227}
                        />
                      </Link>
                    </figure>
                    <h3 className="entry-title mb-3">
                      <Link href={`/article/${featured.mainArticle.slug}`}>
                        {featured.mainArticle.title}
                      </Link>
                    </h3>

                    <div className="entry-excerpt">
                      <p>
                        {featured.mainArticle.content.length > 150
                          ? featured.mainArticle.content.slice(0, 150) + "..."
                          : featured.mainArticle.content
                        }
                      </p>
                    </div>

                    <div className="entry-meta align-items-center">
                      <Link href={`/author/${featured.mainArticle.author?.id}`}>{featured.mainArticle.author?.user.first_name}</Link> in <Link href={`/category/${featured.mainArticle.category?.slug}`}>{featured.mainArticle.category?.name}</Link>
                      <br />
                      <span>
                        {moment(featured.mainArticle.published_date).format("MMM DD, YYYY")}
                      </span>
                      <span className="middotDivider" />
                      <span className="readingTime" title={featured.mainArticle.read_time}>
                        {featured.mainArticle.read_time} min read
                      </span>
                      <span className="svgIcon svgIcon--star">
                        <svg className="svgIcon-use" width={15} height={15}>
                          <path d="M7.438 2.324c.034-.099.09-.099.123 0l1.2 3.53a.29.29 0 0 0 .26.19h3.884c.11 0 .127.049.038.111L9.8 8.327a.271.271 0 0 0-.099.291l1.2 3.53c.034.1-.011.131-.098.069l-3.142-2.18a.303.303 0 0 0-.32 0l-3.145 2.182c-.087.06-.132.03-.099-.068l1.2-3.53a.271.271 0 0 0-.098-.292L2.056 6.146c-.087-.06-.071-.112.038-.112h3.884a.29.29 0 0 0 .26-.19l1.2-3.52z" />
                        </svg>
                      </span>
                    </div>
                  </article>
                  <Link className="btn btn-green d-inline-block mb-4 mb-md-0" href="/article">
                    All Featured
                  </Link>
                </div>
                <div className="col-sm-12 col-md-6">
                  {featured.sideArticles.map((article: any, index: number) => (
                    <article key={index}>
                      <div className="mb-3 d-flex row">
                        <figure className="col-4 col-md-4">
                          <Link href={`/article/${article?.slug}`}>
                            <Image
                              className="lazy"
                              src={article.featured_image}
                              alt={article.title}
                              width={190}
                              height={165}
                            />
                          </Link>
                        </figure>
                        <div className="entry-content col-8 col-md-8 pl-md-0">
                          {article.category && (
                            <div className="capsSubtle mb-2">{article.category.name}</div>
                          )}
                          <h5 className="entry-title mb-3">
                            <Link href={`/article/${article.slug}`}>{article.title}</Link>
                          </h5>
                          <div className="entry-meta align-items-center">
                            <Link href={`/author/${article.author.id}`}>{article.author.user.first_name}</Link> in <Link href={`/article/${article.category.slug}`}>{article.category.name}</Link>
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
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
            {/*end featured*/}
            {/*begin Trending*/}
            <div className="col-sm-12 col-md-3 col-xl-3">
              <div className="sidebar-widget latest-tpl-4">
                <h4 className="spanborder">
                  <span>{trending.title}</span>
                </h4>
                <ol>
                  {trending.articles.map((article : any, index : number) => (
                    <li key={index} className="d-flex">
                      <div className="post-count">{index + 1}</div>
                      <div className="post-content">
                        <h5 className="entry-title mb-3">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h5>
                        <div className="entry-meta align-items-center">
                          <Link href={`/author/${article.author.id}`}>{article.author.user.first_name}</Link> in <Link href={`/category/${article.category.slug}`}>{article.category.name}</Link>
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
                <Link className="link-green" href="/article">
                  See all trending
                  <svg className="svgIcon-use" width={19} height={19}>
                    <path d="M7.6 5.138L12.03 9.5 7.6 13.862l-.554-.554L10.854 9.5 7.046 5.692" fillRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div> 
            {/*end Trending*/}
          </div>
          {/*end row*/}
          <div className="divider" />
        </div>
        {/*end container*/}
      </div>
    </>
  );
}
