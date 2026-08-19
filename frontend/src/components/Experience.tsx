import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExperience } from "@/lib/api";
import ErrorToast from "@/components/ErrorToast";

export default async function Experience() {
  const { data: experienceData, error } = await getExperience();

  //check for valid defaultValue since defaultValue={experienceData[0].company} would give error crashing whole section when api is down
 if (experienceData.length === 0) {
    return (
      <section id="experience" className="scroll-mt-[120px] py-4 min-h-[100svh] relative">
        <ErrorToast message={error ? `Experience: ${error}` : null} />
        <h1 className="text-center text-5xl text-accent">experience</h1>
      </section>
    );
  }

  return (
    <section id="experience" className="scroll-mt-[120px] py-4 min-h-[100svh]">
      <ErrorToast message={error ? `Experience: ${error}` : null} />
      <h1 className=" text-center text-5xl text-accent">experience</h1>
      <div className="p-[56px]">
        <div className='w-full md:ml-[20%] p-2'>
          <Tabs defaultValue={experienceData[0].company} className='flex md:flex-row gap-4'>
            <TabsList className='bg-background h-full flex-col rounded-none  p-4'>
              {experienceData.map(experience => (
                <TabsTrigger
                  key={experience.id}
                  value={experience.company}
                  className='cursor-pointer data-[state=active]:bg-muted dark:bg-background text-muted-foreground dark:data-[state=active]:text-accent/85 data-[state=active]:text-accent data-[state=active]:border-accent dark:data-[state=active]:border-accent h-full w-full justify-start rounded-none border-0 border-l-2 border-muted data-[state=active]:shadow-none transition-color duration-200'
                >
                  {experience.company}
                </TabsTrigger>
              ))}
            </TabsList>

            {experienceData.map(experience => (
              <TabsContent key={experience.id} value={experience.company}>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-4'>
                    <h1>{experience.role}&nbsp; {experience.company != 'freelance' && <><span className='text-text-mild'>@</span> <span className='text-accent'>{experience.company}</span></>}</h1>
                  </div>
                  <div className="flex gap-4 items-center">
                    <p className='text-muted-foreground text-sm'>{experience.startPeriod}</p> - <p className='text-muted-foreground text-sm'>{experience.endPeriod}</p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    {experience.responsibilities.map((responsibility) => (
                      <div key={responsibility.id} className='flex gap-2'>
                        <Image src={`/images/check.svg`} alt="img-1" className="w-[15px] " width={15} height={15} />
                        <div className='text-text-mild'>{responsibility.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <div className='absolute bottom-[5%] md:bottom-[30%] mx-[20%] w-2/3 sm:w-9/12 mt-8 h-[2px] bg-slate-300 dark:bg-muted'></div>
    </section>
  );
}