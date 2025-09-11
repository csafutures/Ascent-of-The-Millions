import Link from 'next/link'

export default function Section1() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="entry-header">
          <div className="mb-5">
            <h1 className="entry-title m_b_2rem">
              The Ascent of The Millions
            </h1>
          </div>
        </div>
        {/*end single header*/}
        <article className="entry-wraper mb-5">
          <div className="entry-left-col">
            <div className="social-sticky">
              <Link href="#">
                <i className="icon-facebook" />
              </Link>
              <Link href="#">
                <svg
                  style={{
                    width: 10,
                    height: 10,
                    marginTop: "-3px",
                  }}
                  id="fi_5968958"
                  enableBackground="new 0 0 1226.37 1226.37"
                  viewBox="0 0 1226.37 1226.37"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z" />
                </svg>
              </Link>

            </div>
          </div>
          <p className="blog-content">
            By 2050, Africa will account for one quarter of the global labour force and over 40% by 2100. Besides being largely invisible in the digital world, they are confronting realities from limited energy access and climate change shocks to volatile market trends demanding constant reinvention and career pivots, all within the context of fragile global governance systems and looming pandemic threats. Even well-intentioned development efforts often fail to capture these realities, rendering many of their experiences invalid in global statistics and conversations.

          </p>
          <p className="blog-content">
            The Ascent of The Millions reframes this moment by centering their narratives to guide global policy and philanthropic action. Recognizing that these millions hold the keys to a resilient future, we track their journeys, and amplify their lived experiences to inform the design of systems that adapt to existential challenges, and invest in cultivating their skills and leadership to fully realize their potential in the global changing economy.

          </p>

        </article>
        {/*entry-content*/}


      </div>
    </>
  );
}
