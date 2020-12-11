import Head from "next/head";
import { useState } from "react";

import { SketchPicker } from "react-color";

import { firebaseServer } from "../firebaseServer";
import { firebaseClient } from "../firebaseClient";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
export default function Home({ initColors }) {
	const toastDelay = 5000;

	// state for current color
	const [state, setState] = useState({
		color: initColors,
	});

	// Update state if there are changes to the color in the database.
	React.useEffect(() => {
		firebaseClient
			.database()
			.ref("rgbw")
			.on("value", function (snapshot) {
				if (snapshot.exists()) {
					const values = snapshot.val();
					const newColors = { r: values.r, g: values.g, b: values.b };
					console.log("PULL COLORS");

					// this if is required to prevent infinite update cycle.
					if (
						newColors.r != state.color.r ||
						newColors.g != state.color.g ||
						newColors.b != state.color.b
					) {
						setState({
							...state,
							color: { r: values.r, g: values.g, b: values.b },
						});

						console.log("CHANGES IN PULLED COLORS");
						console.log(newColors);
					} else {
						console.log("NO CHANGES IN PULLED COLORS");
					}
				}
			});
	});

	React.useEffect(() => {
		firebaseClient
			.database()
			.ref("lockPublic")
			.on("value", function (snapshot) {
				if (snapshot.exists()) {
					if (snapshot.val()) {
						toast("Whoops! Gary has locked the color of his LEDs");
					} else {
						toast("Yay! Gary has unlocked the color of his LEDs");
					}
				}
			});
	}, []);

	const handleChange = async (color) => {
		console.log("UPDATE");
		setState({ ...state, color: color.rgb });
		firebaseClient
			.database()
			.ref("rgbw")
			.update(color.rgb)
			.catch((e) => {
				console.log(e.code);
				if (e.code === "PERMISSION_DENIED") {
					toast("Whoops! Gary has locked the color of his LEDs");
				} else {
					toast("Whoops! Error: " + e.code);
				}
			});
	};

	return (
		<div className="container">
			<Head>
				<title>Gary's TikTok Lights</title>
				<link rel="icon" href="/favicon.png" />
			</Head>

			<main>
				<ToastContainer
					position="top-right"
					autoClose={toastDelay}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
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
				<p style={{ textAlign: "center", marginTop: "2em", marginBottom: 0 }}>
					<strong>Tip:</strong> The top right corner provides the brightest
					colors and black turns the LEDs off.
					<br />
					Why? Because I can't make the LEDs turn black! The saturation is
					representative of brightness.
				</p>
				<p>
					See the color picker randomly changing? That's other people messing
					with my lights!
				</p>
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

				.title span {
					text-decoration: none;
				}

				.title span:hover,
				.title span:focus,
				.title span:active {
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

// Pre-fill current color of LEDs before sending to client
export async function getServerSideProps() {
	const snapshot = await firebaseServer.database().ref("rgbw").once("value");

	// default colors in case of firebase failure.
	var initColors = {
		r: "0",
		g: "0",
		b: "255",
	};

	if (snapshot.exists()) {
		initColors = {
			r: snapshot.val().r,
			g: snapshot.val().g,
			b: snapshot.val().b,
		};
	}

	return { props: { initColors } };
}
