$(function(){
	$.ajax({
		type: 'post',
		url: '/user/getUpload_list_AJax',
		dataType: 'json',
		success: function(data){
			console.log(JSON.stringify(data)); // 현재 객체가 json형태로 바뀌었는지 확인
			console.log(data[0].seq);
			
			/*
			$.each(data, function(index, item) { 
				$('<tr/>').append($('<td/>', {
					align: 'center',
					text: item.seq
				})).append($('<td/>', {
					align: 'center',
					//text: item.image1
					}).append($('<img/>', {
						src: '../storage/' + item.image1,  // 가상경로로 잡음
						style: 'width: 70px; height: 70px;'
					}))
				
				).append($('<td/>', {
					align: 'center',
					text: item.imageName
				})).appendTo($('#imageListTable'));
				// tr밑에 td 3개를 받고 그걸 imageListTable에 붙여줌 ({})은 객체배열의 값을 받을 공간
			});*/
			
			var result;
			$.each(data, function(index, item) { 
				result = `<tr>` + 
						`<td align="center">` + item.seq + `</td>` +
						`<td align="center">` + 
							`<img src='../storage/` + item.image1 + `'` + `style='width:70px; height:70px;'>` + 
						`</td>` + 
						`<td align="center">` + item.imageName + `</td>` + 
						`<tr>`;
				$('#imageListTable').append(result);
			});
		},
		error: function(e){
			console.log(e);
		}
	});
});