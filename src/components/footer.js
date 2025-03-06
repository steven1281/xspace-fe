import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="px-6 md:px-12 lg:px-20 bg-[#01180E] flex flex-col justify-center md:justify-between items-center gap-4 py-6 md:flex-row px-6 md:px-12 lg:px-20 relative">
            <h1 className="font-bold text-3xl">XSpace</h1>
            <div className="flex gap-4">
                <Link href={"https://x.com/MemoLabsOrg"} target="_blank" className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/prime_twitter.svg"} width={20} height={20} alt="" /></Link>
                <Link href={"https://discord.com/invite/YG4Ydv2E7X"} target="_blank" className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/discord.svg"} width={31} height={23} alt="" /></Link>
                <Link href={"https://t.me/memolabsio"} target="_blank" className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/telegram.svg"} width={27} height={22} alt="" /></Link>
            </div>
        </footer>
    )
}