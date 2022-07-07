import Slider from '@mui/material/Slider'
import React, {useState} from 'react'


type SuperDoubleRangePropsType = {
    onChangeRange?: (value: [number, number]) => void
    value: [number, number]
    onMouseUp: (values: [number, number]) => void
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({onChangeRange, value, onMouseUp}) => {
    const [borders, setBorders] = useState<[number, number]>(value)
    return (
        <div style={{width: '90%', marginLeft: '10px'}}>
            <Slider onMouseUp={() => onMouseUp(borders)}
                    onChange={(e, v) => {
                        onChangeRange && onChangeRange(v as unknown as [number, number])
                        setBorders(v as unknown as [number, number])
                    }}
                    value={borders}
                    valueLabelDisplay="auto"
                //disabled={value[1] <= value[0]}
            />
        </div>
    )
}

export default SuperDoubleRange
