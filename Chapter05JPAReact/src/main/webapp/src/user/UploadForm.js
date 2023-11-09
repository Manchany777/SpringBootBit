import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from '../css/UploadForm.module.css';
import mainImg from '../image/망상토끼.gif';
import axios from 'axios';
//import cameraImg from '../image/camera.png';



const UploadForm = () => {
    const imgRef = useRef() // 초점 맞추기

    const [userUploadDTO, setUserUploadDTO] = useState({
        imageName: '',
        imageContent: '',
        imageFileName: '',
        imageOriginalName: ''
    })

    const {imageName, imageContent, imageFileName, imageOriginalName} = userUploadDTO

    const [imageList,setImageList]  = useState([]) // 이미지 미리보기 용도
    const [files,setFiles]  = useState('') // 이미지 서버로 전송
    //const [showImgSrc,setShowImgSrc]  = useState([])

    const navigate = useNavigate()

    // const readURL = (input) => {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(input.files[0])

    //     reader.onload = () => {
    //         console.log(input.files[0])
    //         setShowImgSrc(reader.result)
    //         setFile(input.files[0])
    //     }
    // }

    const onCamera = () => { // 이미지 클릭시 파일 선택 버튼과 같은 역할을 하도록 함
        imgRef.current.click() // 현재 포커스가 맞춰져 있는 곳에 click 이벤트가 발생하게 됨(trigger와 같은 기능)
    }

    const onImgInput = (e) => {
        const imgFiles = Array.from(e.target.files)
        var imgArray = [] // 임시변수 (카메라 버튼 누를때마다 초기화 시키는 기능도 가지고 있음)

        imgFiles.map(item => {  // 여기서 꺼낸 파일들을 imageList 담아야, imageList 담긴걸 아래에서 꺼내서 쓸 수가 있다.
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL) // objectURL를 임시변수 imgArray에 차곡차곡 쌓기
        }) 

        setImageList(imgArray) // (미리보기용) 쌓아놓은 이미지 내용을, setImageList에 담기
        setFiles(e.target.files) // (서버 업로드용) formData에 넣어서 서버로(스프링 부트) 보내기 용도
    }
    ///////////////////////////

    const onUploadSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData()
        formData.append('userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], { type: 'application/json'})) // 내가 적은 제목, 내용 등이 담긴 userUploadDTO도 객체에 실음
        // (x) formData.append('img[]', imageList) // 파일을 잡아와야 한다. imageList에 배열로 담은걸 'img[]'라는 배열변수명으로 formData 객체에 실음
        
        // for(var i=0 ; i < files.length ; i++) {
        //     formData.append('img',files[i])
        // }
        Object.values(files).map((item, index) => {
            formData.append('img',item)
        })

        axios.post('/user/upload', formData, {  // upload란 이름으로 서버에 요청을 보냄
                headers: {     // HTTP 요청의 헤더 정보를 설정
                    'Content-Type' : 'multipart/form-data'
                }
              })
             .then(res => {
                alert('이미지 업로드 완료')
                navigate('/use/uploadList')
            })
             .catch(error => console.log(error))
    }
    ///////////////////////////

    const onInput = (e) => {
        const { name, value } = e.target

        setUserUploadDTO({
            ...userUploadDTO,
            [name]: value
        })
    }
    ///////////////////////////
    
    const onReset = (e) => {
        e.preventDefault()

        setUserUploadDTO({
            imageName: '',
            imageContent: '',
            imageFileName: '',
            imageOriginalName: ''
        })

        setImageList([])
        //setShowImgSrc('')
        imgRef.current.value = ''
    }

    return (
        <div>
            <h3>
                <Link to='/'>
                    <img src={ mainImg } alt='망상토끼' width='50' height='50'/>
                </Link>
            </h3>
            <form className={ styles.UploadForm }>
                <table border="1">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td><input type="text" name="imageName" size='35' value={ imageName } onChange={ onInput }/></td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2}>
                                <textarea name="imageContent" rows={10}  cols={50} value={ imageContent } onChange={ onInput }></textarea>
                            </td>
                        </tr>
                        
                        {/*  한 번에 여러개의 파일을 선택 */}
                        <tr>
                            <td colSpan={2}>
                                {/*  미리보기 : 업로드 버튼을 누르기 전에 선택한 이미지가 맞는지 확인하기 위해서 이미지를 보여준다. */}
                                <span id="showImgList">
                                    {
                                        imageList.map((item, index) => <img key={ index } src={ item } style={{ width: '100px', height: '100px' }} />)
                                    }
                                </span>
                                
                                <img id="camera" alt="카메라" src='/image/camera.png'
                                    onClick={ onCamera } 
                                    style={{width:40, height:40, borderRadius:20}}  />
                                <input type="file" name="img[]" 
                                    ref={ imgRef } 
                                    onChange={ onImgInput } id="img" multiple="multiple" style={{visibility: "hidden"}} />
                            </td>
                        </tr>
                        
                        
                        <tr>
                            <td colSpan={2} align="center">
                                <button type="button" onClick={ onUploadSubmit } id="uploadBtn">이미지 업로드</button> &nbsp;
                                <button type="reset" onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <br/>
                <div id="resultDiv"></div>
            </form>
        </div>
    );
};

export default UploadForm;