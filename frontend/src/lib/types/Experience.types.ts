export type Responsibility = {
    id: number;
    description: string;
}

export type ExperienceType = {
    id:number
    role:string
    company:string
    startPeriod:string
    endPeriod:string
    responsibilities: Responsibility[];
}