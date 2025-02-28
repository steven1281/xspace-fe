import Footer from "@/components/footer"
import Header from "@/components/header"
import XData from "@/components/xdata-component"
import { useNFT } from "@/lib/context/NFTContext"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useAccount } from "wagmi"

export default function Space() {
    const { NFTList } = useNFT();
    const dataSources = useRef(null)
    const { isConnected, address } = useAccount();
    const { NFTInfos } = useNFT();
    const [isData, setIsData] = useState(true)

    const [dataSource, setDataSource] = useState(0)
    const dataSourceList = ['All Sources', 'Twitter']

    const dateList = ['All Date', 'Twitter']

    const toggleDataSourcesElem = () => {
        dataSources.current.classList.toggle('flex')
        dataSources.current.classList.toggle('hidden')
    }


    const toggleDataSources = (id) => {
        setDataSource(id)
        toggleDataSourcesElem()
    }


    return (
        <>
            <div className="px-6 md:px-12 lg:-px-20">

                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] p-6 md:p-12 rounded-2xl my-12 min-h-[75vh] relative">
                    <div className="flex gap-6 relative z-10">
                        <div className="relative">
                            <button onClick={toggleDataSourcesElem} className="bg-[#05F292] rounded-full px-4 py-2 flex gap-2 text-black w-fit items-center justify-center relative">
                                {dataSourceList[dataSource]}
                                <Image src={"/images/Vector.svg"} className="w-4" width={7} height={13} alt="" />
                            </button>

                            <div ref={dataSources} className="absolute top-14 inset-x-0 hidden flex-col gap-4 bg-[#03301D] p-2 rounded-md">
                                {dataSourceList.map((dataSource, i) => {
                                    return (
                                        <button onClick={() => toggleDataSources(i)} key={i} className="w-full bg-[#05F292] rounded-full px-4 py-2 text-base flex gap-2 text-black items-center justify-between   relative">
                                            <span className="inline-block truncate text-black">{dataSource}</span>
                                            <Image src={"/images/Vector.svg"} className="w-4" width={7} height={13} alt="" />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <button className="bg-[#05F292] rounded-full px-4 py-2 flex gap-2 text-black w-fit items-center justify-center">
                            {dateList[0]}
                            <Image src={"/images/Vector.svg"} className="w-4" width={7} height={13} alt="" />
                        </button>
                    </div>

                    {isData ?
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-4">
                            {
                                NFTInfos?.map((NFTInfo, i) => {
                                    return (
                                        <XData tokenID={NFTInfo.tokenID} key={i} />
                                    )
                                })
                            }
                        </div> :

                        <div className="hidden flex-col gap-4 top-1/2 -translate-y-1/2 absolute md:w-1/2 lg:w-1/4 text-center mx-auto inset-x-0 p-4">
                            <p className="">Some space is empty. Let&apos;s GODATA Some data and cash in fun reward</p>
                            <button className="bg-[#05F292] text-black font-bold py-2 px-8 w-fit rounded-full mx-auto">GO!</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}