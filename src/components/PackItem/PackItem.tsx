import React, {ChangeEvent, useCallback, useState} from 'react';
import TableCell from '@mui/material/TableCell';
import s from '../PacksList/PacksList.module.css';
import AppModal from '../AppModal/AppModal';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import {
    editPack,
    learnPack,
    Pack,
    removePack,
    setTypeOfPacks,
    showPack,
    updatePack
} from '../../reducers/packListsReducer';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {useNavigate} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import SchoolIcon from '@mui/icons-material/School';
import IconButton from '@mui/material/IconButton';
import noCover from '../../assets/images/nocover.jpeg'
import styles from '../Profile/Profile.module.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import nocover from '../../assets/images/nocover.jpeg';
import {convertFileToBase64} from '../../utils/convertFileToBase64';
import {setAppError} from '../../reducers/appReducer';
import {uploadPhoto} from '../../reducers/profileReducers';

type PackItemPropsType = {
    pack: Pack
}

export const PackItem: React.FC<PackItemPropsType> = React.memo(({pack}) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userId = useAppSelector(state => state.profile._id)

    const [isAvaBroken, setIsAvaBroken] = useState(false)
    const [packName, setPackName] = useState(pack.name)
    const [deckCover, setDeckCover] = useState(pack.deckCover)

    const uploadDeckCoverHandler = useCallback((e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length){
            const file = e.target.files[0]
            if(file.size < 1000000){
                convertFileToBase64(file,(file64:string)=>{
                    setDeckCover(file64)
                })
            }
            else {
                dispatch(setAppError('Photo should be less than 1MB'))
            }
        }
    }, [dispatch, convertFileToBase64, uploadPhoto])

    const deleteHandler = useCallback((id: string) => {
        dispatch(removePack(id))
    }, [dispatch])

    const editHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(editPack(id))
    }, [dispatch, navigate])

    const learnHandler = useCallback((id: string) => {
        dispatch(learnPack(id))
        navigate(`/train`, {replace: true});
    }, [dispatch, navigate])

    const showHandler = useCallback((id: string) => {
        navigate('/mainPage/cards')
        dispatch(showPack(id))
    }, [dispatch, navigate])

    const updatePackHandler = useCallback(() => {
        deckCover && dispatch(updatePack(pack._id, packName, deckCover))
    }, [dispatch, packName, deckCover])

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
    }, [dispatch, navigate, userId])

    const errorHandler = () => {
        setIsAvaBroken(true)
    }

    return (
        <TableRow key={pack._id}>
            <TableCell style={{width: 100}} align="center">
                <img src={!isAvaBroken && !!pack.deckCover ? pack.deckCover : noCover} alt=""
                     style={{width: '100px', height: '60px'}}
                     onError={errorHandler}
                />
            </TableCell>
            <TableCell className={s.cursor} onClick={() => {
                userId === pack.user_id ? editHandler(pack._id) : showHandler(pack._id)
            }} component="th" scope="row">
                {pack.name}
            </TableCell>
            <TableCell style={{width: 100}} align="center">
                {pack.cardsCount}
            </TableCell>
            <TableCell style={{width: 100}} align="right">
                {pack.updated.split('T')[0].replace(/-/gi, '.').split('.').reverse().join('.')}
            </TableCell>
            <TableCell className={s.cursor} style={{width: 100}} align="right"
                       onClick={() => toProfilePacksHandler(pack.user_id)}>
                {pack.user_name}
            </TableCell>
            <TableCell align="left"
                       sx={{display: 'flex', justifyContent: 'center', height: '65px', marginBottom: '-1px'}}>
                {userId === pack.user_id ?
                    <AppModal title={'delete'}
                              description={'Do yo really want to remove this pack?'}
                              children={
                                  [
                                      <img className={styles.imageBlock} src={pack.deckCover} alt={'avatar'}/>,
                                      <Button
                                          key={'1'}
                                          onClick={() => deleteHandler(pack._id)}
                                          style={{borderRadius: '30px'}}
                                          sx={{mt: 3, mb: 2}}
                                          variant={'contained'}
                                          color={'error'}
                                          size={'small'}
                                      >Delete</Button>
                                  ]
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
                                  />,
                                  <div className={styles.image}>
                                      <img className={styles.imageBlock} src={deckCover} alt={'avatar'}/>
                                      <label className={styles.uploadPhoto}>
                                          <input type="file"
                                                 accept={'image'}
                                                 onChange={uploadDeckCoverHandler}
                                                 style={{display: 'none'}}
                                          />
                                          <IconButton component="span">
                                              <AddAPhotoIcon/>
                                          </IconButton>
                                      </label>
                                  </div>,
                                  <Button
                                      key={'1'}
                                      onClick={updatePackHandler}
                                      variant={'contained'}
                                      color={'secondary'}
                                      style={{borderRadius: '30px'}}
                                      size={'small'}
                                      sx={{mt: 3, mb: 2}}
                                  >Edit Pack</Button>
                              ]}/> : undefined}
                <IconButton disabled={pack.cardsCount === 0}
                            className={s.btnsLern}
                            sx={{
                                mt: 0.7, mb: 0.2, display: 'block', width: 0,
                                '&:hover:after':
                                    {
                                        content: `"LEARN"`,
                                        fontSize: '11px',
                                        position: 'absolute',
                                        bottom: '25px',
                                        left: '-2px'
                                    }
                            }}
                            onClick={() => learnHandler(pack._id)}>
                    <SchoolIcon
                        color={pack.cardsCount === 0 ? 'disabled' : 'secondary'}/>
                </IconButton>

            </TableCell>
        </TableRow>
    );
})

