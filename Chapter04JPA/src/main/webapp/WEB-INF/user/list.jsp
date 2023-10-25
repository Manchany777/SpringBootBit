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
<input type="hidden" id="page" value="${page}">
<a href="/"><img alt="망상토끼" src="/image/망상토끼.gif" style="cursor: pointer;" width="50" height="50"></a>
<br/>
<input type="text" id="page" value="${ page }">
<table border="1" frame="hsides" rules="rows" id="userListTable">
	<tr>
		<th width="200">이름</th>
		<th width="200">아이디</th>
		<th width="200">비밀번호</th>
	</tr>
	
	<!-- 동적 처리 -->
	
</table>
<div id="userPagingDiv" style="width: 610px; text-align: center; margin-top: 10px;"></div>
<br><br>
<div style="">
	<form id="searchListForm">
		<select id="columnName">
			<option value="name">이름</option>
			<option value="id">아이디</option>
		</select>
		<input type="text" id="value" value="${ param.value }">
		<input type="button" id="searchListBtn" value="검색">
	</form>
</div>

<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.0.min.js"></script>
<script type="text/javascript" src="../js/searchList.js"></script>
<script type="text/javascript" src="../js/list.js"></script>
<script>
function userPaging(page) {
	var columnName = $('#columnName').val();  // 현재 값 가져오기
    var value = $('#value').val();  // 현재 값 가져오기
    console.log(columnName, value);
	// BoardPaging에서 호출할 함수를 만듦
    alert('page : ' + page + ' columnName : ' + columnName + ' value : ' + value);
    location.href = "/user/list?page=" + page + '&columnName=' + columnName + '&value=' + value;
}
</script>
</body>
</html>