import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/api";
import ErrorToast from "@/components/ErrorToast";

export default async function Portfolio() {
  const { data: portfolioData, error } = await getPortfolio();

  return (
    <section id="portfolio" className="scroll-mt-[120px] py-4 min-h-[100svh] relative">
      <ErrorToast message={error ? `Portfolio: ${error}` : null} />
      <h1 className="text-center text-5xl text-accent">portfolio</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-[40px] px-4 max-w-screen-xl mx-auto">
        {portfolioData.slice(0, 6).map((portfolio, index) => (
          <Link key={index} href={`${portfolio.url}`} target="_blank" className="block">
            <div className="bg-gray-100 overflow-hidden hover:border-accent hover:shadow-accent hover:shadow-md transition-all duration-300 rounded-lg shadow-sm aspect-square flex items-center justify-center">
              <Image src={`/images/portfolio/${portfolio.image}`} alt={`${portfolio.image}`} className="h-full w-full object-contain p-8" width={600} height={400} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}