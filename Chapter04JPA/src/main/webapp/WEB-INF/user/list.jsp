<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style type="text/css">
a {
	color: black;
	text-decoration: none; 
	outline: none
}
a:hover, a:active {
	color: green;
	text-decoration: underline;
}
table {
	border-collapse: collapse;
}
th, td {
	padding: 5px;
}
#currentPaging {
	border: 1px solid #ccc;
	margin: 5px;
	padding: 5px 8px;
	color: red;
	cursor: pointer;
}
#paging {
	margin: 5px;
	padding: 5px 8px;
	color: black;
	cursor: pointer;
}
.subjectA:Link { color:black; text-decoration: none; }
.subjectA:visited { color:black; text-decoration: none; }
.subjectA:hover { color:green; text-decoration: underline; }
.subjectA:active { color:black; text-decoration: none; }
</style>
</head>
<body>
<input type="hidden" id="pg" value="${pg}">
<a href="/"><img alt="망상토끼" src="/image/망상토끼.gif" style="cursor: pointer;" width="50" height="50"></a>
<br/>
<input type="text" id="pg" value="${ pg }">
<table border="1" frame="hsides" rules="rows" id="userListTable">
	<tr>
		<th width="200">이름</th>
		<th width="200">아이디</th>
		<th width="200">비밀번호</th>
	</tr>
	
	<!-- 동적 처리 -->
	
</table>
<div id="userPagingDiv" style="width: 610px; text-align: center; margin-top: 10px;"></div>

<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.0.min.js"></script>
<script type="text/javascript" src="../js/list.js"></script>
<script>
function userPaging(pg) {
	// BoardPaging에서 호출할 함수를 만듦
	location.href = "/user/list?pg=" + pg;
}
</script>
</body>
</html>