import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { navigate } from "astro:transitions/client";

interface Props {
    activeIcon?: boolean;
    text?: string;
}

const ButtonBack: React.FC<Props> = ({ activeIcon = true, text }) => {
    const goBack = () => {
        const actualPath = window.location.pathname;
        let newPath = actualPath.substring(0, actualPath.lastIndexOf("/"));
        if (newPath === "") newPath = "/";
        navigate(newPath);
    };

    return (
        <Button className="px-2 py-0 max-md:scale-75" variant="outline" onClick={goBack}>
            {activeIcon && <ArrowLeft size={20} />}
            {text}
        </Button>
    );
};

export default ButtonBack;
