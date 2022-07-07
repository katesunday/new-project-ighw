import Button from '@mui/material/Button/Button';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import TextField from '@mui/material/TextField';
import React , {ChangeEvent , useCallback , useEffect , useState} from 'react';
import SuperDoubleRange from '../../common/c8-SuperDoubleRange/SuperDoubleRange';
import SearchIcon from '@mui/icons-material/Search';
import {Pack , searchMinMax} from '../../reducers/packListsReducer';
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import s from './ProfilePacks.module.css';
import {PacksList} from '../PacksList/PacksList';
import { useNavigate } from 'react-router-dom';
import Paper from "@mui/material/Paper";

export const ProfilePacks = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const avatar = useAppSelector(state => state.profile.avatar)
    const editPackId = useAppSelector(state => state.packsList.editPackId)
    const min = useAppSelector(state => state.packsList.minMax[0])
    const max = useAppSelector(state => state.packsList.minMax[1])
    const currentPack = useAppSelector(state => {
        if (state.packsList.packs && state.packsList.showPackId || state.packsList.editPackId) {
            const pack = state.packsList.packs.find(item => item.user_id === state.packsList.showPackId || state.packsList.editPackId)
            if (pack) return pack
        } else return {} as Pack
    })

    const onMouseUp = useCallback((values: [number , number]) => {
        dispatch(searchMinMax(values))
    } , [dispatch , searchMinMax])

    const useDebounce = (value: string , delay: number) => {
        const [debouncedValue , setDebouncedValue] = useState(value);
        useEffect(() => {

                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                } , delay);
                return () => {
                    clearTimeout(handler);
                };
            } ,
            [value , delay]
        );
        return debouncedValue;
    }

    const [searchTerm , setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm , 1000);

    const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value)
    } , [setSearchTerm])

    const toMainPage = useCallback(() => {
        let path = `/mainPage`;
        navigate(path,{ replace: true });
    }, [navigate])

    const toEdit = useCallback(() => {
        let path = `/profile`;
        navigate(path,{ replace: true });
    }, [navigate])

    return (
        <Paper className={s.MainPage}>
            <div className={s.sideBar}>
                <div className={s.avatar}>
                    {currentPack && currentPack.avatar ?
                        <img className={s.avatarImg} src={currentPack.avatar} alt={'avatar'}/> :
                        <img className={s.avatarImg} src={avatar} alt={'avatar'}/>}
                </div>
                <div className={s.profileDiv}>
                    {currentPack && currentPack.user_name}
                    {currentPack && currentPack.user_id === editPackId ?
                        <Button className={s.editBtn}
                                variant="contained"
                                onClick={toEdit}
                                color="primary">
                            Edit profile
                        </Button> : undefined}
                    <Button className={s.editBtn}
                        onClick={toMainPage}
                        type={'submit'}
                        variant="contained"
                        sx={{mt: 3 , mb: 2}}>
                        Go back
                    </Button>
                </div>
                <hr/>
                <div className={s.doubleRange}>
                    <span>Sort by number of questions</span>
                    <SuperDoubleRange value={[min , max]}
                                      onMouseUp={onMouseUp}

                    />
                    <span>{min} - </span> <span>{max}</span>
                </div>
            </div>

            <div className={s.packList}>
                <div className={s.packListHeader}>Pack List of {currentPack && currentPack.user_name}</div>
                <div className={s.searchAndAdd}>
                    <TextField style={{width: '70%'}}
                               fullWidth
                               label="Search..."
                               value={searchTerm}
                               onChange={searchHandler}
                               InputProps={{
                                   endAdornment: <InputAdornment position="start">
                                       <SearchIcon/>
                                   </InputAdornment>
                               }}
                    />
                    {/*<UniversalSearch paramName = {'PackName'} dispatchCallBack = {getPacks}/>*/}
                </div>
                <div className={s.allPacks}>
                    <PacksList debouncedSearchTerm={debouncedSearchTerm}
                               min={min}
                               max={max}
                               idForProfile={currentPack && currentPack.user_id}/>
                </div>
            </div>
        </Paper>
    );
};