import React , {ChangeEvent , useState} from 'react';
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import s from '../../common/SuperComponents.module.css'


const TestComponents = () => {
    //testing for input
    const [text , setText] = useState<string>('')
    const error = text ? '' : 'error'
    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }

    //for checkBox
    const [checked , setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    // for EditableSpan
    const [value , setValue] = useState<string>('')

    //for Select
    const arr = ['x' , 'y' , 'z']
    const [selectValue , onChangeOption] = useState<string>(arr[1])

    return (
        <div>
            <h4>Testing</h4>
            <SuperInputText
                value={text}
                onChangeText={setText}
                onEnter={showAlert}
                error={error}
                spanClassName={s.testSpanError}
                className={s.blue}/>
            <SuperButton>test</SuperButton>
            <SuperButton
                red
                onClick={showAlert}>
                delete
            </SuperButton>
            <SuperButton disabled>
                disabled
            </SuperButton>
            <hr/>
            <SuperCheckbox
                checked={checked}
                onChangeChecked={setChecked}>
                some text
            </SuperCheckbox>
            <SuperCheckbox checked={checked} onChange={testOnChange}/>
            <hr/>
            <SuperEditableSpan
                value={value}
                onChangeText={setValue}
                spanProps={{children: value ? undefined : ' click here to enter text...'}}
            />
            <hr/>
            <SuperSelect
                options={arr}
                value={selectValue}
                onChangeOption={onChangeOption}
            />
            <hr/>
            <SuperRadio
                name={'radio'}
                options={arr}
                value={selectValue}
                onChangeOption={onChangeOption}
            />
        </div>
    );
};

export default TestComponents;