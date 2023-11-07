import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/UploadForm.module.css';
import mainImg from '../image/망상토끼.gif';
//import cameraImg from '../image/camera.png';



const UploadForm = () => {
    const imgRef = useRef() // 초점 맞추기

    const [imageList,setImageList]  = useState([])
    const [file,setFile]  = useState('')
    const [showImgSrc,setShowImgSrc]  = useState([])
    
    const onCamera = () => { // 이미지 클릭시 파일 선택 버튼과 같은 역할을 하도록 함
        imgRef.current.click() // 현재 포커스가 맞춰져 있는 곳에 click 이벤트가 발생하게 됨(trigger와 같은 기능)
    }
    const onUploadSubmit = (e) => {
        e.preventDefault()
    }

    const onReset = (e) => {
        e.preventDefault()
    }

    const readURL = (input) => {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0])
        reader.onload = () => {
            console.log(input.files[0])
            setShowImgSrc(reader.result)
            setFile(input.files[0])
        }
    }

    const onImgInput = () => {
        
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
                            <td><input type="text" name="imageName" size={35} /></td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2}>
                                <textarea name="imageContent" rows={10}  cols={50}></textarea>
                            </td>
                        </tr>
                        
                        {/*  다중 업로드 할 때는 name 속성의 이름이 같아야 한다. */}
                        {/* <tr>
                            <td colSpan={2}>
                                <input type="file" name="img">
                            </td>
                        </tr>
                        
                        <tr>
                            <td colSpan={2}>
                                <input type="file" name="img">
                            </td>
                        </tr> */}
                        
                        {/*  한 번에 여러개의 파일을 선택 */}
                        <tr>
                            <td colSpan={2}>
                                {/*  미리보기 : 업로드 버튼을 누르기 전에 선택한 이미지가 맞는지 확인하기 위해서 이미지를 보여준다. */}
                                {/*  이미지 1개만 미리보기 */}
                                {/*  <img id="showImg" width="70" height="70" /> */}
                                {/*  여러 개의 이미지 미리보기 */}
                                <span id="showImgList">
                                    {/* {
                                        data.map(item => <img src={ item.imageList }/>)
                                    } */}
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
                                <button type="button" onClick={ onUploadSubmit } id="uploadBtn">이미지 업로드</button>
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