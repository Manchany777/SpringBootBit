package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {
	@Autowired	
	private BoardDAO boardDAO;
	
	@Override
	public void write() {
		BoardDTO boardDTO = new BoardDTO();
		boardDTO.setId("hong");
		boardDTO.setName("허균");
		boardDTO.setSubject("홍길동전");
		boardDTO.setContent("불쌍한 사람들을 도우는 의적!!");
		boardDAO.save(boardDTO);
		
		//BoardDTO boardDTO = new BoardDTO();
//		boardDTO.setId("neo");
//		boardDTO.setName("네오");
//		boardDTO.setSubject("카카오 프렌즈");
//		boardDTO.setContent("네오는 고양이다.");
		
		// DB
		//boardDAO.save(boardDTO); // insert or update (JPA의 save메서드 : 기존 데이터가 있으면 update, 없으면 insert)
		// boardDAO.xxx : 예전엔 이름을 마음대로 지정가능했지만, JPA는 그게 불가능 (save 등으로 지정되어있다.)
	}

	@Override
	public List<BoardDTO> list() {
		return boardDAO.findAll(); // findAll만 적으면 알아서 select 해줌
	}
}