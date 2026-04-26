import clsx from "clsx";
import useStore from "../store";
import {
	AreaChart,
	CaseSensitive,
	InfinityIcon,
	Timer,
	WholeWord,
} from "lucide-react";

export default function ConfigBar() {
	const config = useStore((state) => state.config);
	const changeMode = useStore((state) => state.changeMode);
	const toggleRealtimeStats = useStore((state) => state.toggleRealtimeStats);
	const toggleCaseSensitive = useStore((state) => state.toggleCaseSensitive);
	return (
		<div
			className={clsx(
				"flex gap-4 p-2 rounded-xl bg-neutral-950 mb-4",
				config.mode === "zen" &&
					"opacity-20 hover:opacity-100 transition-opacity",
			)}
		>
			<ConfigButton
				onClick={() => changeMode("time")}
				className={
					config.mode === "time"
						? "text-teal-500 bg-teal-500/10"
						: "text-neutral-300"
				}
			>
				<Timer size={20} /> Time
			</ConfigButton>
			<ConfigButton
				onClick={() => changeMode("words")}
				className={
					config.mode === "words"
						? "text-teal-500 bg-teal-500/10"
						: "text-neutral-300"
				}
			>
				<WholeWord size={20} /> Words
			</ConfigButton>
			<ConfigButton
				onClick={() => changeMode("zen")}
				className={
					config.mode === "zen"
						? "text-teal-500 bg-teal-500/10"
						: "text-neutral-300"
				}
			>
				<InfinityIcon size={20} /> Zen
			</ConfigButton>

			<div className="w-0.5 bg-neutral-500/10" />

			<ConfigButton
				onClick={() => toggleRealtimeStats()}
				className={
					config.showRealtimeStats
						? "text-cyan-500 bg-cyan-500/10"
						: "text-neutral-300"
				}
			>
				<AreaChart size={20} /> Realtime Stats
			</ConfigButton>
			<ConfigButton
				onClick={() => toggleCaseSensitive()}
				className={
					config.caseSensitive
						? "text-indigo-500 bg-indigo-500/10"
						: "text-neutral-300"
				}
			>
				<CaseSensitive size={20} /> Case Sensitive
			</ConfigButton>
		</div>
	);
}

function ConfigButton({ className, ...props }: React.ComponentProps<"button">) {
	return (
		<button
			className={clsx(
				"flex gap-2 items-center py-2 px-3 rounded-lg font-medium transition-colors",
				className,
			)}
			{...props}
		/>
	);
}
