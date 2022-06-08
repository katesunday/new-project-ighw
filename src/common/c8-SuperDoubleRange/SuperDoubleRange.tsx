import { Slider } from 'material-ui'
import React from 'react'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: number[]) => void
    value: [number , number]
    onChangeBoth: (values: number[]) => void
    // min, max, step, disable, ...
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange , value , onChangeBoth
        // min, max, step, disable, ...
    }
) => {
    // сделать самому, можно подключать библиотеки

    return (
        <div style={{width: '200px' , marginLeft: '20px'}}>
            <Slider onChange={(e , v) => {
                onChangeRange && onChangeRange(v as unknown as number[])
                onChangeBoth(v as unknown as number[])}}
                // @ts-ignore
                    value={value}
                    valueLabelDisplay="auto"
                    disabled={value[1] <= value[0]}
            />
        </div>
    )
}

export default SuperDoubleRange
