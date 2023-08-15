import React from "react";
import Select from 'react-select';

export default function ObjectMlutiSelect({ value, options=undefined, onChange=(e) => {}, placement = "bottom" }){

    const buildValues = (v) => {
        let valArray = [];
        if(v){
            v.split(',').forEach(element => {
                let vTmp = options.find(d => d.value === element);
                if(vTmp){
                    valArray.push(vTmp);
                }
            });
        }        
        return valArray;
    }

    return(
        <Select
            onChange={(e) => onChange(e)}
            styles={{
                singleValue: (styles) => ({ ...styles, color:'#000' }),
                input: (styles) => ({ ...styles, color: '#000' }), 
                control: (styles) => ({ ...styles, backgroundColor: 'rgba(238, 238, 238, 0.5)', color: '#000', fontSize: '0.8125em', margin: '10px 0', border: '2px solid #b5e800', borderRadius: '20px', minHeight: '33px', width: '100%', padding: '0px 15px', cursor: 'pointer', boxShadow: 'none', ":hover": { ...styles[":hover"], border: '2px solid #b5e800' } }),
                option: (styles) => ({ ...styles, backgroundColor: '#929292', color: '#000', fontSize: '0.8125em', fontWeight: 'bold', ":hover": { ...styles[":hover"], cursor: 'pointer' } }),
                menu: (styles) => ({ ...styles, backgroundColor: '#929292', borderRight: '2px solid #b5e800', borderLeft: '2px solid #b5e800', borderBottom: '2px solid #b5e800', marginTop: '0px', maxHeight: '250px' }), 
                
            }}
            isMulti
            options={options}
            value={options !== undefined ? buildValues(value) : []}
            defaultValue={options !== undefined ? buildValues(value) : []}
            menuPlacement={ placement }
        />
    );
}