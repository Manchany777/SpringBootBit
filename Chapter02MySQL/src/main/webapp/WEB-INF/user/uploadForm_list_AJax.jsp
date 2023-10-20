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
</head>
<body>
<a href="/chapter06_web/index.jsp"><img alt="망상토끼" src="/chapter06_web/image/망상토끼.gif" style="cursor: pointer;" width="50" height="50"></a>
<br/>
<table border="1" frame="hsides" rules="rows" id="imageListTable">
	<tr>
		<th width="100">번호</th>
		<th width="200">이미지</th>
		<th width="150">상품명</th>
	</tr>
	
	<!-- 동적 처리 -->
	
</table>
<div id="imagePagingDiv" style="width: 610px; text-align: center; margin-top: 10px;"></div>

<script type="text/javascript" src="http://code.jquery.com/jquery-3.7.0.min.js"></script>
<script type="text/javascript" src="../js/upload_list_AJax.js"></script>
</body>
</html>