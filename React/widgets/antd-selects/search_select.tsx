import { Select } from "antd";

export default function SearchSelect({ placeholder, options, value, onChange }: { placeholder?: string, options: { value: string | number | undefined, label: string }[], value: number | string | undefined, onChange: ((value: any) => void) }) {

    const findValue = (valueId: number | string | undefined) => {
        return options.find( op => op.value === valueId );
    }

    return(
        <Select 
            showSearch
            style={{ width: '100%' }}
            placeholder={placeholder}
            optionFilterProp="children"
            filterOption={(input, option) => (String(option?.label) ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
                (String(optionA?.label) ?? '').toLowerCase().localeCompare(String(optionB?.label ?? '').toLowerCase())
            }
            options={options}
            value={ findValue(value) }
            onChange={(value) => {
                onChange(value);
            }}
        />
    );
}