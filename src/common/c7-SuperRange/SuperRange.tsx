import { Slider } from 'material-ui';
import React , { DetailedHTMLProps , InputHTMLAttributes} from 'react'
import s from './SuperRange.module.css'


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement> , HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeRange?: (value: number) => void
    setValue: (value: number) => void
};

const SuperRange: React.FC<SuperRangePropsType> = (
    {
        type , // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange , onChangeRange ,
        className ,
        setValue ,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {

    const onChangeCallback = (e: MouseEvent , v: number | number[]) => {

        onChangeRange && onChangeRange(v as number)
        setValue(v as number)

    }

    const finalRangeClassName = `${s.range} ${className ? className : ''}`


    return (
        <>
            <div style={{width: '200px' , marginLeft: '20px'}}>
                <Slider onChange={(e , v) =>
                    // @ts-ignore
                        onChangeCallback(e , v)} defaultValue={50}
                        aria-label="Default"
                        //valueLabelDisplay="auto"
                        value={Number(restProps.value)}
                />
            </div>

            {/*<input*/}
            {/*    type={'range'}*/}
            {/*    onChange={onChangeCallback}*/}
            {/*    className={finalRangeClassName}*/}
            {/*    value={restProps.value}*/}

            {/*    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)*/}
            {/*/>*/}
        </>
    )
}

export default SuperRange
