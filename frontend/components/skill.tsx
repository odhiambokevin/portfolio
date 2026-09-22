import { getSkills } from "@/lib/api";

export async function SkillSection() { 
    const { data: skillData, error } = await getSkills();
    
    return (
        <section className="section-shell capabilities" id="skills">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">skills</p>
                    <h2>data <em>to</em> intelligence<em>.</em></h2>
                </div>
            </div>

            <div className="capability-grid">
                {skillData.map((skill, index) => 
                
                    <div className="capability" key={index}>
                        <span>0{index + 1}</span>
                        <h3>{skill.title}</h3>
                        <p>{skill.description}</p>
                    </div>)}
            </div>
        </section>

        )
    }