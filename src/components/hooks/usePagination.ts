import { useCallback } from "react";
import { useSearchParams } from "react-router";

export const usePagination = () => {

    const [searchParam, setSearchParam] = useSearchParams();
    const current = Number(searchParam.get("page")) || 1;

  

    const handleChangePage = useCallback((currentPage: number) => {
        const params = Object.fromEntries(searchParam.entries());

        params.page = currentPage.toString();
        setSearchParam(params);
    }, [searchParam, setSearchParam]);

    const handleUpdate = useCallback((page: number) => {
        handleChangePage(page);
    },[handleChangePage]);


    const handleNext = useCallback(() => {
        handleChangePage(current + 1);
    }, [current, handleChangePage]);

    const handlePrevious = useCallback(() => {
        handleChangePage(current - 1);
    }, [current, handleChangePage]);


    return{
        current,
        handleNext,
        handlePrevious,
        handleUpdate

    };

};