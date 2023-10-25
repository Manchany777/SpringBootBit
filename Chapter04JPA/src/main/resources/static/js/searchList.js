//$('#searchListBtn').click(function(){
function searchList(page, columnName, value) {
	if( $('#value').val() == '' ) {		
		alert('검색어를 입력하세요.');
	} else {
		$.ajax({
		type: 'post',
		url: '/user/getUserSearchList', 
		data: { // 두 개를 가지고 서버로 보내야 한다. columnName(select의 id), value (input의 id)
			'columnName': columnName,
			'value': value,
			'page': page
		 },
		dataType: 'json',
		success: function(data){
			console.log(JSON.stringify(data)); // data객체를 json문자열 형식으로 보여줌
			console.log(data); // 있는 그대로 객체로 보여줌
			//console.log(data.list[0].name);
			
			$('#userListTable tr:gt(0)').remove();
			
			// forEach문으로 출력할 때 data의 list를 배열로 끌고옴
			$.each(data.content, function(index, items){  // each문으로 모든 요소 출력
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
			//$('#userPagingDiv').html(data.userPaging.pagingHTML);
			alert('검색결과 총 페이지수 : ' + data.totalPages);
			var pagingHTML = '';
			//var columnName = $('#columnName').val();
   			//var value = $('#value').val();
			
			$('#userPagingDiv').empty();
			for(var i=0; i<data.totalPages; i++){
				//pagingHTML += i+1;  // 0부터 시작하므로 1페이지부터 시작하도록 하기위해 +1 추가
			
				if(i == $('#page').val()) { // currentPage 대신 $('#pg').val()으로 => pg를 page로 바꿈
					// 둘 중 편한 방식으로 사용하면 됨
					//pagingHTML += `<span id='currentPaging' onclick='userPaging(` + (i) + `)'>` + (i+1) + `</span>`;
					pagingHTML += `<span id='currentPaging' onclick='searchList(${i},"${columnName}","${value}")'>${(i+1)}</span>`;
				} else {
					//pagingHTML+= `<span id='paging' onclick='userPaging(` + i + `)'>` + i + `</span>`;
					pagingHTML += `<span id='paging' onclick='searchList(${i},"${columnName}","${value}")'>${(i+1)}</span>`;
				}
			}//for
				
			$('#userPagingDiv').html(pagingHTML);
			
			// 아이디를 클릭했을 때
            $('.subjectA').click(function(){
                alert('이름 = ' + $(this).parent().prev().text());
                location.href='/user/userUpdateForm?id=' + $(this).text() + '&page=' + $('#page').val();
            });
			}, //success
		error: function(e){
			console.log(e);
		}
		}); // $.ajax
	}
}
//});

// 문서가 로드된 후에 이벤트 핸들러를 등록합니다.
$(document).ready(function() {
	/* (인자값이 없어 제대로 동작x)
    // 검색 버튼 클릭 시 searchList 함수 실행
    $('#searchListBtn').off('click').on('click', searchList);
    
    // 검색어 입력 필드에서 엔터 키 누를 때 searchList 함수 실행
    $('#value').off('keydown').on('keydown', function(event) {
        if (event.keyCode === 13) { // 엔터 키를 누를 때
            searchList();
        }
    });*/
    
    //  새로운 페이지로 이동할 때마다 searchList() 함수가 호출되어 새로운 데이터를 불러오고 화면에 렌더링함으로써 무한 루프를 방지
    // 검색 버튼 클릭 시 searchList 함수 실행
    $('#searchListBtn').off('click').on('click', function() {
        searchList($('#page').val(), $('#columnName').val(), $('#value').val());
    });

    // 검색어 입력 필드에서 엔터 키 누를 때 searchList 함수 실행
    $('#value').on('keydown', function(event) {
        if (event.keyCode === 13) { // 엔터 키를 누를 때
        	event.preventDefault(); // 엔터 키 누르면 순식간에 메인 화면으로 가는 걸 방지
            searchList($('#page').val(), $('#columnName').val(), $('#value').val());
        }
    });
});
/*
function userPaging(page) {
	
}*/