import { ProjectType } from "@models/Project";
import { GroupType } from "@models/Group";

export function databaseToGroupModel(data: JSON) {
    let groups: GroupType[] = [];

    const dataArray = Array.from(data);
    for (let i = 0; i < dataArray.length; i++) {
        let group: GroupType = {
            id: data[i].id,
            name: data[i].name,
            description: data[i].description,
            image: data[i].image,
            budget: data[i].budget,
            user_id: data[i].user_id
        }
        groups.push(group);
    }

    return groups[0];
}

export function databaseToProjectModel(data: JSON) {
    let projects: ProjectType[] = [];

    const dataArray = Array.from(data);
    for (let i = 0; i < dataArray.length; i++) {
        let project: ProjectType = {
            id: data[i].id,
            name: data[i].name,
            description: data[i].description,
            image: data[i].image,
            budget: data[i].budget,
            products: data[i].products,
            company: data[i].company,
            location: data[i].location,
            area: data[i].area,
            user_id: data[i].user_id,
            group: data[i].group_id,
            created_at: data[i].created_at,
            updated_at: data[i].updated_at
        }
        projects.push(project);
    }

    return projects;
}