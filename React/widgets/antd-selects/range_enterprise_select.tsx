import { useFindAllRangeByEnterprise } from "../../_hooks/range/useFindAllRangeByEnterprise.hook";
import { getCompany } from "../../_utils/storage_handler";
import SearchSelect from "./search_select";

export default function RangeEnterpriseSelect({ value, onChange }: { value: string, onChange: ((value: string | undefined) => void) }) {

    const dataHook = useFindAllRangeByEnterprise(getCompany());

    return(
        <SearchSelect 
            options={ dataHook.data.map( e => ({ value: e.uuid, label: `${e.id}` }) ) }
            placeholder="Rango"
            value={ value }
            onChange={(id) => {
                onChange(id);
            }}
        />
    );
}