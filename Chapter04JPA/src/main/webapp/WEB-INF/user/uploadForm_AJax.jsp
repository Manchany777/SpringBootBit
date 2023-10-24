<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
table {
	border-collapse: collapse;
}
th, td {
	padding: 8px;
}
</style>
</head>
<body>
<form id="uploadForm">
	<table border="1">
		<tr>
			<th>상품명</th>
			<td><input type="text" name="imageName" size="35"></td>
		</tr>
		
		<tr>
			<td colspan="2">
				<textarea name="imageContent" rows="10"  cols="50"></textarea>
			</td>
		</tr>
		
		<!-- 다중 업로드 할 때는 name 속성의 이름이 같아야 한다. -->
		<!-- 
		<tr>
			<td colspan="2">
				<input type="file" name="img">
			</td>
		</tr>
		
		<tr>
			<td colspan="2">
				<input type="file" name="img">
			</td>
		</tr>
		 -->
		 
		<!-- 한 번에 여러개의 파일을 선택 -->
		<tr>
			<td colspan="2">
				<!-- 미리보기 : 업로드 버튼을 누르기 전에 선택한 이미지가 맞는지 확인하기 위해서 이미지를 보여준다. -->
				<!-- 이미지 1개만 미리보기 -->
				<!-- <img id="showImg" width="70" height="70" /> -->
				<!-- 여러 개의 이미지 미리보기 -->
				<span id="showImgList"></span>
				
				<img id="camera" alt="카메라" src="../image/camera.png" width="50" height="50">
				<input type="file" name="img[]" id="img" multiple="multiple" style="visibility: hidden;">
			</td>
		</tr>
		
		 
		<tr>
			<td colspan="2" align="center">
				<input type="button" value="이미지 업로드" id="uploadBtn">
				<input type="reset" value="취소">
			</td>
		</tr>
	</table>
	<br>
	<div id="resultDiv"></div>
</form>

<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.0.min.js"></script>
<script type="text/javascript" src="../js/upload_AJax.js"></script>
<script type="text/javascript">
$('#camera').click(function(){
	$('#img').trigger('click'); // 강제 이벤트 발생
});


// 업로드 버튼을 누르기 전에 선택한 이미지가 맞는지 확인하기 위해서 이미지를 보여준다.
// 이미지 1개만 미리보기
/*$('#img').change(function(){
	readURL(this);
}); */

// 여러 개의 이미지 미리보기
$('#img').change(function(){
	$('#showImgList').empty();
	for(i=0; i<this.files.length; i++) {
		readURL(this.files[i]);
	}
});

// 이미지 1개만 미리보기
/*
function readURL(input) {
	var reader = new FileReader();
	
	reader.onload = function(e) {
		$('#showImg').attr('src', e.target.result); // e.target - 이벤트가 발생하는 요소를 반환해준다.
		
		//show += `<img src="e.target.result" width="70" height="70" />`;
	}
	
	reader.readAsDataURL(input.files[0]);
}*/

// 여러 개의 이미지 미리보기
function readURL(file) {
	var reader = new FileReader();
	
	var show; 
	reader.onload = function(e) {  // 태그 만들어주는 역할
		var img = document.createElement('img');
		img.src = e.target.result;
		img.width = 70;
		img.height = 70;
		$('#showImgList').append(img);
	}
	
	reader.readAsDataURL(file);
}

</script>
</body>
</html>

<!-- 
FileReader 란?
FileReader는 type이 file인 input 태그 또는 API 요청과 같은 인터페이스를 통해 
File 또는 Blob 객체를 편리하게 처리할수있는 방법을 제공하는 객체이며
abort, load, error와 같은 이벤트에서 발생한 프로세스를 처리하는데 주로 사용되며,
File 또는 Blob 객체를 읽어서 result 속성에 저장한다.

FileReader도 비동기로 동작한다.

FileReader.onload()
load 이벤트의 핸들러. 이 이벤트는 읽기 동작이 성공적으로 완료되었을 때마다 발생한다.
 -->