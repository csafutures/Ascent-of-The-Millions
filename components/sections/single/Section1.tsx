'use client';

import Link from 'next/link'
import Image from 'next/image';
import moment from 'moment';
import { useState } from 'react';
import DOMPurify from "dompurify";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""

export default function Section1({ article }: { article: any }) {
  const [liked, setLiked] = useState(false);
  const [email, setEmail] = useState('');

  const handleLike = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (!liked) {
      try {
        const response = await fetch(`${APP_URL}/blog/posts/${article.slug}/like/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: article.slug }),
        });
        if (!response.ok) {
          throw new Error('Failed to like the post');
        }

        setLiked(true);
      } catch (error) {
        console.error('Error liking the post:', error);
      }
    }
  };

  const handleSubscribe = async (event: React.FormEvent, email: string) => {
    event.preventDefault();
    console.log("Subscribing with email:", email);
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${APP_URL}/blog/subscribe/`, {
        method: 'POST', // Ensuring the method is POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.status === 400) {
        setEmail('');
        throw new Error('This email is already subscribed.');
      }
      if (response.status === 201) {
        setEmail('');
        alert("Subscribed successfully!");
      }
    } catch (error: any) {
      alert(error.message || "An error occurred while subscribing.");
      return;
    }
  };


  return (
    <>
      <div className="container">
        <div className="entry-header">
          <div className="mb-5">
            <h1 className="entry-title m_b_2rem">{article.title}</h1>
            <div className="entry-meta align-items-center">
              <Link className="author-avatar" href="#">
                <Image
                  src={article.author?.image || article.author?.image || '/assets/images/author-avata-1.jpg'}
                  alt={article.title}
                  width={50}
                  height={50}
                  style={{
                    borderRadius: '10%',
                    objectFit: 'cover',

                  }}
                />
              </Link>
              <Link href={`/author/${article.author?.id}`}>{article.author?.user.first_name} {article.author?.user.last_name}</Link> in <Link href={`/categories/${article.category?.slug}`}>{article.category?.name}</Link>
              <br />
              <span>
                {moment(article.published_date).format("MMM DD, YYYY")}
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
        {/*end single header*/}
        {article.featured_image && (
          <figure className="image zoom mb-5 featured-image">
            <figure>
              <Link href={`/article/${article.slug}`}>
                <Image
                  className="lazy img-fluid responsive-image"
                  src={article.featured_image || article.author?.image || '/assets/images/author-avata-1.jpg'}
                  alt={article.title}
                  width={1240}
                  height={700}
                />
              </Link>
            </figure>
          </figure>
        )}
        {/*figure*/}
        <article className="entry-wraper mb-5">
          <div className="entry-left-col">
            <div className="social-sticky">
              <Link onClick={handleLike} href="#" style={{
                cursor: 'pointer'
              }}>
                {liked ? (
                  <i className="icon-heart" style={{ color: 'red' }} />
                ) : (
                  <i className="icon-heart" style={{ color: 'black' }} />
                )}
              </Link>
              <Link href="#">
                <i className="icon-paper-plane" />
              </Link>
            </div>
          </div>

          

          <div className="entry-main-content dropcap">
              {/* <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              /> */}
              <div className="blog-content">
                {article?.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        article.content
                      ),
                    }}
                  />
                ) : null}
              </div>


            {/*Begin Subcrible*/}
            <div className="border p-5 bg-lightblue mb-5">
              <div className="row justify-content-between">
                <div className="col-md-5 mb-2 mb-md-0">
                  <h5 className="font-weight-bold secondfont mb-3 mt-0">Become a member</h5>
                  <p className="small-text">Get the latest news right in your inbox. We never spam!</p>
                </div>
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12">
                      <input type="text" className="form-control" placeholder="Enter your e-mail address" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-12 mt-2">
                      <button type="submit" className="btn btn-success btn-block" onClick={(e) => handleSubscribe(e, email)}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*End Subcrible*/}
          </div>
          <div className="entry-bottom">
            <div className="tags-wrap heading">

              <span className="tags">
                <Link href={`/categories/${article.category?.slug}`} rel="tag">
                  {article.category?.name}
                </Link>

              </span>
            </div>
          </div>
          <div className="box box-author m_b_2rem">
            <div className="post-author row-flex">
              <div className="author-img">
                <Image
                  alt="author avatar"
                  src={article.author?.image || '/assets/images/author-avata-1.jpg'}
                  className="avatar"
                  width={120}
                  height={120}
                  style={{
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="author-content">
                <div className="top-author">
                  <h5 className="heading-font">
                    <Link href="/author" title={article.author.id} rel="author">
                      {article.author.first_name} {article.author.last_name}
                    </Link>
                  </h5>
                </div>
                <p className="d-none d-md-block">
                  {article.author.bio || 'This author has no bio'}
                </p>

                <br />
                <div className="content-social-author">
                  <Link target="_blank" className="author-social" href={article.author.facebook || '#'}>
                    Facebook
                  </Link>
                  <Link target="_blank" className="author-social" href={article.author.twitter || '#'}>
                    Twitter
                  </Link>
                  <Link target="_blank" className="author-social" href={article.author.instagram || '#'}>
                    Instagram
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
        {/*entry-content*/}

        {/* <Comments /> */}
      </div>
      <style jsx>{`
        .responsive-image {
          height: 400px;
          object-fit: cover;
        }
        .featured-image {
          max-height: 400px;
          object-fit: cover;
          object-position: center;
          overflow: hidden;
          display: flex;
          align-content: center;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 768px) {
          .responsive-image {
            height: 700px;
          }
          .featured-image {
            max-height: 700px;
          }
        }
        :global(.swiper-container) {
          padding-bottom: 50px;
        }
        :global(.swiper-pagination) {
          bottom: 0;
        }
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          color: var(--primary);
        }
      `}</style>
    </>
  );
}
