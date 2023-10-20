$(function(){
	// 유효성 검사
	$('#writeBtn').click(function(){
		// 초기화
		$('#nameDiv').empty();
		$('#idDiv').empty();
		$('#pwdDiv').empty();
		
		if($('#name').val()==''){
			$('#nameDiv').text('이름을 입력하세요.');
			$('#name').focus();
		} else if ($('#id').val()=='') {
			$('#idDiv').text('아이디를 입력하세요.');
			$('#id').focus();
		} else if ($('#pwd').val()=='') {
			$('#pwdDiv').text('비밀번호를 입력하세요.');
			$('#pwd').focus();
		} else {
			$.ajax({ 	// DB와 연결
				type: 'post',
				url: '/user/write',
				data: $('#writeForm').serialize(), // #writeForm안에 있는 모든 데이터(name,id,pwd)를 가지고 감
				success: function(){
					alert('회원가입이 완료되었습니다');
					location.href = '/user/list';
				},
				error: function(e){
					console.log(e);
				}
			});
			
		}
	});
	
	// 아이디 중복체크
	$('#id').focusout(function(){
		$('#idDiv').empty();
		
		if ($('#id').val()=='') {
			$('#idDiv').text('먼저 아이디를 입력하세요.');
			$('#id').focus();
		} else {
			$.ajax({
				type: 'post',
				url: '/user/isExistId', // chapter06_web 앞에 슬래시 빼면 x(절대번지로 인식 못함),  chapter06_web 뒤의 슬래시를 보자마자 dispatcher 요청함, user는 네임스페이스, write
				data: 'id=' + $('#id').val(), 		  // (보내주는 값) // JSON으로 보내려면 {'id' : $('#id').val() }
				dataType: 'text', 					  // (리턴되서 보내오는 값)
				success: function(data){          // 사용 가능불가능 여부를 UserController.java의 write() 메도스를 통해 받은 다음 인자값(data)으로 받음
										  		  // ResponseBody객체로부터 exist문자열을 전달받음
					if(data == 'exist') {  		  // 아이디 존재
						$('#idDiv').text('사용 불가능');
						$('#idDiv').css('color', 'red');
					} else if(data == 'non_exist') { // 아이디 x
						$('#idDiv').text('사용 가능');
						$('#idDiv').css('color', 'blue');
					}
				}, 
				error: function(e){
					console.log(e);
				}
			});
		}
	});
});