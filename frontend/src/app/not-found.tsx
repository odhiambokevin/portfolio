import Image from "next/image";

export default function Notfound() {
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto max-md:w-screen">
        <div className="flex items-center justify-center text-4xl md:text-5xl xl:text-6xl">not found</div>
        <div className="block404 mx-auto rounded-md">
            <div className="waves"></div>
            <div className="obj">
                <Image src="/images/me.png" alt="profile" className="" width={700} height={200} priority />
            </div>
            <div className="t404"></div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                                <filter id="glitch">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" result="warp" id="turb"/>
                                    <feColorMatrix in="warp" result="huedturb" type="hueRotate" values="90">
                                            <animate attributeType="XML" attributeName="values" values="0;180;360" dur="3s"
                                                            repeatCount="indefinite"/>
                                    </feColorMatrix>
                                    <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="50" in="SourceGraphic" in2="huedturb"/>
                                </filter>
                </defs>
            </svg>
    </div>
    </div>
  )
}
