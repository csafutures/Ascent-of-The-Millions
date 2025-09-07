'use client'

import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home/Section1'
import Section2 from '@/components/sections/home/Section2'
import Section3 from '@/components/sections/home/Section3'
import Section4 from '@/components/sections/home/Section4'
import { useEffect, useState } from "react"



export default function Home() {
	const [homeData, setHomeData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""

	//   fetch all the data of the posts from the api
	useEffect(() => {
		setIsLoading(true);
		const fetchHomeData = async () => {
			try {
				const response = await fetch(`${APP_URL}/blog/home/`);
				const data = await response.json();
				setHomeData(data);
				setIsLoading(false);

			} catch (error) {
				throw new Error("Failed to fetch home data");
				setIsLoading(false);
			}
		};

		fetchHomeData();

	}, [APP_URL]);


	return (
		<>
			<Layout classLisst="home">
				{isLoading && (
					<div
						className='justify-content-center align-items-center'
						style={{ height: '50vh', display: 'flex' }}
					>
						Loading...
					</div>
				)}

				{/* if the Home data == Undefined or null, show no content at the moment */}
				{
					!isLoading && !homeData && (
						<div
							className='justify-content-center align-items-center'
						>
							No content available at the moment.
						</div>
					)
				}

				{!isLoading && homeData && (
					<>
						<Section1
							featured={{
								title: "Editor's Picks",
								mainArticle: homeData.editors_picks[0], // first article as main
								sideArticles: homeData.editors_picks.slice(1), // rest as side articles
							}}
							trending={{
								title: "Trending",
								articles: homeData.trending, // pass trending array directly
							}}
						/>

						<Section2
							featuredSlider={{
								title: "Readers' Choice",
								AllArticle: homeData.readers_choice,
							}}

						/>
						<Section3
							MostViewed={{
								title: "Most Viewed",
								articles: homeData.most_viewed,
							}}
						/>
						<Section4
							MostRecent={{
								title: "Latest Articles",
								articles: homeData.most_recent,
							}}
							Popular={{
								title: "Popular",
								articles: homeData.popular,
							}}
						/>
					</>
				)}
			</Layout>
		</>
	)
}