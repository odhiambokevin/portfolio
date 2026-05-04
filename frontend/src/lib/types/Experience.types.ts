export type ExperienceType = {
    id:number
    role:string
    company:string
    startPeriod:string
    endPeriod:string
    responsibilities:{id:number, description:string}[]
}