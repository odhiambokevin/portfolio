import {ExperienceType} from '@/lib/types/Experience.types';

export const experienceData: ExperienceType[] = [
    {
        id:1,
        role:"geospatial developer",
        company:"yaspi",
        startPeriod:"feb 2025",
        endPeriod:"present",
        responsibilities:[
            {id:1, description:"backend development"},
            {id:2, description:"frontend dvelopment"},
            {id:3, description:"api testing"},
            {id:4, description:"containerization of projects for deployment"},
            {id:5, description:"geospatial database implementation"},
        ]
    },
    {
        id:2,
        role:"freelance developer",
        company:"freelance",
        startPeriod:"jan 2022",
        endPeriod:"jan 2025",
        responsibilities:[
            {id:1, description:"african lakes hub project"},
            {id:2, description:"gis integration to frontend for perk group africa consultancy"},
            
        ]
    },
    {
        id:3,
        role:"project assistant",
        company:"national museums of kenya",
        startPeriod:"nov 2018",
        endPeriod:"dec 2021",
        responsibilities:[
            {id:1, description:"geospatial data quality control"},
            {id:2, description:"assess development of portal eg. api endpoint security, spatial standards"},
            {id:3, description:"digitization of natural history specimens and managing databases"},
            {id:4, description:"mining species data from literature and other databases"},
            {id:5, description:"digital mapping products for project use"},
            {id:6, description:"biodiversity data quality control and publishing data online"},
        ]
    },
]