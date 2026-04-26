import clsx from "clsx";
import useStore from "../store";
import { useEffect, useState } from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	YAxis,
} from "recharts";
import { RotateCcw } from "lucide-react";

interface IProps extends React.ComponentProps<"dialog"> {
	onReset: () => void;
}

export default function ResultDialog({ onReset, ...props }: IProps) {
	const stats = useStore((state) => state.stats);
	const calcWPM = useStore((state) => state.calcWPM);
	const calcAccuracy = useStore((state) => state.calcAccuracy);

	const [wpmData, setWpmData] = useState<
		{ sec: number; wpm: number; rawWpm: number }[]
	>([]);

	useEffect(() => {
		if (stats.secElapsed > 0) {
			setWpmData((data) => [
				...data,
				{
					sec: stats.secElapsed,
					rawWpm: calcWPM(),
					wpm: calcWPM(stats.secElapsed, stats.typedCharCount - stats.typos),
				},
			]);
		}
	}, [stats.secElapsed]);

	const handleReset = () => {
		setWpmData([]);
		onReset();
	};

	return (
		<div
			className={clsx(
				"z-20 absolute flex justify-center items-center bg-black/40 backdrop-blur",
				props.open && "inset-0",
			)}
		>
			<dialog
				className="mx-auto p-8 rounded-xl bg-neutral-800/60 text-white text-center"
				{...props}
			>
				<h2 className="text-xl text-white font-bold mb-8">Results</h2>
				<div className="flex gap-4 items-center justify-center my-4">
					<div>
						<span className="text-4xl font-black">{calcWPM()}</span>
						<span className="font-bold text-lg text-neutral-500">WPM</span>
					</div>
					<div>
						<span className="text-4xl font-black">{stats.secElapsed}</span>
						<span className="font-bold text-lg text-neutral-500">sec</span>
					</div>
					<div>
						<span className="text-4xl font-black">{calcAccuracy()}%</span>
						<span className="font-bold text-lg text-neutral-500">Accuracy</span>
					</div>
				</div>
				{props.open && (
					<ResponsiveContainer width={850} height={300}>
						<AreaChart data={wpmData}>
							<CartesianGrid opacity={0.1} strokeDasharray="3 3" />
							<YAxis
								fontSize={14}
								axisLine={false}
								tickLine={false}
								width={30}
							/>
							<Tooltip
								cursor={false}
								content={({ payload, label }) => (
									<div className="text-sm font-mono text-left bg-neutral-950/90 px-4 py-2 rounded-lg border border-neutral-800">
										<p>
											<span className="text-lg">{label}</span>
											<span>sec</span>
										</p>
										<p>
											<span className="text-lg">{payload?.[0]?.value}</span>
											<span className="text-neutral-400">WPM(raw)</span>
										</p>
										<p>
											<span className="text-lg">{payload?.[1]?.value}</span>
											<span className="text-sky-400">WPM</span>
										</p>
									</div>
								)}
								wrapperClassName="text-left !bg-neutral-900 rounded-xl !border-gray-800 text-sm"
							/>
							<Area
								type="monotone"
								dataKey="rawWpm"
								label="Raw WPM"
								stroke="var(--color-neutral-400)"
								fill="var(--color-neutral-400)"
								fillOpacity={0.2}
								strokeWidth={4}
								dot={{ r: 2 }}
								activeDot={{ r: 6 }}
							/>
							<Area
								type="monotone"
								dataKey="wpm"
								label="WPM"
								stroke="var(--color-sky-400)"
								fill="var(--color-sky-400)"
								fillOpacity={0.2}
								strokeWidth={4}
								dot={{ r: 2 }}
								activeDot={{ r: 6 }}
							/>
						</AreaChart>
					</ResponsiveContainer>
				)}
				<button
					type="button"
					onClick={handleReset}
					className="rounded-full p-3 transition-colors hover:bg-neutral-200/10"
				>
					<RotateCcw />
				</button>
			</dialog>
		</div>
	);
}
