import Image from "next/image";
import Link from "next/link";

export default function ReferFooterComponent() {
    return (
        <div className="w-full flex justify-end px-6 md:px-12 lg:px-20">
            <div className="w-fit text-center">
                <Image src={"/images/friendship 1.svg"} className="w-32 mx-auto relative -bottom-1" width={119} height={109} alt="" />
                <Link href={"/refer-your-friend"} className="inline-block w-40 p-2 rounded-full bg-gradient-to-b from-[#074D35] to-[#05F292] relative">Refer a friend MUnits the two</Link>
            </div>
        </div>
    )
}