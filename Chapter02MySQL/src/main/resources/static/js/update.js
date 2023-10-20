$(function(){
	$.ajax({  // 동적으로 중복여부 체크
		type: 'post',
		url: '/user/getUser', // 이미 있는 getUser컬럼 사용
		data: 'id=' + $('#id').val(), 		// model에게 넘겨받은 id 파라미터를 getUser로 넘겨줌
		dataType: 'json',  					// DTO객체니까 JSON타입으로
		success: function(data){
			console.log(JSON.stringify(data));
			
			$('#name').val(data.name);
			$('#pwd').val(data.pwd);
		},
		error: function(e){
			console.log(e);
		}
	});
});

// 취소버튼
$('#resetBtn').click(function(){
	location.reload(); // 위의 ajax코드가 window.onload에 해당하기때문에 위의 코드를 다시 읽어라
});

// 수정버튼
$('#updateBtn').click(function(){
	$('#nameDiv').empty();
	$('#pwdDiv').empty();
		
	if($('#name').val()==''){
		$('#nameDiv').text('이름을 입력하세요.');
		$('#name').focus();
	} else if ($('#pwd').val()=='') {
		$('#pwdDiv').text('비밀번호를 입력하세요.');
		$('#pwd').focus();
	} else {
		$.ajax({ 	// DB와 연결
			type: 'post',
			url: '/user/update',
			data: $('#userUpdateForm').serialize(), // #writeForm안에 있는 모든 데이터(name,id,pwd)를 가지고 감
			success: function(){
				alert('회원정보 수정 완료');
				location.href = '/user/list?pg=' + $('#pg').val();
			},
			error: function(e){
				console.log(e);
			}
		});
	}
});
