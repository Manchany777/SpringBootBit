package user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//import org.mybatis.spring.annotation.MapperScan;
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
	//@Autowired
	//private UserPaging userPaging;
	
	@Override
	public String isExistId(String id) {
		// DB
		Optional<UserDTO> userDTO = userDAO.findById(id);
		// findById를 사용하면 Return type을 Optional<>로 감싸야 하고, Optional<>로 감싸면 null값 대신 Optional.empty가 출력된다.
		// 즉, null이 나오는 걸 막는 것이다.
		// 이렇게 되면 null 결과값이 나오지 않으므로, 아래 유효성 검사 로직에서도 다른 방식을 사용해야 한다.
		System.out.println(userDTO); // 값이 없으면 Optional.empty 출력된다.
		
		if(userDTO.isPresent()) // 값이 없으면 false
			return "exist"; // 사용 불가능
		else
			return "non_exist"; // 사용 가능
		/*
		if(!userDTO.isPresent()) // 값이 없으면 false
			return "non_exist"; // 사용 가능
		else
			return "exist"; // 사용 불가능*/
		// 위에서 둘 중 하나 선택
	}
	
	@Override
	public void write(UserDTO userDTO) {
		// DB
		// id컬럼이 primary key로 설정되어 있기 때문에
		// 똑같은 id가 없으면 insert 수행하고, id가 있으면 update로 수행한다.
		userDAO.save(userDTO);
	}
	
	@Override
	public Map<String, Object> getUserList(String pg) {
		// 1페이지당 3개씩
//		int endNum = Integer.parseInt(pg)*3;
//		int startNum = endNum-3; // oracle : endNum-2;
//		
//		// myBatis는 하나씩밖에 못실어가기때문에 map을 보내야함
//		Map<String, Integer> map = new HashMap<String, Integer>();
//		map.put("startNum", startNum);
//		map.put("endNum", endNum);
		 
		// DB
			// userDAO.getUserList(startNum, endNum); (x) - 이렇게 안 됨
//		List<UserDTO> list = userDAO.getUserList(map);
		List<UserDTO> list = userDAO.findAll(); // 페이징처리 없이 모든 데이터를 전부 가져옴
		// DB에서 받아온걸 list로 담아오도록 설정
		System.out.println(list); // 콘솔창에 list값 제대로 출력되는지 확인
		
		
		// 페이징 처리
//		int totalA = userDAO.getTotalA(); // 총 글수
//
//		UserPaging userPaging = new UserPaging(); // 하나씩 꺼내오기
//
//		userPaging.setCurrentPage(Integer.parseInt(pg));
//		userPaging.setPageBlock(3);
//		userPaging.setPageSize(3);
//		userPaging.setTotalA(totalA);
//
//		userPaging.makePagingHTML(); // 메소드 호출
		
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("list", list);
//		map2.put("userPaging", userPaging);
	
		
		return map2;
	}
	
	@Override
	public Optional<UserDTO> getUser(String id) {
		Optional<UserDTO> getUser = userDAO.findById(id);
		// DB
		return getUser;
	}
	
	@Override
	public void update(UserDTO userDTO) {
		userDAO.save(userDTO);
		//userDAO.update(userDTO); (x)
	}
	
	@Override
	public void delete(String id) {
		//userDAO.deleteById(id); // (delete from usertable where id=?)
		// deleteById()는 내부적으로 findById()를 수행하고 delete를 처리한다.
		// 아이디가 없으면 EmptyResultDataAccessException이 발생한다.
		
		// delete()는 findById() 수행하지 않고 바로 delete를 처리한다.
		//userDAO.delete(id); (x)
	}
}



/*

@EntityScan
어노테이션으로 엔티티 클래스를 스캔할 곳을 지정하는데 사용한다.
메인 어플리케이션 패키지 내에 엔티티 클래스가 없는 경우 어노테이션을 사용해서 패키지밖에 존재하는 
엔티티를 지정할 수 있다.
기본적으로 @EnableAutoConfiguration 어노테이션에 의해서 지정한 곳에서 엔티티를 스캔한다.

@EnableJpaRepositories
- JpaRepository에 대한 설정정보를 자동적으로 로딩하고 이 정보를 토대로 Repository 빈을 등록하는 역할을 한다

Optional 클래스란?
- Optional이란 'null일 수도 있는 객체'를 감싸는 일종의 Wrapper 클래스이다.

*/