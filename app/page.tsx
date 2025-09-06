'use client'

import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home/Section1'
import Section2 from '@/components/sections/home/Section2'
import Section3 from '@/components/sections/home/Section3'
import Section4 from '@/components/sections/home/Section4'
import { useEffect, useState } from "react"



export default function Home() {
	const [homeData, setHomeData] = useState<any>(null);
	const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""

	//   fetch all the data of the posts from the api
	useEffect(() => {
		const fetchHomeData = async () => {
			try {
				const response = await fetch(`${APP_URL}/blog/home/`);
				const data = await response.json();
				setHomeData(data);

			} catch (error) {
				throw new Error("Failed to fetch home data");
			}
		};

		fetchHomeData();

	}, [APP_URL]);


	if (!homeData) {

		return <div>Loading...</div>;
	}

	return (
		<>
			<Layout classLisst="home">
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
			</Layout>
		</>
	)
}