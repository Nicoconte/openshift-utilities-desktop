import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../../../context/GlobalContext";
import { SearchForm } from "./Applications/SearchForm";
import { Table } from "./Applications/Table";
import { ProjectSelector } from "./Projects/ProjectSelector";

export const MainContent = () => {
    const { setOpenSideModal } = useContext(GlobalContext) as GlobalContextType;

    const handleOpenSideModal = () => {
        console.log("click")
        setOpenSideModal(true);
    }

    return (
        <div className="w-full" style={{ "height": "86%" }}>
            <div className="w-full flex justify-center items-center" style={{ height: "14.5%" }}>
                <div className="h-full flex flex-row" style={{ width: "89.5%" }}>
                    <div className="w-5/12 h-full">
                        <SearchForm />
                    </div>
                    <div className="w-3/12 h-full">
                        <ProjectSelector />
                    </div>
                    <div className="w-4/12 h-full flex flex-row justify-start items-center">
                        <button onClick={handleOpenSideModal} className="h-8 w-8 rounded-full bg-blue-500 text-white flex justify-center items-center ml-10">
                            <PlusIcon className="h-4" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center" style={{ height: "85.5%" }}>
                <div className="mb-6 shadow-md rounded-md" style={{ width: "89.5%", height: "95%" }}>
                    <Table />
                </div>
            </div>
        </div>
    )
}