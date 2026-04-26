import { useEffect, useState } from "react";
import { getRandomText } from "./data";
import TypingArea from "./components/TypingArea";
import ConfigBar from "./components/ConfigBar";
import clsx from "clsx";
import Stats from "./components/Stats";
import useStore from "./store";
import ResultDialog from "./components/ResultDialog";

function App() {
	const [practiceText, setPracticeText] = useState(getRandomText());
	const [appState, setAppState] = useState<"idle" | "active" | "result">(
		"idle",
	);
	const [isFocused, setIsFocused] = useState(true);

	const incrStat = useStore((state) => state.incrStat);
	const reset = useStore((state) => state.reset);

	useEffect(() => {
		const timer = setInterval(() => {
			if (appState === "active" && isFocused) incrStat("secElapsed");
		}, 1000);
		return () => clearInterval(timer);
	}, [appState, isFocused]);

	const handleReset = () => {
		setAppState("idle");
		setIsFocused(true);
		setPracticeText(getRandomText());
		reset();
	};
	return (
		<main className="h-screen w-full flex flex-col justify-center items-center p-8 bg-neutral-950 text-neutral-200">
			<div
				className={clsx(
					"absolute top-10 transition-opacity",
					isFocused && appState === "active" ? "opacity-0" : "opacity-100",
				)}
			>
				<ConfigBar />
			</div>
			<Stats wordCount={practiceText.match(/\S+/g)?.length || 0} />
			<div className="max-w-7xl relative p-4">
				<button
					type="button"
					className={clsx(
						"z-20 flex justify-center items-center absolute inset-0 backdrop-blur transition-all",
						!isFocused
							? "visible opacity-100 scale-105"
							: "invisible opacity-0 scale-95",
					)}
					onClick={() => setIsFocused(true)}
				>
					<span className="font-medium text-lg text-white/60">
						Click here to begin
					</span>
				</button>
				<TypingArea
					text={practiceText}
					onStart={() => setAppState("active")}
					onFinish={() => setAppState("result")}
					onBlur={() => setIsFocused(false)}
					isOverlayed={appState === "result" || !isFocused}
				/>
			</div>
			<ResultDialog onReset={handleReset} open={appState === "result"} />
		</main>
	);
}

export default App;
