$('#searchListBtn').click(function(){
	if( $('#value').val() == '' ) {		
		alert('검색어를 입력하세요.');
	} else { // 검색어 로직 처리
		$.ajax({
			type: 'post',
			url: '/user/getUserSearchList', 
			data: { // 두 개를 가지고 서버로 보내야 한다. columnName(select의 id), value (input의 id)
				'columnName': $('#columnName').val(),
				'value': $('#value').val()
			 },
			dataType: 'json',
			success: function(data){
				console.log(JSON.stringify(data)); // data객체를 json문자열 형식으로 보여줌
				console.log(data); // 있는 그대로 객체로 보여줌
				//console.log(data.list[0].name);
				
				$('#userListTable tr:gt(0)').remove();
				
				// forEach문으로 출력할 때 data의 list를 배열로 끌고옴
				$.each(data, function(index, items){  // each문으로 모든 요소 출력
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
			} ,
			error: function(e){
				console.log(e);
			}
		}); // $.ajax
	}
});