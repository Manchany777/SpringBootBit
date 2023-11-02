import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/List.module.css';
import mainImg from '../image/망상토끼.gif'

const List = () => {
    const [list, setList]  = useState([]) // DB에서 꺼내와야 하기때문에 빈배열

    //useEffect로 axios 통신해서 데이터를 끌고와서 결과를 setList한 후에, <div>에 data.map해서 화면에 뿌려준다.
    // 1. useEffect() - zxios - DB에서 가져온 결과를 setList에 담는다.
    // 2. list.map(_)으로 화면에 출력한다.
    useEffect(() => {
        axios.get('http://localhost:8080/user/getUserList')
            .then(res => {setList(res.data.content)
                console.log(res.data)})
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <h3>
                <Link to='/'>
                    <img src={ mainImg } alt='망상토끼' width='50' height='50'/>
                </Link>
            </h3>
            <table border='1'>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>비밀번호</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => { return(
                                    <tr key={ item.id }>
                                        <td align='center'>{ item.name }</td>
                                        <td align='center'>
                                            <Link className={ styles.subjectA } to={ `/user/updateForm/${item.id}` }>
                                                { item.id }
                                            </Link>
                                        </td>
                                        <td align='center'>{ item.pwd }</td>
                                    </tr>)
                                })
                            }
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
};

export default List;