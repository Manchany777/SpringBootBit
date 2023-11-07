import React from 'react';

const UploadForm = () => {
    return (
        <div>
            <form id="uploadForm">
                <table border="1">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>상품명</th>
                            <td><input type="text" name="imageName" size="35" /></td>
                        </tr>
                        
                        <tr>
                            <td colspan="2">
                                <textarea name="imageContent" rows="10"  cols="50"></textarea>
                            </td>
                        </tr>
                        
                        {/*  다중 업로드 할 때는 name 속성의 이름이 같아야 한다. */}
                        {/* <tr>
                            <td colspan="2">
                                <input type="file" name="img">
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="2">
                                <input type="file" name="img">
                            </td>
                        </tr> */}
                        
                        {/*  한 번에 여러개의 파일을 선택 */}
                        <tr>
                            <td colspan="2">
                                {/*  미리보기 : 업로드 버튼을 누르기 전에 선택한 이미지가 맞는지 확인하기 위해서 이미지를 보여준다. */}
                                {/*  이미지 1개만 미리보기 */}
                                {/*  <img id="showImg" width="70" height="70" /> */}
                                {/*  여러 개의 이미지 미리보기 */}
                                <span id="showImgList"></span>
                                
                                <img id="camera" alt="카메라" src="../image/camera.png" width="50" height="50" />
                                <input type="file" name="img[]" id="img" multiple="multiple" />
                            </td>
                        </tr>
                        
                        
                        <tr>
                            <td colspan="2" align="center">
                                <input type="button" value="이미지 업로드" id="uploadBtn" />
                                <input type="reset" value="취소" />
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