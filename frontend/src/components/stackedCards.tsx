"use client"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother);

const cardsData = [
  {title:"port 1",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!1",image:"/images/image1.jpg"},
  {title:"port 2",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!2",image:"/images/image1.jpg"},
  {title:"port 3",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!3",image:"/images/image1.jpg"},
  {title:"port 4",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!4",image:"/images/image1.jpg"},
  {title:"port 5",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!5",image:"/images/image1.jpg"},
  {title:"port 6",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!6",image:"/images/image1.jpg"},
  {title:"port 7",description:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nam, reiciendis odio, molestiae quo magnam distinctio facere, qui ab itaque minima atque voluptatibus numquam incidunt eaque quibusdam adipisci optio debitis. Ratione similique fugit obcaecati accusantium eveniet, blanditiis ea vel dolorum earum, ipsa vitae numquam laudantium consectetur. Laborum harum optio ex!7",image:"/images/image1.jpg"},
  
]

export default function StackedCards() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.2,
        effects: true,
        smoothTouch: 0.1,
      }
      )
    }
  )

  const cards = gsap.utils.toArray(".card");

  gsap.set(".img-wrapper img",{
    clipPath:"polygon(0 0, 0 100%, 0 0)",
    autoAlpha: 0,
  });

  gsap.set(".card-content h1, card-content p",{
    y: 0,
    autoAlpha: 0,
  });

  cards.forEach((card:any, index)=>{
    const img = card.querySelector("img");
    const textEls = card.querySelectorAll(".card-content h1, .card-content p");

    gsap.to(card, {
      scale: 0.8 + 0.2 * (index / (cards.length -1)),
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top" + (15 + 35 * index),
        end: "bottom bottom",
        endTrigger: ".container",
        scrub: true,
        pin: card,
        pinSpacing: false,
        invalidateOnRefresh: true,
      }
    });

    ScrollTrigger.create({
      trigger: card,
      start: "bottom bottom",
      once: true,
      onEnter: ()=>{
        const tl = gsap.timeline();

        tl.to(img, {
          clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
          autoAlpha: 1,
          duration: 2,
          delay: 1,
          ease: "power2.out",
        });

        tl.to(textEls, {
          y: -10,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.in",
          stagger: 0.4,
        }, "-=1.5");
      }
    }
    )
   
  },
  {scope: contentRef});


  

  return (
    <div id="smooth-wrapper" className="h-full overflow-hidden" ref={wrapperRef}>
      <div id="smooth-content" className="will-change-transform" ref={contentRef}>
        <div className="spacer w-full min-h-screen"></div>
        <div className="containerss w-full min-h-screen flex flex-col items-center">
          <div className="stacked-cards flex flex-col items-center w-[70%]">
            {cardsData.map(
              (card, index)=>(
                <div className="card w-full h-[75svh] flex rounded-[10px] shadow-[rgba(0,0,0,0.2)_0_10px_20px,rgba(0,0,0,0.2)_0_6px_6px]
                bg-[#0b0101] mb-[75svh]" key={index}>
                  <div className="card-content w-[50%] h-full flex flex-col items-center justify-center py-[10px] px-[20px]">
                    <h1 className="text-[clamp(1.8rem,5vw,3.5rem)] font-light">{card.title}</h1>
                    <p className="text-[clamp(0.9rem,2vw,1.1rem)] w-[80%] leading-[1.6] mt-[15px]">{card.description}</p>
                  </div>
                  <div className="img-wrapper w-[50%] h-full rounded-r-[10px]">
                    <Image src={card.image} alt={card.title} width={100} height={100} className="w-full h-full object-contain rounded-[inherit] will-change-[clip-path]" priority/>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
