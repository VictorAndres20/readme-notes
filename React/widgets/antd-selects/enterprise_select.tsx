import { useFindAllEnterprises } from "../../_hooks/enterprise/useFindAllEnterprises.hook";
import SearchSelect from "./search_select";

export default function EnterpriseSelect({ value, onChange }: { value: number, onChange: ((value: number | undefined) => void) }) {

    const dataHook = useFindAllEnterprises();

    return(
        <SearchSelect 
            options={ dataHook.data.map( e => ({ value: e.id, label: `${e.name}` }) ) }
            placeholder="Empresa"
            value={ value }
            onChange={(id) => {
                if(typeof id === 'string') onChange(Number(id));
                else onChange(id);
            }}
        />
    );
}