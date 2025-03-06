import Footer from "@/components/footer"
import Header from "@/components/header"
import Image from "next/image"
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from "wagmi";
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const { openConnectModal } = useConnectModal();
    const { isConnected } = useAccount();
    useEffect(() => {
        if (isConnected) {

        }
    }, [isConnected])

    return (
        <>
            <header className="min-h-screen px-6 md:px-12 lg:px-20 relative">
                <Image src={"/images/Group 34506.png"} className="absolute right-0 w-24 top-1/2 -translate-y-1/2" width={656} height={656} alt="" />
                <Image src={"/images/Ellipse 18.png"} className="absolute right-0 inset-y-0 h-screen" width={1395} height={1171} alt="" />
                <Image src={"/images/Ellipse 19.png"} className="absolute right-0 inset-y-0 h-screen bottom-0" width={997} height={1171} alt="" />

                <div className="text-center grid gap-12 md:grid-cols-2 h-full translate-y-1/4">
                    <div className="flex flex-col gap-6 md:pt-12">
                        <h1 className="text-5xl md:text-left md:text-7xl">AI Data <span className="text-[#05F292] paytone-one">Node</span> Infrastructure</h1>
                        <button onClick={() => { isConnected ? router.push('/space') : openConnectModal() }} className="bg-gradient-to-b from-[#074D35] to-[#05F292] px-6 py-3 w-fit rounded-full mx-auto md:mx-0">Start XSpace</button>
                    </div>
                    <Image src={"/images/Frame 172.png"} className="w-4/5 mx-auto relative" width={463} height={432} alt="" />
                </div>
            </header >

            <div className="px-6 md:px-12 lg:px-20">
                <section className="bg-[#05F29205] border-x-2 border-solid border-[#05F292] rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:p-8">
                    <div className="text-center p-4 border-r-[0.25px] border-solid border-[#65646450]"><p className="capitalize">Store Data on chain</p></div>
                    <div className="text-center p-4 border-l-[0.25px] border-solid border-[#65646450] md:border-x-[0.25px]"><p className="capitalize">Collect Data to earn</p></div>
                    <div className="text-center p-4 border-r-[0.25px] border-solid border-[#65646450] md:border-x-[0.25px]"><p className="capitalize">accurate data to enhance AI</p></div>
                    <div className="text-center p-4 border-l-[0.25px] border-solid border-[#65646450]"><p className="capitalize">Turn Data into Rewards</p></div>
                </section>
            </div>

            <div className="px-6 md:px-12 lg:px-20 my-12 flex flex-col gap-4 relative">
                <Image src={"/images/Group 34506-l.png"} className="absolute left-0 w-24 -bottom-32" width={656} height={656} alt="" />

                <div className="flex justify-between items-end relative">
                    <h2 className="text-[#05F292] text-3xl w-72">Must-have XSpace Extension</h2>
                    <div className="w-fit">
                        <Image src={"/images/friendship 1.svg"} className="w-32 mx-auto" width={119} height={109} alt="" />
                        <button className="w-40 p-2 rounded-full bg-gradient-to-b from-[#074D35] to-[#05F292] relative -top-1">Refer a friend MUnits the two </button>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row justify-between bg-gradient-to-br from-[#1E4874] to-[#0EB476] rounded-lg border-b-4 border-solid border-[#05F292] p-12 relative">
                    <p className="md:w-1/2 text-center md:text-left">Install XSpace and open on X to accomplish missions and unlock rewards.</p>
                    <div className="grid grid-cols-2 gap-2 w-fit mx-auto md:mx-0">
                        <button className="bg-[#05F292] rounded-full p-2 flex gap-2 text-black w-fit">
                            <Image src={"/images/Group 34501.svg"} width={22} height={22} alt="" />
                            Chrome
                        </button>
                        <button className="bg-[#05F292] rounded-full p-2 pt-2 flex gap-2 text-black w-full items-center justify-center">
                            <Image src={"/images/edge.svg"} width={21} height={21} alt="" />
                            Edge
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}