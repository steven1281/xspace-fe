import Footer from "@/components/footer"
import Header from "@/components/header"
import { usePoint } from "@/lib/context/PointContext"
import Image from "next/image"
import { useState } from "react"

export default function Earnings() {
    const { history } = usePoint();

    return (
        <>
            <div className="px-6 md:px-12 lg:px-20 relative">
                <div className="absolute bottom-24 h-screen w-full">
                    <Image src={"/images/Group 34506.png"} className="absolute right-0 w-24 -bottom-1/3" width={656} height={656} alt="" />
                    <Image src={"/images/Ellipse 19.png"} className="absolute right-0 -bottom-1/3 h-screen" width={1395} height={1171} alt="" />
                </div>

                <Header />
                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] p-4 rounded-2xl my-12 relative flex flex-col gap-6 md:flex-row z-10">
                    <div className="flex w-1/2 items-center gap-4 flex-wrap h-fit border-b border-solid border-[#65646450] pb-4 pr-4 md:border-r md:border-b-0 md:w-fit md:items-center md:justify-center md:py-4">
                        <Image src={"/images/download (14) 1.svg"} width={33} height={33} alt="" />
                        <p className="">mData ►---</p>
                        <p className="px-2">0</p>
                    </div>

                    <div className="flex w-1/2 items-center gap-4 flex-wrap h-fit pb-4 pr-4 md:w-fit md:items-center md:justify-center md:py-4">
                        <Image src={"/images/question.svg"} className="w-6" width={33} height={33} alt="" />
                        <p className="">mData ►---</p>
                        <p className="px-2">0</p>
                    </div>
                    <Image src={"/images/3-bars.svg"} className="absolute top-4 right-4" width={38} height={38} alt="" />
                </div>

                <button className="bg-xspace-green text-black py-3 px-4 font-bold rounded-full">mData History</button>

                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] p-6 md:p-12 rounded-2xl my-12 flex  relative z-10">
                    <table className="w-full ">
                        <thead>
                            <tr>
                                <th className="text-center border-r border-solid border-xspace-border">Activity</th>
                                <th className="text-center">mData</th>
                                <th className="text-center border-l border-solid border-xspace-border">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map((item, index) => (
                                    <tr className="text-center py-3 leading-10" key={index}>
                                        <td>{item.Name}</td>
                                        <td>{"-"}</td>
                                        <td>{item.Time?.slice(0, 19)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {/* <div className="flex flex-col gap-4 items-center mt-4">
                        <Image src={"/images/empty-box.svg"} width={31} height={31} alt="" />
                        <p className="text-[#186143]">No Data</p>
                    </div> */}

                </div>
            </div>

            <Footer />
        </>
    )
}