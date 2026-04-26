import useStore from "../store";

export default function Stats({ wordCount }: { wordCount: number }) {
	const stats = useStore((state) => state.stats);
	const config = useStore((state) => state.config);
	const wpm = useStore((state) => state.calcWPM());
	const accuracy = useStore((state) => state.calcAccuracy());
	return (
		<div className="text-center font-mono mb-2 space-y-2">
			<div className="text-cyan-500 text-2xl">
				{config.mode === "time" && stats.secElapsed}
				{config.mode === "words" && `${stats.wordCount}/${wordCount}`}
			</div>
			{config.showRealtimeStats && (
				<div className="flex gap-4">
					<span className="text-neutral-500 bg-neutral-500/20 font-medium rounded px-2 py-1">
						Elapsed: {stats.secElapsed}sec
					</span>
					<span className="text-green-500 bg-green-500/20 font-medium rounded px-2 py-1">
						WPM: {wpm.toFixed(1)}
					</span>
					<span className="text-teal-500 bg-teal-500/20 font-medium rounded px-2 py-1">
						Accuracy:{" "}
						{stats.typedCharCount === 0 ? "N/A" : `${accuracy.toFixed(1)}%`}
					</span>
					<span className="text-red-500 bg-red-500/20 font-medium rounded px-2 py-1">
						Typos: {stats.typos}
					</span>
				</div>
			)}
		</div>
	);
}
