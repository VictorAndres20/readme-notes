import { Table } from 'antd';

export const BasicDatatable = ({ columns, data, pagination }) => {    

    return <Table columns={columns} dataSource={data} pagination={pagination} />
}