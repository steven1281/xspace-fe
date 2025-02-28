import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="px-6 md:px-12 lg:px-20 bg-[#01180E] flex flex-col justify-center md:justify-between items-center gap-4 py-6 md:flex-row px-6 md:px-12 lg:px-20 relative">
            <h1 className="font-bold text-3xl">XSpace</h1>
            <div className="flex gap-4">
                <Link href={"https://x.com/MemoLabsOrg"} className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/prime_twitter.svg"} width={20} height={20} alt="" /></Link>
                <Link href={"#"} className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/discord.svg"} width={31} height={23} alt="" /></Link>
                <Link href={"#"} className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/mdi_youtube.svg"} width={35} height={35} alt="" /></Link>
                <Link href={"#"} className="p-4 size-14 flex justify-center items-center rounded-full bg-[#03301D]"><Image src={"/images/telegram.svg"} width={27} height={22} alt="" /></Link>
            </div>
        </footer>
    )
}