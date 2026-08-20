import {ProjectType} from '@/lib/types/Project.types';

export const projectData: ProjectType[] = [
    {
        id:1,
        title:"fx pipeline",
        stack:["flink,kafka,postgres,docker,airflow,dbt,python"],
        url:"https://github.com/odhiambokevin/xchange-rates"
    }, 
    {
        id:2,
        title:"bank fraud detection",
        stack:["flink,dbt,postgres,kafka,docker,airflow,python"],
        url:"https://github.com/odhiambokevin/bank-fraud-detection-system"
    }, 
    {
        id:3,
        title:"wekeza",
        stack:["javascript,python"],
        url:"https://github.com/odhiambokevin/wekeza"
    }, 
    
]