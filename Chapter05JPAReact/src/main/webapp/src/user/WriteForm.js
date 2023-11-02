import React, { useState } from 'react';
import styles from '../css/Writeform.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import mainImg from '../image/망상토끼.gif'

const WriteForm = () => {
    const [userDTO, setUserDTO] = useState({
        name: '',
        id: '',
        pwd: ''
    })

    const navigate = useNavigate()

    const { id, name, pwd } = userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [idDiv, setIdDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')

    const onInput = (e) => {
        const {name, value} = e.target

        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    // 아이디 중복체크
    const onIsExistId = () => {
        axios.get(`http://localhost:8080/user/isExistId?id=${id}`) // 요청
            .then(res => {
                setIdDiv(res.data === 'non_exist' ? '사용 가능' : '사용 불가능')
            })   // 성공
            .catch(error => console.log(error))  // 실패
    }

    // 등록
    const onWriteSubmit = (e) => {
        e.preventDefault()

        // 입력값 유효성 검사
        var sw = 1
        if(!name) {
            setNameDiv('이름 입력')
            sw = 0
        }
        if(!id) {
            setIdDiv('아이디 입력')
            sw = 0
        }
        if(!pwd) {
            setPwdDiv('비밀번호 입력')
            sw = 0
        }

        // 첫 번째 방식
        /*
        if(sw === 1 && idDiv === '사용 가능') {
            axios.post('http://localhost:8080/user/write', null, {
                params: {       // params라는 객체값으로 아래의 3개의 데이터를 객체로 넘겨줌
                    name: name, // key와 value의 값이 같으면 name 하나만 사용 가능
                    id: id,
                    pwd: pwd
                }
            }).then(
                alert('회원가입을 축하드립니다.'),
                navigate('/user/list')
            ).catch(error => console.log(error))
        }*/

        // 두 번째 방식
        
        if(sw === 1 && idDiv === '사용 가능') {
            axios.post('http://localhost:8080/user/write', null, {
                params: userDTO  // 데이터를 쥐고 있는 DTO를 보내는 방식
            }).then(
                alert('회원가입을 축하드립니다.'),
                navigate('/user/list')
            ).catch(error => console.log(error))
        }
    }
    
    
    // 취소
    const onReset = (e) => {
        e.preventDefault() // 페이지 못넘어가게 막음

        // input창 초기화
        setUserDTO({
            name: '',
            id: '',
            pwd: ''
        })

        // 유효성 검사 초기화
        setNameDiv('')
        setIdDiv('')
        setPwdDiv('')
    }

    // 뒤로가기
    const goBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <h3>
                {/* 참조변수 방식 & Link로 연결 - src폴더 */}
                <Link to='/'>
                <img src={ mainImg } alt='망상토끼' width='50' height='50'/>
                </Link>
                {/* public 폴더 & useNavigate로 연결 */}
                <img src='/image/망상토끼.gif' alt='망상토끼' onClick={ goBack } width='50' height='50'/>
            </h3>
            <form className={ styles.writeForm }>
                <table border='1'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type='text' name="name" value={ name } onChange={ onInput } onBlur={ onIsExistId }/>
                                <div id='nameDiv'>{ nameDiv }</div>
                            </td>
                        </tr>

                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type='text' name="id" value={ id } onChange={ onInput }  />
                                <div id='idDiv' style={{ color: idDiv === '사용 가능' ? 'blue' : 'red' }}>{ idDiv }</div>
                            </td>
                        </tr>

                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type='password' name="pwd" value={ pwd } onChange={ onInput }  />
                                <div id='pwdDiv'>{ pwdDiv }</div>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2' align='center'>
                                <button onClick={ onWriteSubmit }>등록</button>
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </form>
        </div>
    );
};

export default WriteForm;