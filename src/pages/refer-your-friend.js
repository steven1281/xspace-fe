import Footer from "@/components/footer"
import Header from "@/components/header"
import { TaskBox } from "@/components/tasks-component"
import { TasksPrice } from "@/components/tasks-price"
import ReferFooterComponent from "@/components/refer-footer-component"

import Image from "next/image"
import { useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useUser } from "@/lib/context/UserContext"

export default function Refer() {
    const { userInfo } = useUser();
    const [copyStatus, setCopyStatus] = useState('');

    const router = useRouter()

    const referModal = useRef(null)

    const toggleReferModal = () => {
        referModal.current.classList.toggle('flex')
        referModal.current.classList.toggle('hidden')
    }

    const handleCopyInviteCode = async () => {
        if (!userInfo?.InviteCode) {
            setCopyStatus('No invite code available');
            return;
        }

        try {
            await navigator.clipboard.writeText(userInfo.InviteCode);
            setCopyStatus('Copied!');

            setTimeout(() => setCopyStatus(''), 3000);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = userInfo.InviteCode;
            document.body.appendChild(textArea);
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                setCopyStatus(successful ? 'Copied!' : 'Failed to copy');
            } catch (err) {
                setCopyStatus('Error copying');
            }

            document.body.removeChild(textArea);
        }
    };

    return (
        <>
            <div ref={referModal} className="fixed inset-0 bg-[#121212]/70 z-50 hidden justify-center items-center">
                <div className="bg-gradient-to-bl from-[#158274] to-[#0FA675] p-4 w-4/5 md:w-1/3 flex flex-col gap-4 relative border-b-4 border-solid border-xspace-green rounded-xl">
                    <button onClick={toggleReferModal} className="absolute right-4"><Image src={"/images/close-circle.svg"} className="w-6" width={515} height={354} alt="" /></button>
                    <h2 className="text-xl text-center mt-8">Get a Referral Code</h2>
                    <p className="bg-[#086251] w-full p-4 border border-solid border-xspace-green"></p>

                    <div className="flex justify-center items-center gap-4">
                        <button onClick={toggleReferModal} className="px-4 py-2 font-semibold text-black bg-xspace-green rounded-full">Close</button>
                        <button className="px-4 py-2 font-semibold hover:bg-xspace-green/20 rounded-full">Skip</button>
                    </div>
                    <p className="text-center px-4">Don&apos;t have one? Go to <Link href={"#"} className="text-xspace-green">DIN Discord</Link> and <Link href={"#"} className="text-xspace-green">X</Link></p>
                </div>
            </div>

            <div className="px-6 md:px-12 lg:px-20 relative">
                <div className="absolute bottom-24 h-screen w-full">
                    <Image src={"/images/Group 34506.png"} className="absolute right-0 w-24 -bottom-1/3" width={656} height={656} alt="" />
                    <Image src={"/images/Ellipse 19.png"} className="absolute right-0 -bottom-1/3 h-screen" width={1395} height={1171} alt="" />
                </div>

            

                <div className="w-full flex justify-between md:grid md:grid-cols-3 items-center py-6">
                    <button onClick={() => router.back()} className="relative top-1"><svg className="size-8" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="m274-450 248 248-42 42-320-320 320-320 42 42-248 248h526v60H274Z" /></svg></button>
                    <h1 className="text-3xl text-center">Refer your friends</h1>
                    <button className="hidden md:block invisible"></button>
                </div>

                <div className="flex text-lg flex-col-reverse gap-4 md:flex-row w-full justify-between bg-gradient-to-br from-[#1E4874] to-[#0EB476] rounded-lg border-b-4 border-solid border-[#05F292] p-6 md:p-12 relative">
                    <div className="flex flex-col gap-4">
                        <p className="text-center md:text-left">When your friend</p>
                        <section className="flex gap-4 justify-between">
                            <p className="">Connect wallet</p>
                            <Image src={"/images/Arrow 1.svg"} width={33} height={0} alt="" />
                            <Image src={"/images/token 3.svg"} width={30} height={30} alt="" />
                            <p className="capitalize">You&apos;ll both get 5 wafers</p>
                        </section>

                        <section className="flex gap-4">
                            <p className="">Complete &apos;Newbie Task&apos;</p>
                            <Image src={"/images/Arrow 1.svg"} width={33} height={0} alt="" />
                            <Image src={"/images/token 3.svg"} width={30} height={30} alt="" />
                            <p className="capitalize">You&apos;ll both get 50 wafers</p>
                        </section>
                    </div>

                    <Image src={"/images/refer-coins.png"} className="mx-auto md:mx-0" width={104} height={91} alt="" />
                </div>

                <div className="grid md:grid-cols-2 my-6 gap-6 relative z-10">
                    <div className="bg-[#021B12] p-4 rounded-lg grid grid-cols-2 items-center">
                        <div className="border-r border-solid border-xspace-border flex gap-3 items-center">
                            <Image src={"/images/my-invitees.png"} width={45} height={42} alt="" />
                            <p className="font-bold">My Invitees</p>
                        </div>
                        <p className="text-xspace-green font-bold text-right">{userInfo ? userInfo.Referrals : "-"}</p>
                    </div>

                    <div className="bg-[#021B12] p-4 rounded-lg grid grid-cols-2 items-center">
                        <div className="border-r border-solid border-xspace-border flex gap-3 items-center">
                            <Image src={"/images/referral-reward.svg"} width={40} height={37} alt="" />
                            <p className="font-bold">Referral Reward</p>
                        </div>
                        <p className="text-xspace-green font-bold text-right">{userInfo ? userInfo.Points : 0} Wafers</p>
                    </div>

                    <div className="bg-[#021B12] p-4 rounded-lg grid grid-cols-2 items-center">
                        <div className="border-r border-solid border-xspace-border flex flex-col">
                            <p className="font-bold">My Invite Code</p>
                            <p className="font-bold">{userInfo ? userInfo.InviteCode : "-"}</p>
                        </div>
                        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center items-center gap-4 pl-4">
                            <button onClick={toggleReferModal} className="lg:text-sm w-fit p-2 rounded-full flex items-center gap-2 bg-xspace-green text-black">Share Link<Image src={"/images/share-link.svg"} className="w-5" width={14} height={12} alt="" /></button>
                            <button onClick={handleCopyInviteCode} className="lg:text-sm w-fit p-2 rounded-full flex items-center gap-2 bg-white text-xspace-dark">Copy Link<Image src={"/images/icon-park-outline_copy.svg"} className="w-5" width={14} height={14} alt="" /></button>
                            {copyStatus && (
                                <div className="text-sm text-green-500 animate-fade-in">
                                    {copyStatus}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#021B12] p-4 rounded-lg grid grid-cols-2 items-center">
                        <p className="border-r border-solid border-xspace-border flex gap-3 items-center font-bold">Referral Reward</p>
                        <p className="text-xspace-green font-bold text-right">0 Wafers</p>
                    </div>

                </div>

                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] p-6 md:px-12 lg:px-20 rounded-2xl my-6 relative flex gap-6 z-10 justify-between">
                    <div className="flex flex-col">
                        <h2 className="font-semibold">Invite Master Dashboard</h2>
                        <p className="">Invite a friend and win weekly USDT rewards</p>
                    </div>
                    <button className=""><svg className="size-8" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#05F292"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" /></svg></button>
                </div>

                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] p-6 md:px-12 lg:px-20 rounded-2xl my-6 relative flex gap-6 z-10 justify-between">
                    <div className="flex flex-col">
                        <h2 className="font-semibold">Active Master Dashboard</h2>
                        <p className="">Win weekly USTD rewards and share in Wafer Pool</p>
                    </div>
                    <button className=""><svg className="size-8" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#05F292"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z" /></svg></button>
                </div>
            </div>

            <ReferFooterComponent />
           
        </>
    )
}