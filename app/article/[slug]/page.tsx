'use client'

import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/single/Section1'
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""


export default function Home() {
	const [loading, setLoading] = useState(true);
	const [articleData, setArticleData] = useState(null);
  	const { slug } = useParams<{ slug: string }>();

	useEffect(() => {
		const fetchArticleData = async () => {
			try {
				const response = await fetch(`${APP_URL}/blog/posts/${slug}/`);
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


	return (
		<>
			<Layout classLisst="single">
				{loading && (
					<div
						className='justify-content-center align-items-center'
						style={{ height: '50vh', display: 'flex' }}
					>
						Loading...
					</div>
				)}
				{!loading && articleData && (
					<Section1 article={articleData} />
				)}
			</Layout>
		</>
	)
}