import Slider from '@mui/material/Slider'
import React from 'react'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: number[]) => void
    value: [number , number]
    onChangeBoth: (values: number[]) => void
    onMouseLeave:(values:number[])=>void
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange , value , onChangeBoth, onMouseLeave
        // min, max, step, disable, ...
    }
) => {
    // сделать самому, можно подключать библиотеки

    return (
        <div style={{width: '85%' , marginLeft: '10px'}}>
            <Slider onMouseLeave = {()=>onMouseLeave(value)}
                    onChange={(e , v) => {
                onChangeRange && onChangeRange(v as unknown as number[])
                onChangeBoth(v as unknown as number[])}}
                    value={value}
                    valueLabelDisplay="auto"
                    //disabled={value[1] <= value[0]}

            />
        </div>
    )
}

export default SuperDoubleRange
