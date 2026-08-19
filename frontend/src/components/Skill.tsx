import Image from "next/image";
import { getSkills } from "@/lib/api";
import ErrorToast from "@/components/ErrorToast";

export default async function Skill() {
  const { data: skillData, error } = await getSkills();

  return (
    <section id="skill" className="scroll-mt-[120px] py-4 min-h-[100svh] relative">
    <ErrorToast message={error ? `Skills: ${error}` : null} />
      <div className="py-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-center text-5xl text-accent">skills</h1>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-md:max-w-lg mx-auto mt-16 max-md:px-2">
            {skillData.slice(0, 6).map((skill, index) => (
              <div key={index} className="group bg-purple-50 text-left border border-gray-300 p-6 transform hover:-translate-y-1 hover:border-accent hover:shadow-accent hover:shadow-md transition-all duration-300 rounded-lg shadow-sm">
                <Image src={`/images/skill/${skill.image}`} alt="img-1" className="w-[25px]" width={25} height={25} />
                <h3 className="text-slate-900 text-lg font-medium mb-2 group-hover:text-accent">{skill.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}