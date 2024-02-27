"use client"

import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import { useState, useEffect } from 'react'
import { ProjectType } from '@models/Project'
import { GroupType } from '@models/Group'
import { databaseToProjectModel, databaseToGroupModel } from '@utils/convert'
import Link from 'next/link'
import Image from 'next/image'

export default function page() {

    const [projects, setProjects] = useState<ProjectType | null>(null);

    useEffect(() => {
      const fetchData = async () => {
          let res = await fetch('/api/project/list', {
              method: 'GET'
          });
          const data = await res.json();
          if (data.success) {
              console.log("GET: ", data.data)
              setProjects(databaseToProjectModel(data.data));
          } else {
              console.error('Failed to fetch projects:', data.error);
          }

          res = await fetch('/api/group/list', {
              method: 'GET'
          });
          const groupData = await res.json();
          if (groupData.success) {
              console.log("GET: ", groupData.data)
              setProjects(databaseToGroupModel(groupData.data));
          } else {
              console.error('Failed to fetch groups:', groupData.error);
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
      <div className='flex items-center'>
        <Title {...title} />
        <Link href="/pages/projects/create" className='create-project-button'>
          <div className='flex gap-2'>
            <Image
              src="/icons/plus-blanc.svg"
              alt="Créer un projet"
              width={20}
              height={20}
            />
            Créer un projet
          </div>
        </Link>
      </div>
    </div>
  )
}
