import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from '../css/List.module.css';
import mainImg from '../image/망상토끼.gif'

const List = () => {
    const { currentPage } = useParams()
    console.log('page : ' + currentPage)

    const [list, setList]  = useState([]) // DB에서 꺼내와야 하기때문에 빈배열
    const [pagingArray, setPagingArray] = useState([])

    const [columnName, setColumnName] = useState('name') // form태그로 보낼 데이터 기본값을 option value='name'으로 하겠다.
    const [keyword, setKeyword]  = useState('')
    const [searchList, isSearchList] = useState(false)

    const navigate = useNavigate()
    
    //useEffect로 axios 통신해서 데이터를 끌고와서 결과를 setList한 후에, <div>에 data.map해서 화면에 뿌려준다.
    // 1. useEffect() - zxios - DB에서 가져온 결과를 setList에 담는다.
    // 2. list.map(_)으로 화면에 출력한다.
    useEffect(() => {
            keyword === '' ?

            //axios.get(`http://localhost:8080/user/getUserList?page=${currentPage}`)
            axios.get(`/user/getUserList?page=${currentPage}`)
                .then(res => {
                    setList(res.data.content)
                    setPagingArray(Array.from({ length: res.data.totalPages }, (_, index) => index + 1))
                    console.log(res.data)
                    console.log(currentPage)
                })
                .catch(error => console.log(error))
                // 현재값을 만들어내는데(from), 객체를 만들어주고 ()함수를 잡는다. (_는 item 대신 쓴 것(의미가 없기에))
                // totalPages의 길이만큼 ()안의 함수를 배열로 돌리는데, ()안의 함수를 돌릴때마다 +1씩 증가시킨다. 
                //(spring boot에서는 index가 0부터 시작하기에)

            :
            
            axios.get(`/user/getUserSearchList?page=${currentPage}`, {
                params: {
                    columnName: columnName, 
                    keyword: keyword
                }
            })
            .then(res => {
                setList(res.data.content)
                setPagingArray(Array.from({ length: res.data.totalPages }, (_, index) => index + 1))
                console.log(res.data)
                console.log(currentPage)
            })
            .catch(error => console.log(error))
            
    }, [currentPage, searchList])

    const onSearchList = (e) => {
        e.preventDefault()

        isSearchList(!searchList)
        navigate('/user/list/0')

        /*
        axios.get(`/user/getUserSearchList?page=${currentPage}`, {
                params: {
                    columnName: columnName, 
                    keyword: keyword
                }
            })
             .then(res => {
                setList(res.data.content)
                setPagingArray(Array.from({ length: res.data.totalPages }, (_, index) => index + 1))
                console.log(res.data)
                console.log(currentPage)
            })
             .catch(error => console.log(error))*/
    }

    return (
        <div>
            <h3>
                <Link to='/'>
                    <img src={ mainImg } alt='망상토끼' width='50' height='50'/>
                </Link>
            </h3>
            <table border='1' style={{ width: '650px', textAlign: 'center' }}>
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

            {/* 페이징 처리 */}
            <p style={{ width: '650px', textAlign: 'center' }}>
                {
                    pagingArray.map(item => <span key={ item }>
                        {/* page는 useParams()으로 받은 객체라서 parseInt()사용 */}
                        <Link id={ (item-1) === parseInt(currentPage) ? styles.currentPaging : styles.paging}
                        to={ `/user/list/${item-1}` }>{ item }</Link>
                    </span>)
                }
            </p>
            
            {/* 검색 */}
            <div style={{ width: '600px', textAlign: 'center', margin: '20px' }}>
	            <form id="searchListForm">
                    <select name="columnName" onChange={ e => setColumnName(e.target.value) } style={{ width:'100px', margin: '5px' }}>
                        <option value="name">이름</option>
                        <option value="id">아이디</option>
                    </select>
                    <input type="text" name='keyword' value={ keyword } onChange={ e => setKeyword(e.target.value)}/> &nbsp;
                    <button onClick={ onSearchList }>검색</button>
                </form>
            </div>
        </div>
    );
};

export default List;