import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from '../css/UpdateForm.module.css'
import mainImg from '../image/망상토끼.gif'

const UpdateForm = () => {
    const { userId } = useParams()
    console.log(userId)

    const [userDTO, setUserDTO]  = useState({
        name: '',
        id: '',
        pwd: ''
    })
    const { name, id, pwd } = userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')

    const [reset, setReset] = useState(false)

    useEffect(() => {
        //axios.get(`http://localhost:8080/user/getUser?id=${userId}`)
        axios.get(`/user/getUser?id=${userId}`)
            .then(res => setUserDTO(res.data))
            .catch(error => console.log(error))
    }, [reset])

    const navigate = useNavigate()

    const onInput = (e) => {
        const {name, value} = e.target

        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    // 등록
    const onUpdateSubmit = (e) => {
        e.preventDefault()

        // 입력값 유효성 검사
        var sw = 1
        if(!name) {
            setNameDiv('이름 입력')
            sw = 0
        }
        if(!pwd) {
            setPwdDiv('비밀번호 입력')
            sw = 0
        }

        // 첫 번째 방식
        /*
        if(sw === 1 && idDiv === '사용 가능') {
            axios.put(`http://localhost:8080/user/update`, null, {
                params: {       // params라는 객체값으로 아래의 3개의 데이터를 객체로 넘겨줌
                    name: name, // key와 value의 값이 같으면 name 하나만 사용 가능
                    id: id,
                    pwd: pwd
                }
            }).then(
                alert('회원정보가 수정되었습니다.'),
                navigate('/user/list')
            ).catch(error => console.log(error))
        }*/

        // 두 번째 방식
        
        if(sw === 1) {
            axios.put(`http://localhost:8080/user/update`, null, {
            //axios.put(`/user/update`, null, {
                params: userDTO  // 데이터를 쥐고 있는 DTO를 보내는 방식
            }).then(
                alert('회원정보가 수정되었습니다.'),
                navigate('/user/list')
            ).catch(error => console.log(error))
        }
    }

    // 삭제
    const onDeleteSubmit =(e) => {
        e.preventDefault() // 페이지 못넘어가게 막음

        axios.delete(`http://localhost:8080/user/delete?id=${userId}`)
        //axios.delete(`/user/delete?id=${userId}`)
            .then(
                alert('회원정보를 삭제했습니다.'),
                navigate('/user/list')
            ).catch(error => console.log(error))
        }

    // 취소
    const onReset = (e) => {
        e.preventDefault() // 페이지 못넘어가게 막음

        setReset(!reset)

        // 유효성 검사 초기화
        setNameDiv('')
        setPwdDiv('')
    }

    // 뒤로가기
    const goBack = () => {
        navigate(-1)
    }


    return (
        <div>
            <h3>
                <Link onClick={ goBack }>
                <img src={ mainImg } alt='망상토끼' width='50' height='50'/>
                </Link>
            </h3>
            <form className={ styles.userUpdateForm }>
                <table border="1" cellSpacing="0">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th width='120px'>이름 입력 : </th>
                            <td>
                                <input type="text" name="name" size="12" value={ name } onChange={ onInput }/>
                                <div id='nameDiv'>{ nameDiv }</div>
                            </td>
                        </tr>
                        <tr>
                            <th>아이디 입력 : </th>
                            <td>
                                <input type="text" name="id" size="12" value={ userId } readOnly />
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 입력 : </th>
                            <td>
                                <input type="password" name="pwd" size="12" value={ pwd } onChange={ onInput }/>
                                <div id='pwdDiv'>{ pwdDiv }</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <button type="button" onClick={ onUpdateSubmit }>수정</button> &nbsp;
                                <button type="button" onClick={ onDeleteSubmit }>삭제</button> &nbsp;
                                <button type="button" onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </form>
        </div>
    );
};

export default UpdateForm;