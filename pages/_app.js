import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = () => {
			setLoading(true)
		}
		const handleStop = () => {
			setLoading(false)
		}

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleStop)
		router.events.on('routeChangeError', handleStop)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleStop)
			router.events.off('routeChangeError', handleStop)
		}
	}, [router])

	return (
		<AnimatePresence exitBeforeEnter>
			{loading === true ? (
				<motion.div
					key="loading"
					initial={{ opacity: 0, transition: .3 }}
					animate={{ opacity: 1, transition: .3 }}
					exit={{ opacity: 0, transition: .3 }}
				>
					<h3>loading ...</h3>
				</motion.div>
			) : (
				<motion.div
					key="page"
				>
					<Component {...pageProps} />
				</motion.div>

			)}

		</AnimatePresence>
	)
}

export default MyApp
