import { Link } from "react-router";

interface PropLogo{
    subtitle?: string;
};


export function CunstomLogo({subtitle}: PropLogo){

    return(
        <Link to="/" className="flex item-center ">
            <span className="font-montserrat font-bold text-xl m-0 ">Testo |</span>
            <p className="text-muted-foreground m-0 px-2">{subtitle ?? "shop"}</p>
        </Link>
    );
};