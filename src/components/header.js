import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useRef } from 'react';

export default function Header() {
    const { isConnected, address } = useAccount();
    // const { data: session, status } = useSession()

    const menu = useRef(null)
    const openMenuButton = useRef(null)
    const closeMenuButton = useRef(null)

    useEffect(() => {
        const bindAddress = async () => {
            const request = await fetch('https://apapi.memoscan.org/api/user/wallet/bind', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ walletAddress: address })
            })

            const response = await request.json()
            console.log(response.data)
            const uid = response.data.uid
            const token = response.data.token
            await signIn("credentials", {
                redirect: false, // Set to true if you want to redirect after sign-in
                uid, // Pass the identifier to your provider
                token // Pass the identifier to your provider
            });
        }

        if (address) {
            bindAddress()
        }
    }, [address])

    const openMenu = () => {
        menu.current.classList.toggle("hidden")
        menu.current.classList.toggle("flex")

        openMenuButton.current.classList.toggle("block")
        openMenuButton.current.classList.toggle("hidden")

        closeMenuButton.current.classList.toggle("block")
        closeMenuButton.current.classList.toggle("hidden")
    }

    return (
        <div className='relative z-10'>
            <nav className="flex justify-between items-center py-8 border-b border-solid border-[#616161]">
                <Link href={"/"} className="font-bold text-2xl">XSpace</Link>
                <div className='hidden justify-center items-center gap-12 lg:flex'>
                    <Link href={"/"} className='font-medium'>Home</Link>
                    <Link href={"/space"} className='font-medium'>Space</Link>
                    <Link href={"/earnings"} className='font-medium'>Earnings</Link>
                    <Link href={"/ranks"} className='font-medium'>Ranks</Link>
                    <Link href={"/tasks"} className='font-medium'>Tasks</Link>
                </div>
                <div className='flex w-fit gap-4 items-center'>
                    <ConnectButton />
                    <button ref={openMenuButton} onClick={openMenu} className='block lg:hidden'><svg xmlns="http://www.w3.org/2000/svg" className='size-8' height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" /></svg></button>
                    <button ref={closeMenuButton} onClick={openMenu} className='hidden'><svg xmlns="http://www.w3.org/2000/svg" className='size-8' height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg></button>
                </div>
            </nav>

            <div ref={menu} className="hidden flex-col w-full px-6 md:px-20 text-right gap-6 bg-white/10 text-white relative z-50 items-center p-4">
                <Link href={"/"} className='font-semibold text-xl p-4 border-b border-solid border-xspace-border w-full mx-auto text-center'>Home</Link>
                <Link href={"/space"} className='font-semibold text-xl p-4 border-b border-solid border-xspace-border w-full mx-auto text-center'>Space</Link>
                <Link href={"/earnings"} className='font-semibold text-xl p-4 border-b border-solid border-xspace-border w-full mx-auto text-center'>Earnings</Link>
                <Link href={"/ranks"} className='font-semibold text-xl p-4 border-b border-solid border-xspace-border w-full mx-auto text-center'>Ranks</Link>
                <Link href={"/tasks"} className='font-semibold text-xl p-4 border-b border-solid border-xspace-border w-full mx-auto text-center'>Tasks</Link>
            </div>
        </div>
    )
}