import React from "react";
import { Pagination } from "react-bootstrap";

function MainPagination({currentPage, dataPerPage = 8, total, count = 6, onChangePage = (page) => {} }){

    const getTotalPages = () => {
        return Math.ceil(total / dataPerPage);
    }

    return(
        <Pagination size="sm">
            <Pagination.Prev onClick={() => onChangePage(currentPage - 1)} linkStyle={{ color: 'green', cursor: 'pointer' }} disabled={currentPage <= 0} />
            {
                Array.from({ length: getTotalPages() < count ? getTotalPages() : count }).map((_, index) => {
                    let addition = currentPage - count < 0 ? 1 : currentPage - count;
                    let value = index + addition;
                    return(
                        <Pagination.Item onClick={() => onChangePage(value - 1)} key={index} linkStyle={ currentPage === value - 1 ? { color: 'white', backgroundColor: 'green', cursor: 'pointer' } : { color: 'green', cursor: 'pointer' }}>{value}</Pagination.Item>
                    );
                })
            }
            <Pagination.Next onClick={() => onChangePage(currentPage + 1)} linkStyle={{ color: 'green', cursor: 'pointer' }} disabled={currentPage >= getTotalPages() - 1 }/>
            
        </Pagination>
    );

}

export default MainPagination;