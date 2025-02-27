import { TasksPrice } from "./tasks-price"
import Link from "next/link"

export function TaskBox({ activity, point, action, link }) {
    return (
        <div className="flex gap-4 flex-wrap lg:flex-nowrap lg:justify-between items-center">
            <div className="lg:w-44">
                <TasksPrice amount={point || 50} />
            </div>
            <p className="text-nowrap">{activity}</p>
            <div className="hidden lg:block w-full border-b-2 border-dashed border-white relative"><p className="absolute top-1/2 -translate-y-1/2 -left-2 pt-0.5">►</p></div>
            <Link href={link || "/"} className="bg-gradient-to-b from-[#074D35] to-xspace-green px-6 py-2 rounded-full">{action}</Link>
        </div>
    )
}