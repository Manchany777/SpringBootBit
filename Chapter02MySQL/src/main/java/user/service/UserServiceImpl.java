package user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import user.bean.UserDTO;
import user.bean.UserPaging;
import user.dao.UserDAO;

@Service // @Component보단 이렇게 서비스하는 클래스라는 걸 명시적으로 지정하는 게 낫다
//@MapperScan("user.dao")
public class UserServiceImpl implements UserService {
	@Autowired // UserDAO와 의존관계 형성
	private UserDAO userDAO;
	@Autowired
	private UserPaging userPaging;
	
	@Override
	public String isExistId(String id) {
		// DB
		UserDTO userDTO = userDAO.isExistId(id);
		// String타입으로 구성된 DTO는 true, false값을 주고받을 수 없으므로 이런식으로 로직을 짠다.
		if(userDTO == null)
			return "non_exist";
		else
			return "exist";
	}
	
	@Override
	public void write(UserDTO userDTO) {
		// DB
		userDAO.write(userDTO);
	}

	@Override
	public Map<String, Object> getUserList(String pg) {
		// 1페이지당 3개씩
		int endNum = Integer.parseInt(pg)*3;
		int startNum = endNum-3; // oracle : endNum-2;
		
		// myBatis는 하나씩밖에 못실어가기때문에 map을 보내야함
		Map<String, Integer> map = new HashMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		 
		// DB
			// userDAO.getUserList(startNum, endNum); (x) - 이렇게 안 됨
		List<UserDTO> list = userDAO.getUserList(map);
		// DB에서 받아온걸 list로 담아오도록 설정
		System.out.println(list); // 콘솔창에 list값 제대로 출력되는지 확인
		
		
		// 페이징 처리
		int totalA = userDAO.getTotalA(); // 총 글수

		UserPaging userPaging = new UserPaging(); // 하나씩 꺼내오기

		userPaging.setCurrentPage(Integer.parseInt(pg));
		userPaging.setPageBlock(3);
		userPaging.setPageSize(3);
		userPaging.setTotalA(totalA);

		userPaging.makePagingHTML(); // 메소드 호출
		
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("list", list);
		map2.put("userPaging", userPaging);
	
		
		return map2;
	}

	@Override
	public UserDTO getUser(String id) {
		// DB
		return userDAO.getUser(id);
	}

	@Override
	public void update(UserDTO userDTO) {
		userDAO.update(userDTO);
	}

	@Override
	public void delete(String id) {
		userDAO.delete(id);
	}
}