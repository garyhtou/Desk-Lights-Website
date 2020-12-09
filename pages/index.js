import Head from "next/head";
import { useState } from "react";
import { SketchPicker } from "react-color";
import firebase from "firebase/app";
import "firebase/database";

export default function Home() {
	if (!firebase.apps.length) {
		firebase.initializeApp({
			apiKey: "AIzaSyBvMgMnlTeE3dzV-gWNeFCx0Y7noPDRChQ",
			authDomain: "desk-lights-5a43a.firebaseapp.com",
			databaseURL: "https://desk-lights-5a43a-default-rtdb.firebaseio.com",
			projectId: "desk-lights-5a43a",
			storageBucket: "desk-lights-5a43a.appspot.com",
			messagingSenderId: "1020303207331",
			appId: "1:1020303207331:web:1710f9c1889e78eacf0816",
			measurementId: "G-3Q4FL79CTF",
		});
	}

	const [state, setState] = useState({
		color: {
			r: "0",
			g: "0",
			b: "255",
		},
	});

	const handleChange = async (color) => {
		console.log("UPDATE");
		setState({ ...state, color: color.rgb });
		firebase.database().ref("rgbw").update(color.rgb);
	};

	// firebase
	// 	.database()
	// 	.ref("rgbw")
	// 	.on(
	// 		"value",
	// 		function (snapshot) {
	// 			if (snapshot.exists()) {
	// 				const values = snapshot.val();
	// 				const newColors = { r: values.r, g: values.g, b: values.b };
	// 				console.log("PULL COLORS");

	// 				if (
	// 					newColors.r != state.color.r ||
	// 					newColors.g != state.color.g ||
	// 					newColors.b != state.color.b
	// 				) {
	// 					setState({
	// 						...state,
	// 						color: { r: values.r, g: values.g, b: values.b },
	// 					});

	// 					console.log("CHANGES IN PULLED COLORS");
	// 					console.log(newColors);
	// 				} else {
	// 					console.log("NO CHANGES IN PULLED COLORS");
	// 				}
	// 			}
	// 		}.bind(this)
	// 	)
	// 	.bind(this);

	return (
		<div className="container">
			<Head>
				<title>Gary's TikTok Lights</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<main>
				<h1 className="title">
					Welcome to{" "}
					<span
						style={{
							color:
								"rgb(" +
								state.color.r +
								"," +
								state.color.g +
								"," +
								state.color.b +
								")",
						}}
					>
						Gary's TikTok Lights
					</span>
					!
				</h1>

				<p className="description">
					🚦 It's time for you to control the colors 🎄
				</p>

				<div className="select">
					<SketchPicker
						color={state.color}
						onChange={handleChange}
						disableAlpha
					/>
				</div>
			</main>

			<footer>
				<p>
					<span>
						<a
							className="gh-link"
							href="https://github.com/garytou2/Desk-Lights"
						>
							Desk-Lights
						</a>{" "}
						&{" "}
						<a
							className="gh-link"
							href="https://github.com/garytou2/Desk-Lights-Website"
						>
							Desk-Lights-Website
						</a>
						{/* <GithubOutlined /> */}
					</span>
					<span className="credit-sep">|</span>
					Developed by <a href="https://garytou.com">Gary Tou</a>
				</p>
			</footer>

			<style jsx>{`
				.select {
					margin-top: 10vh;
				}

				.gh-link {
					color: inherit;
				}

				.credit-sep {
					padding: 0 10px;
					font-weight: bolder;
				}

				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				footer a {
					color: blue;
					font-weight: bolder;
				}

				a {
					color: inherit;
					text-decoration: none;
				}

				.title a {
					color: #0070f3;
					text-decoration: none;
				}

				.title a:hover,
				.title a:focus,
				.title a:active {
					text-decoration: underline;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
				}

				.title,
				.description {
					text-align: center;
				}

				.description {
					line-height: 1.5;
					font-size: 1.5rem;
				}

				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
						DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
				}

				.grid {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;

					max-width: 800px;
					margin-top: 3rem;
				}

				.card {
					margin: 1rem;
					flex-basis: 45%;
					padding: 1.5rem;
					text-align: left;
					color: inherit;
					text-decoration: none;
					border: 1px solid #eaeaea;
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: #0070f3;
					border-color: #0070f3;
				}

				.card h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.card p {
					margin: 0;
					font-size: 1.25rem;
					line-height: 1.5;
				}

				.logo {
					height: 1em;
				}

				@media (max-width: 600px) {
					.grid {
						width: 100%;
						flex-direction: column;
					}
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}
