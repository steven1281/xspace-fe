import Image from "next/image"

export function TasksPrice ({amount}) {
    return (
        <div className="rounded-full px-2 py-1 bg-[#B7F272] flex items-center text-black font-bold gap-2 h-fit">
            <Image src={"/images/download (14) 1.svg"} width={22} height={22} alt="" />
            <span className="text-black">{amount}</span>
        </div>
    )
}