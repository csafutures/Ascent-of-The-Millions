"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import moment from 'moment';
import DOMPurify from "dompurify";
import truncate from "html-truncate";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Section2({ featuredSlider }: { featuredSlider: any }) {

  return (
    <>
      <div className="content-widget">
        <div className="container">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            className="blog-slider"
          >
            {featuredSlider.AllArticle.map((article: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="blog-slider-card">
                  <div className="row justify-content-between post-has-bg ml-0 mr-0">
                    <div className="col-lg-6 col-md-8">
                      <div className="pt-5 pb-5 ps-md-5 pe-5 align-self-center">
                        <div className="capsSubtle mb-2">
                          {article.title}
                        </div>
                        <h2 className="entry-title mb-3">
                          <Link href={`/article/${article.slug}`}>{article.title}</Link>
                        </h2>
                        <div className="entry-excerpt">
                          <div className="blog-content">
                            {article?.content ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    truncate(article.content, 150, { ellipsis: "..." })
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
                    <div
                      className="col-lg-6 col-md-4 bgcover d-none d-md-block pl-md-0 ml-0"
                      style={{
                        backgroundImage: `url(${article.featured_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        minHeight: "350px",
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="divider" />
        </div>
      </div>
      {/*content-widget*/}
    </>
  );
}
