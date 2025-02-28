import Footer from "@/components/footer"
import Header from "@/components/header"
import Image from "next/image"
import { useRef, useState } from "react"
import { useProjects } from "@/lib/context/ProjectsContext"

export default function Ranks() {
    const { projects, rankInfo } = useProjects();
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const dateList = ['All Date', 'Twitter']

    const menuButton = useRef(null)
    const side = useRef(null)
    const main = useRef(null)

    const handleProjectSelect = (index) => {
        console.log("project list", projects);
        setSelectedProjectIndex(index);
    };


    const sideToggle = () => {
        side.current.classList.toggle('flex')
        side.current.classList.toggle('hidden')

        main.current.classList.toggle('flex')
        main.current.classList.toggle('hidden')
    }


    return (
        <>
            <div className="px-6 md:px-12 lg:px-20 relative">
                <div className="absolute bottom-24 h-screen w-full">
                    <Image src={"/images/Group 34506.png"} className="absolute right-0 w-24 -bottom-1/3" width={656} height={656} alt="" />
                    <Image src={"/images/Ellipse 19.png"} className="absolute right-0 -bottom-1/3 h-screen" width={1395} height={1171} alt="" />
                </div>

               
                <div className="bg-[#05F29205] border-x-4 border-solid border-[#05F292] pl-0 rounded-2xl my-12 relative flex gap-6 md:flex-row z-10">
                    <div ref={side} className="hidden lg:flex flex-col gap-0 bg-[#024025] rounded-2xl p-4">
                        <button onClick={sideToggle} className="absolute top-6 right-6 lg:hidden bg-xspace-green/20 p-2 rounded-md mb-4"><svg className="size-6" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" /></svg></button>

                        {projects.map((project, i) => {
                            return (
                                <p
                                    onClick={() => handleProjectSelect(i)}
                                    key={i} id={`${project.projectID}`}
                                    className={`dedin_iter w-full p-4 border-b border-dashed border-xspace-border 
                                    ${i === selectedProjectIndex ? 'text-[#05F292]' : 'text-white'}`}>
                                    {project.Name}
                                </p>
                            )
                        })}
                    </div>

                    <div ref={main} className="lg:w-4/5 p-4">
                        <button ref={menuButton} onClick={sideToggle} className="lg:hidden bg-xspace-green/20 p-2 rounded-md mb-4"><svg className="size-6" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M510-570v-270h330v270H510ZM120-450v-390h330v390H120Zm390 330v-390h330v390H510Zm-390 0v-270h330v270H120Zm60-390h210v-270H180v270Zm390 330h210v-270H570v270Zm0-450h210v-150H570v150ZM180-180h210v-150H180v150Zm210-330Zm180-120Zm0 180ZM390-330Z" /></svg></button>
                        <section className="flex justify-between items-center gap-4">
                            <div className="">
                                <h2 className="text-[#05F292]">{projects[selectedProjectIndex]?.Name}</h2>
                                <p className="">
                                    {projects[selectedProjectIndex]?.Start.slice(0, 10)} - {projects[selectedProjectIndex]?.End.slice(0, 10)}
                                </p>
                            </div>
                            <div className="flex w-1/2 items-center gap-4 h-fit items-center md:py-4">
                                <Image src={"/images/download (14) 1.svg"} width={33} height={33} alt="" />
                                <p className="">mData Pool: $250,000</p>
                            </div>
                        </section>

                        <div className="overflow-auto mt-8 mb-4 max-h-[75vh]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Wallet</th>
                                        <th>Scores</th>
                                        <th>mData</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        rankInfo.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.Rank}</td>
                                                <td>{item.Address}</td>
                                                <td>{item.Scores}</td>
                                                <td>{item.Points}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        { /**
                          * TODO - PAGINATION 
                          * Server Rendered Data
                          */}
                    </div>
                </div>

            </div>

        
        </>
    )
}