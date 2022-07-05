import Slider from '@mui/material/Slider'
import React from 'react'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value: [number , number]
    onChangeBoth: (values: [number, number]) => void
    onMouseUp:(values: [number, number])=>void
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange , value , onChangeBoth, onMouseUp
        // min, max, step, disable, ...
    }
) => {
    // сделать самому, можно подключать библиотеки

    return (
        <div style={{width: '85%' , marginLeft: '10px'}}>
            <Slider onMouseUp = {() => onMouseUp(value)}
                    onChange={(e , v) => {
                onChangeRange && onChangeRange(v as unknown as [number, number])
                onChangeBoth(v as unknown as [number, number])}}
                    value={value}
                    valueLabelDisplay="auto"
                    //disabled={value[1] <= value[0]}

            />
        </div>
    )
}

export default SuperDoubleRange
