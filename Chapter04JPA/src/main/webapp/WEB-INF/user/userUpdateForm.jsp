<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
table {
	border-collapse: collapse;
}
th, td {
	padding: 8px;
}
#userUpdateForm div {
	color: red;
	font-size: 8pt;
	font-weight: bold;
}
</style>
</head>
</head>
<body>
<h1>회원정보 수정 페이지</h1>
<!-- 반드시 result.do로 해줘야 한다. (result.jsp로 적으면 안 됨) -->
<form id="userUpdateForm">

<input type="text" id="page" value="${page}" >

<table border="1" cellspacing="0">
	<tr>
		<th width='120px'>이름 입력 : </th>
		<td>
			<input type="text" name="name" id="name" size="12" />
			<div id="nameDiv"></div>
		</td>
	</tr>
	<tr>
		<th>아이디 입력 : </th>
		<td>
			<input type="text" name="id" id="id" size="12" value="${id}" readonly />
		</td>
	</tr>
	<tr>
		<th>비밀번호 입력 : </th>
		<td>
			<input type="password" name="pwd" id="pwd" size="12" />
			<div id="pwdDiv"></div>
		</td>
	</tr>
	<tr>
		<td colspan="2" align="center">
			<input type="button" value="수정" id="updateBtn"/>
			<input type="button" value="삭제" id="deleteBtn"/>
			<input type="button" value="취소" id="resetBtn"/>
		</td>
	</tr>
</table>
</form>

<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.0.min.js"></script>
<script type="text/javascript" src="../js/update.js"></script>
<script type="text/javascript" src="../js/delete.js"></script>
</body>
</html>