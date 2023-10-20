$(function(){
	$.ajax({
		type: 'post',
		url: '/user/getUserList',
		data: 'pg=' + $('#pg').val(),
		dataType: 'json',
		success: function(data){
			console.log(JSON.stringify(data)); // 현재 객체가 json형태로 바뀌었는지 확인
			//console.log(data[0].name);		   // 해당 json배열 객체에서 0번째 요소 출력
			console.log(data.list[0].name); // Map으로 받고나서 data안에 userPaging객체와 list객체가 들어온다.
			
			//$.each(data, function(index, items)
			$.each(data.list, function(index, items){  // each문으로 모든 요소 출력
				console.log(items.name); 		  // 콘솔창에 이름 출력
				$('<tr/>').append($('<td/>', { 	  //  웹화면에 출력
					align: 'center',
					text : items.name
				})).append($('<td/>',{
				}).append($('<a/>', { 
					href:'#', 
					text : items.id,
					class: 'subjectA'
					}))
				).append($('<td/>', {
					align: 'center',
					text : items.pwd
				})).appendTo($('#userListTable'));
			}); // $.each
			
			//페이징 처리
			$('#userPagingDiv').html(data.userPaging.pagingHTML);
			
			// 아이디를 클릭했을 때
			$('.subjectA').click(function(){
				//alert($(this).text()); // 모든 subjectA 속성 중 내가 클릭한 subjectA의 값만 보여줌
				//alert($(this).parent().prev().prop('tagName'));     // name태그의 태그 종류 출력
				alert('이름 = ' + $(this).parent().prev().text()); // name값 출력
				
				location.href='/user/userUpdateForm?id=' + $(this).text() + '&pg=' + $('#pg').val(); // 해당 주소로 넘겨받은 파라미터 값 출력
			});
		},
		error: function(e){
			console.log(e);
		}
	});
});