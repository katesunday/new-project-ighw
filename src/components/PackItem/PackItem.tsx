import React , {useCallback , useState} from 'react';
import TableCell from '@mui/material/TableCell';
import s from '../PacksList/PacksList.module.css';
import AppModal from '../AppModal/AppModal';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import {
    editPack ,
    learnPack ,
    Pack ,
    removePack ,
    setTypeOfPacks ,
    showPack ,
    updatePack
} from '../../reducers/packListsReducer';
import {useAppDispatch , useAppSelector} from '../../utils/hooks';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from "@mui/material/IconButton";

type PackItemPropsType = {
    pack: Pack
}

export const PackItem: React.FC<PackItemPropsType> = React.memo(({pack}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userId = useAppSelector(state => state.profile._id)

    const [packName , setPackName] = useState(pack.name)

    const deleteHandler = useCallback((id: string) => {
        dispatch(removePack(id))
    } , [dispatch])

    const editHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(editPack(id))
    } , [dispatch , navigate])

    const learnHandler = useCallback((id: string) => {
        dispatch(learnPack(id))
        navigate(`/train` , {replace: true});
    } , [dispatch , navigate])

    const showHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(showPack(id))
    } , [dispatch , navigate])

    const updatePackHandler = useCallback(() => {
        dispatch(updatePack(pack._id , packName))
    } , [dispatch , packName])

    const toProfilePacksHandler = useCallback((packUserId: string) => {
        if (userId === packUserId) {
            dispatch(editPack(packUserId))
            dispatch(setTypeOfPacks('my'))
            navigate('/profilePacks')
        } else {
            dispatch(showPack(packUserId))
            dispatch(setTypeOfPacks('some'))
            navigate('/profilePacks')
        }
    } , [dispatch , navigate , userId])

    return (
        <TableRow key={pack._id}>
            <TableCell className={s.cursor} onClick={() => {
                userId === pack.user_id ? editHandler(pack._id) : showHandler(pack._id)
            }} component="th" scope="row">
                {pack.name}
            </TableCell>
            <TableCell style={{width: 100}} align="center">
                {pack.cardsCount}
            </TableCell>
            <TableCell style={{width: 100}} align="right">
                {pack.updated.split('T')[0].replace(/-/gi , '.').split('.').reverse().join('.')}
            </TableCell>
            <TableCell className={s.cursor} style={{width: 100}} align="right"
                       onClick={() => toProfilePacksHandler(pack.user_id)}>
                {pack.user_name}
            </TableCell>
            <TableCell align="left"  sx = {{display:'flex',justifyContent:'end', marginRight:1.5}}>
                {userId === pack.user_id ?
                    <AppModal title={'delete'}
                              description={'Do yo really want to remove this pack?'}
                              children={
                                  <Button
                                      key={'1'}
                                      onClick={() => deleteHandler(pack._id)}
                                      style={{borderRadius: '30px'}}
                                      sx={{mt: 3 , mb: 2}}
                                      variant={'contained'}
                                      color={'error'}
                                      size={"small"}
                                  >Delete</Button>
                              }/> : undefined}
                {userId === pack.user_id ?
                    <AppModal title={'Edit'}
                              description={'Rename this pack'}
                              children={[
                                  <TextField
                                      key={'2'}
                                      color={'secondary'}
                                      margin="normal"
                                      id="question"
                                      label="New question name"
                                      autoFocus
                                      helperText="Enter question name"
                                      value={packName}
                                      onChange={(e) => setPackName(e.currentTarget.value)}
                                  /> ,
                                  <Button
                                      key={'1'}
                                      onClick={updatePackHandler}
                                      variant={'contained'}
                                      color={'secondary'}
                                      style={{borderRadius: '30px'}}
                                      size={'small'}
                                      sx={{mt: 3 , mb: 2}}
                                  >Rename Pack</Button>
                              ]}/> : undefined}
                <IconButton disabled={pack.cardsCount === 0}
                            className={s.btnsLern}
                            sx={{mt: 0.7, mb: 0.3,display:'block', width:0,
                                "&:hover:after":
                                    { content:`"LEARN"`,
                                        fontSize:'11px',
                                        position:'absolute',
                                        bottom:'25px'}
                            }}
                            onClick={() => learnHandler(pack._id)}>
                    <SchoolIcon
                        color={pack.cardsCount === 0 ? 'disabled' : 'secondary'}/>
                </IconButton>

            </TableCell>
        </TableRow>
    );
})

