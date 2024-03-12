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
import dateFormater from '@utils/dateFormater'

export default function page() {

    const [projects, setProjects] = useState<ProjectType | null>(null);
    const [group, setGroup] = useState<GroupType | null>(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
          // Get User Session
          let res = await fetch('/api/session', {
              method: 'GET'
          });
          const session = await res.json();
          if (!session.success) {
              console.error('Failed to fetch session:', session.error);
              alert(session.error);
          } else {
              await setUser(session.session.user);
              // Get Projects
              // Get Projects
              res = await fetch(`/api/project/list?id=${encodeURIComponent(session.session.user.id)}`, {
                method: 'GET'
              });
              const data = await res.json();
              if (data.success) {
                let projectsData = databaseToProjectModel(data.data);
                for (let i = 0; i < projectsData.length; i++) {
                    // Get Group By Id
                    res = await fetch(`/api/group/id?id=${encodeURIComponent(projectsData[i].group)}`, {
                        method: 'GET'
                    });
                    const groupData = await res.json();
                    if (groupData.success) {
                        const groupInfo = databaseToGroupModel(groupData.data);
                        if (groupInfo.id) {
                            projectsData[i].groupInfo = groupInfo;
                        } else {
                            console.log('Invalid group data:', groupInfo);
                        }
                    } else {
                        console.error('Failed to fetch groups:', groupData.error);
                    }
                }
                await setProjects(projectsData);
              } else {
                console.error('Failed to fetch projects:', data.error);
              }
          }
      };
      fetchData();
  }, []);

    const title: TitleType = {
      title: "Vos projets",
      image: "/icons/but.svg",
      number: projects ? projects.length.toString() : "0",
      back: "#",
      canChange: false
    }

    const handleDeleteProject = async (id: number) => {
      if (window.confirm("Voulez-vous vraiment supprimer ce projet ?\n Cet action est irréversible.")) {
        console.log("DELETE PROJECT WITH ID: ", id)
        let res = await fetch(`/api/project?id_project=${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          window.location.reload()
        } else {
          alert("FAILED")
        }
      } else {
        console.log("Project not deleted.")
      }
    }

    const handleDuplicateProject = async (id: number) => {
      console.log("DUPLICATE PROJECT WITH ID: ", id)
      let res = await fetch(`/api/project/duplicate?id_project=${id}`, {
        method: 'POST'
      });
      if (res.ok) {
        window.location.reload()
      } else {
        console.log("Error while duplicating project: ", res)
        alert("FAILED")
      }
    }

  return (
    <div>
      {/* Header */}
      <div className='flex items-center mb-10'>
        <Title {...title} />
        <Link href="/pages/projects/create" className='create-project-button create-project-btn'>
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
      {/* Projects */}
      <div className='flex items-center justify-center gap-4 mt-10 flex-wrap ml-10 projects-container'>
        {projects ? projects.map((project, index) => {
          const group = project.groupInfo;
          const showProjectUrl = '/pages/projects/' + project.id;
          return (
            <div key={index} className='flex flex-col project-card gap-2 project-zoom'>
                <p className='group text-in-single-line'>{group ? group.name : 'Aucun Groupe'}</p>
                <p className='name text-in-single-line'>{project.name}</p>
                <p className='description text-in-single-line'>{project.description ? project.description : 'Aucune description'}</p>
                <div className='flex'>
                  <p className='date mr-auto'>Dernières modifications:</p>
                  <p className='date mr-5'>{dateFormater(project.updated_at).date} à {dateFormater(project.updated_at).time}</p>
                </div>
                <div className='line'></div>
                <div className='flex justify-center items-center gap-5'>
                  <div className='flex items-center gap-2 delete-btn cursor-pointer' onClick={() => handleDeleteProject(project.id)}>
                    <Image
                      src="/icons/trash-can.svg"
                      alt="Supprimer le projet"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div onClick={() => {handleDuplicateProject(project.id)}} className='flex items-center open-btn cursor-pointer'>
                    <p className=''>Dupliquer</p>
                  </div>
                  <Link href={showProjectUrl}>
                    <div className='flex items-center open-btn'>
                      <p className=''>Ouvrir</p>
                    </div>
                  </Link>
                </div>

            </div>
          )
        }) : <p>Vous n'avez pas de projets pour le moment.</p>}
      </div>
    </div>
  )
}
