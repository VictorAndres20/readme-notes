## Use widgets
```
//Import from this folder
import { BasicDatatable } from "../../../widgets/antd_table/basic_datatable";
//Import from this folder for filter
import { useBasicTableSearchBox } from "../../../widgets/antd_table/useBasicTableSearchBox.hook";

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

export default function Table({ hook }){

    const searchBox = useBasicTableSearchBox();
    
    const columns = [
        {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...searchBox.getColumnSearchProps('name'),
        },
        {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...searchBox.getColumnSearchProps('age'),
        },
        {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ...searchBox.getColumnSearchProps('address'),
        },
    ];
    return <BasicDatatable columns={columns} data={data} pagination={true} />;
}
```