"use client"

import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import { useState, useEffect } from 'react'
import { ProjectType } from '@models/Project'

function databaseToModel(data: JSON) {
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
            group: data[i].group,
            created_at: data[i].created_at,
            updated_at: data[i].updated_at
        }
        projects.push(project);
    }

    return projects;
}

export default function page() {

    const [projects, setProjects] = useState<ProjectType | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          const res = await fetch('/api/project/list', {
              method: 'GET'
          });
          const data = await res.json();
          if (data.success) {
              console.log("GET: ", data.data)
              setProjects(databaseToModel(data.data));
          } else {
              console.error('Failed to fetch projects:', data.error);
          }
      };
      fetchData();
    }, []);

    const title: TitleType = {
      title: "Vos projets",
      image: "/icons/but.svg",
      number: projects ? projects.length.toString() : "0",
      back: "#"
    }

  return (
    <div>
        <Title {...title} />
    </div>
  )
}
