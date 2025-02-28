import { useNFT } from "@/lib/context/NFTContext";
import Image from "next/image";
import { useState } from "react";

export default function XData({ tokenID }) {
    const { getNFTInfo } = useNFT();
    const [nInfo, setNInfo] = useState({
        Name: "-"
    })
    getNFTInfo(tokenID)
        .then((nftInfo) => {
            setNInfo(nftInfo)
            console.log("xdata: ", nftInfo)
        })

    return (
        <div className="bg-gradient-to-br from-[#009688] to-[#05F292] rounded-2xl p-4 relative">
            <button className="bg-[#011C10] p-4 absolute top-0 right-0 rounded-bl-2xl rounded-t-2xl -translate-y-[0.5px] translate-x-[0.5px]">
                <Image src={"/images/Vector 6.svg"} className="absolute -right-[0.5px] -bottom-1/2 -translate-y-[1px]" width={27} height={13} alt="" />
                <Image src={"/images/Vector 5.svg"} className="absolute -left-[20px] bg-red- top-0 w-10" width={27} height={13} alt="" />
                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFF"><path d="m242-246-42-42 412-412H234v-60h480v480h-60v-378L242-246Z" /></svg>
            </button>
            <div className="w-2/3 lg:w-full">
                <h2 className="text-2xl text-[#B7F272]">{nInfo.Name}</h2>
                <p className="text-xs">{nInfo.PostTime}</p>

                <p className="font-bold text-2xl mt-4">{nInfo.Tweet}</p>
                <p className="mt-2">{nInfo.Images}</p>
                <div className="bg-[#03301D] w-fit p-3 mt-4 rounded-full"><Image src={"/images/prime_twitter-xdata.svg"} className="size-4 bg-[#03301D]" width={11} height={11} alt="" /></div>
            </div>
        </div>
    )
}