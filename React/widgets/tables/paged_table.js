import React from "react";
import MainPagination from "../pagination/main_pagination";
import MainTable from "./main_table";

function PagedTable({ columns = [], data = [], dataPerPage = 8, currentPage, total, count = 6, onChangePage = (page) => {} }){

    return(
        <div style={{ width: '100%' }}>
            <MainPagination currentPage={currentPage} dataPerPage={dataPerPage} total={total} count={count} onChangePage = { (page) => onChangePage(page)} />
            <MainTable columns={columns} data={data} />
            <MainPagination currentPage={currentPage}dataPerPage={dataPerPage}  total={total} count={count} onChangePage = { (page) => onChangePage(page)} />
        </div>
    );
}

export default PagedTable;

// IMPLEMENTATION EXAMPLE

/**
import React from "react";
import { useAcademicConceptPaged } from "../../../_hooks/useAcademicConceptPaged.hook";
import PagedTable from "../../../widgets/tables/paged_table";

function Table(){

    const COUNT = 10;
    const academicConceptPaged = useAcademicConceptPaged({ page: 0, limit: COUNT });
    const [ currentPage, setCurrentPage ] = React.useState(0);

    const columns = [
        {
            key: 'uuid',
            name: 'Código',
            label: true,
        },
        {
            key: 'name',
            name: 'Nombre',
            label: true,
        },
        {
            key: '',
            name: 'Acciones',
            label: false,
            render: (param) => {
                return(
                    <div className="flex-row">
                        <button>
                            {param.cod}
                        </button>
                    </div>
                );
            }
        },
    ];

    const changePage = (page) => {
        setCurrentPage(page);
        academicConceptPaged.loadData(page, COUNT);
    }

    return(
        <PagedTable
            columns={columns}
            data={academicConceptPaged.data[0]}
            total={academicConceptPaged.data[1]}
            dataPerPage={COUNT}
            currentPage={currentPage}
            onChangePage={(page) => changePage(page)}
        />
    );
}

export default Table;
 */