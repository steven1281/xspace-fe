import Footer from "@/components/footer"
import Header from "@/components/header"
import ReferFooterComponent from "@/components/refer-footer-component"
import { TaskBox } from "@/components/tasks-component"
import { TasksPrice } from "@/components/tasks-price"
import Image from "next/image"

export default function Tasks() {
    const twitterText = "";
    const tgText = "";
    const currentUrl = "";
    return (
        <>
            <div className="px-6 md:px-12 lg:px-20 relative">
                <div className="absolute bottom-24 h-screen w-full">
                    <Image src={"/images/Group 34506.png"} className="absolute right-0 w-24 -bottom-1/3" width={656} height={656} alt="" />
                    <Image src={"/images/Ellipse 19.png"} className="absolute right-0 -bottom-1/3 h-screen" width={1395} height={1171} alt="" />
                </div>

                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] p-6 md:px-12 lg:px-20 rounded-2xl my-12 relative flex flex-col gap-6 lg:flex-row z-10">
                    <Image src={"/images/Group-34537.png"} className="mx-auto scale-60 lg:scale-[0.6]" width={394} height={353} alt="" />
                    <div className="flex flex-col gap-2 lg:w-2/3">
                        <section className="flex gap-4">
                            <h2 className="text-2xl">Newbie Task</h2>
                        </section>
                        <p className="mb-4">Wrap up all these tasks, and you&apos;ll get 15 more MUnits!</p>

                        <div className="flex flex-col gap-8">
                            <TaskBox activity={"Daily Check In"} actionid={100} point={5} link={"https://x.com/MemoLabsOrg"} />
                            <TaskBox activity={".Follow @MemoLabsOrg on twitter"} actionid={101} link={"https://x.com/MemoLabsOrg"} />
                            <TaskBox activity={"Join MEMO on Telegram"} actionid={102} link={"https://t.me/memolabsio"} />
                            <TaskBox activity={"Join MEMO on Discord"} actionid={103} link={"https://discord.com/invite/YG4Ydv2E7X"} />
                            <TaskBox activity={"Share Link to TG"} actionid={104} point={5} link={'https://t.me/share/url?url=' + encodeURIComponent(currentUrl) + '&text=' + encodeURIComponent(tgText)} />
                            <TaskBox activity={"Share Link to Twitter"} actionid={105} point={5} link={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twitterText)} />
                        </div>
                    </div>
                </div>
            </div>
            <ReferFooterComponent />
        </>
    )
}