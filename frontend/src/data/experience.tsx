import {ExperienceType} from '@/lib/types/Experience.types';

export const experienceData: ExperienceType[] = [
    {
        id:1,
        role:"geospatial developer",
        company:"yaspi",
        startPeriod:"feb 2025",
        endPeriod:"present",
        responsibilities:[
            {id:1, description:"flood-risk machine learning model"},
            {id:2, description:"frontend dvelopment"},
            {id:3, description:"api testing"},
            {id:4, description:"sql exploratory analysis"},
            {id:5, description:"geospatial database implementation on cloud"}
        ]
    },
    {
        id:2,
        role:"cci kenya",
        company:"contact centre agent",
        startPeriod:"aug 2024",
        endPeriod:"jan 2025",
        responsibilities:[
            {id:1, description:"investigated fraud-related cases by analyzing data"},
            {id:2, description:"assess accounts to identify patterns and support accurate resolution"},
            {id:3, description:"generated frontline service insights that supported issue resolution"},            
        ]
    },
    {
        id:3,
        role:"cloud gis consultant",
        company:"perk group africa",
        startPeriod:"jul 2023",
        endPeriod:"aug 2024",
        responsibilities:[
            {id:1, description:"african lakes hub project"},
            {id:2, description:"built dashboards and analytical summaries"},
            {id:3, description:"facility mapping resources on cloud platforms"},
            {id:4, description:"deployed data-driven web GIS solutions"},
            {id:5, description:"designed and implemented spatial databases"},
            {id:6, description:"integrated web servers with data pipelines to streamline data flow, storage, and downstream analytics consumption"},            
        ]
    },
    {
        id:4,
        role:"project assistant",
        company:"national museums of kenya",
        startPeriod:"nov 2018",
        endPeriod:"dec 2021",
        responsibilities:[
            {id:1, description:"developed data pipelines that extracted insights from historical datasets"},
            {id:2, description:"processed and modeled data from structured and semi-structured sources using Python,SQL"},
            {id:3, description:"improved data quality and consistency by introducing Darwin Core standards for biodiversity and spatial datasets"},
            {id:4, description:"mined data from literature, databases, and other sources using automated extraction and feature engineering"},
            {id:5, description:"processed and organized complex field and research data"},
            {id:6, description:"contributed to analytical outputs by transforming raw species data into structured actionable information assets"},
            {id:7, description:"assisted in quality reviews and metadata documentation"},
        ]
    },
    {
        id:5,
        role:"trainer, gis",
        company:"kenya airports authority project",
        startPeriod:"nov 2019",
        endPeriod:"dec 2019",
        responsibilities:[
            {id:1, description:"trained wildlife control officers on setting up long-term data etl pipelines"},
            {id:2, description:"improved their monitoring and evaluation for anomaly detection and hazard mapping"},
        ]
    },
]