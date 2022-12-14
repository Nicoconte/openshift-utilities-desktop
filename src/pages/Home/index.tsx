import React, { useEffect, useState } from "react";
import { GitRepositoryService } from "../../api/services/gitRepository.service";
import { GitRepository } from "../../data/interfaces/gitRepository.interface";

import { ArchiveBoxXMarkIcon, FolderIcon, PlusIcon } from '@heroicons/react/24/outline'
import { AddGitRepositoryModal } from "./AddGitRepositoryModal";
import { GitRepositoryCards } from "./RepositoryCards";
import { FilterGitRepositoriesForm } from "./FilterGitRepositoriesForm";

export const Home = () => {
    const [gitRepositories, setGitRepositories] = useState<GitRepository[]>([]);
    const [gitRepositoriesFiltered, setGitRepositoriesFiltered] = useState<GitRepository[]>([]);

    const [isFirstUse, setIsFirstUse] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        if (gitRepositories.length === 0) {
            GitRepositoryService.getAll().then(repos => {
                setGitRepositories(repos);
                setGitRepositoriesFiltered(repos);
                setIsFirstUse(repos.length === 0)
            });
        }
    }, [])

    if (gitRepositories.length === 0 && isFirstUse) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
                <FolderIcon className="h-24 dark:text-white" />
                <span className="text-2xl mt-2 font-extrabold dark:text-white">No hay repositorios disponibles</span>
                <span className="mt-5 text-lg font-semibold  text-slate-600 dark:text-slate-200">
                    Aca encontrara todos los repositorios que vaya agregando. <br />
                </span>
                <AddGitRepositoryModal
                    text={"Agregar repositorio"}
                    open={openModal}
                    setOpen={setOpenModal}
                    icon={<PlusIcon className="h-9 mr-1" />}
                    buttonClassname={"bg-blue-500 hover:bg-blue-700 flex flex-row border-slate-800 justify-center items-center w-56 h-14 rounded text-white font-bold text-md shadow hover:shadow-lg outline-none focus:outline-none mt-5"}
                    gitRepositories={gitRepositoriesFiltered}
                    setGitRepositories={setGitRepositoriesFiltered}
                />
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <AddGitRepositoryModal
                open={openModal}
                setOpen={setOpenModal}
                text={""}
                icon={<PlusIcon className="h-6" />}
                buttonClassname={"bg-blue-500 rounded-full fixed w-11 h-11 rounded-full right-2 bottom-16 flex flex-row justify-center items-center text-white font-bold text-md shadow hover:shadow-lg outline-none focus:outline-none"}
                gitRepositories={gitRepositoriesFiltered}
                setGitRepositories={setGitRepositoriesFiltered}
            />
            <div className="w-full h-1/6 flex items-center justify-center">
                <div className="w-full h-full">
                    <FilterGitRepositoriesForm
                        gitRepositories={gitRepositories}
                        setRepositoriesFiltered={setGitRepositoriesFiltered}
                    />
                </div>
            </div>
            <div className="w-full h-5/6 px-4 py-2">
                {gitRepositoriesFiltered.length === 0 &&
                    <div className="w-full h-full flex flex-col justify-start items-center">
                        <ArchiveBoxXMarkIcon className="h-40 mt-6 text-red-800 dark:text-red-500" />
                        <span className="text-2xl font-bold text-slate-800 mt-5 dark:text-white">No pudimos encontrar el repositorio que buscas</span>
                    </div>
                }
                <div className="h-full grid grid-cols-3 overflow-auto grid-flow-row gap-6">
                    {gitRepositoriesFiltered.map((repo, index) => <GitRepositoryCards key={index} repository={repo} />)}
                </div>
            </div>
        </div>
    )
}