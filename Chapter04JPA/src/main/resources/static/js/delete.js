// 삭제버튼
$('#deleteBtn').click(function(){
	if(confirm('삭제하시겠습니까?')) {
	
		$.ajax({ 	// DB와 연결
			type: 'post',
			url: '/user/delete',
			data: { 'id' : $('#id').val() }, // #writeForm와는 달리 id만 가지고 가면 됨 (JSON으로 보냄)
			success: function(){
				alert('회원정보 삭제 완료');
				location.href = '/user/list'; // pg값 따로 안 주면 자동으로 1로 가게됨 
			},
			error: function(e){
				console.log(e);
			}
		});	
	} //if
});