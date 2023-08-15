import React from "react";
import { Table } from "react-bootstrap";

/**
 * 
 * {
 *      key: object param_name, if you put empty specify param name and not use key,
 *      name: String of column name,
 *      label: boolean, if true, key need to be specified,
 *      render: default (param) => (<>something {param.param_name}</>),
 * }
 * 
 */

function MainTable({ columns = [], data = [] }){

    return(
        <Table responsive>
            <thead>
                <tr>
                    {
                        columns.map((col, key) => (
                            <th key={key} style={{ fontSize: '0.80em' }}>{col.name}</th>
                        ))
                    }                
                </tr>
            </thead>
            <tbody>
                {
                    data.length === 0 ?
                    <tr>
                    <td colSpan={columns.length}><div className="flex-col flex-center">Empty data</div></td>
                    </tr>
                    :
                    data.map((param, key) => (
                        <tr key={`tr_${key}`}>
                            {
                                columns.map((col, key) => (
                                    <td key={`td_${key}`} style={{ fontSize: '0.80em' }}>
                                        {
                                            col.label ?
                                                param[`${col.key}`]
                                            :
                                            col.render ? 
                                                col.render(param)
                                            :
                                                <></>
                                        }
                                    </td>                                    
                                ))
                            }
                        </tr>
                    ))
                }                  
            </tbody>
        </Table>
    );
}

export default MainTable;