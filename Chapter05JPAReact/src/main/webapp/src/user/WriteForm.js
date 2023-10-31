import React, { useState, useEffect } from 'react';
import styles from '../css/Writeform.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WriteForm = () => {
    const [userDTO, setUserDTO] = useState({
        name: '',
        id: '',
        pwd: ''
    })

    const navigate = useNavigate()

    const { id, name, pwd } = userDTO

    const onInput = (e) => {
        const {name, value} = e.target

        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    useEffect(() => {
        const sendData = async () => {
            const response = await axios.post(`https://localhost:8080/users/${id}`, userDTO);
            console.log('Data sent:', response.data);

            navigate('/user/listForm');
        };

        if (id && name && pwd) {
            sendData();
        }
    }, [id, name, pwd, userDTO, navigate])

    return (
        <div>
            <form className={ styles.writeForm }>
                <table border='1'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type='text' name="name" value={ name } onChange={ onInput } />
                                <div id='nameDiv'></div>
                            </td>
                        </tr>

                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type='text' name="id" value={ id } onChange={ onInput }  />
                                <div id='idDiv'></div>
                            </td>
                        </tr>

                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type='password' name="pwd" value={ pwd } onChange={ onInput }  />
                                <div id='pwdDiv'></div>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan='2' align='center'>
                                <button>등록</button>
                                <button>취소</button>
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