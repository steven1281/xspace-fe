import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/components/config/config';

const ProjectsContext = createContext();


export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [projectid, setProjectid] = useState(1);
    const [pageid, setPageid] = useState(1);
    const [rankInfo, setRankInfo] = useState([]);

    useEffect(() => {
        const Projects = async () => {
            const storedProjects = localStorage.getItem('projects');
            if (storedProjects) {
                console.log("storedProjects", storedProjects)
                setProjects(JSON.parse(storedProjects));
                return;
            }

            try {
                const response = await axios.get(API_URL.PROJECT_LIST);
                if (response.status === 200) {
                    setProjects(response.data.Projects);
                    localStorage.setItem('projects', JSON.stringify(response.data.Projects));
                }
            } catch (error) {
                console.error(error);
            }
        };

        Projects();
    }, []);

    useEffect(() => {
        const RankList = async () => {
            try {
                const response = await axios.get(
                    `${API_URL.PROJECT_RANK}?id=${projectid}&page=${pageid}&size=20`, {
                });
                if (response.status === 200) {
                    setRankInfo(response.data.RankInfo);
                    // localStorage.setItem('rankInfo', JSON.stringify(response.data.RnakInfo));
                    console.log("rank info", response.data.RankInfo);
                }
            } catch (error) {
                console.error(error);
            }
        };

        RankList();
    }, projectid, pageid);

    return (
        <ProjectsContext.Provider value={{ projects, rankInfo }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => {
    const context = useContext(ProjectsContext);

    if (!context) {
        throw new Error('useProjects must be used within a ProjectsProvider');
    }

    return context;
};


