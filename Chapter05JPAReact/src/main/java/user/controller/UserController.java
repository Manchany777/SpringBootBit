package user.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import user.bean.UserDTO;
//import user.bean.UserPaging;
import user.service.UserService;

@CrossOrigin  // crossorigin 해결을 위해 변경

//@Controller
@RestController  // crossorigin 해결을 위해 변경 (@ResponseBody 어노테이션 필요없으므로 제거)

//@RequestMapping(value="user") // 중복처리되는 매핑 코드를 전역으로 처리 (슬래시 안써넣어도 자기가 알아서 구분자로 슬래시를 넣어줌)
@RequestMapping(path="user") // axios와 맞추기 위해 path로 변경
public class UserController {
	
	@Autowired // UserService와 의존관계 형성
	private UserService userService;
	
	// 회원가입
	//@GetMapping(value="/user/writeForm")
	/*
	@RequestMapping(path="writeForm", method={RequestMethod.GET, RequestMethod.POST}) // 요청시 부르는 것
	public String writeForm() {
		return "/user/writeForm"; // jsp 찾아가자
	}*/
	
	
	// 아이디 중복조회
	// axios.get()를 썼기 때문에 @GetMapping으로 변경
	@GetMapping(path="/isExistId")
	public String isExistId(@RequestParam String id) { // = request.getParameter("id");
		System.out.println("ㅇㄹㄴㅇㄹㄴㅇㄹ");
		//DB연결을 여기서 하는게 아니라 일을 하는 집합체인 UserServiceImpl에서 한다.
		//return "exist" or "non_exist"; -> 이런식으로 리턴하는 값을 UserServiceImpl에서 하도록 해야한다는 말
		return userService.isExistId(id);
	}
	
	
	// 회원가입 post
	@PostMapping("write")
				  // ajax처리는 view로 가지 말고 다시 돌아와야 하기때문에 viewResolve를 안거치게 해야한다.
	public void write(@ModelAttribute UserDTO userDTO) { // 리턴값이 없을 뿐이지 보내는 내용은 객체이다.
		userService.write(userDTO);
	}
	
	// 페이징 처리
	/*
	@GetMapping(path="list") 		// page값 아무것도 안떠도 된다. 단, 없을 땐 기본페이지는 1page를 보여준다.
									// index.jsp에 <a href="/chapter06_web/user/list?pg=1">라고 안적어도 되도록
	public String list(@RequestParam(required = false, defaultValue = "0") String page, Model  model) {
		model.addAttribute("page", page);
		return "/user/list";
	}*/
	
	// 회원정보 조회
	// axios.get()를 썼기 때문에 @GetMapping으로 변경
	@GetMapping(path="getUserList")
	public Page<UserDTO> getUserList(
				// page는 0부터 시작, 0이면 1페이지, 1이면 2페이지, ...
				@PageableDefault(page=0, size=3, sort="name", direction = Sort.Direction.DESC) Pageable pageable) {
		Page<UserDTO> test = userService.getUserList(pageable);
		System.out.println("controller getUserList : " + test);
		return test;
	}
	
	// 회원수정 페이지
	/*
	@GetMapping(path="userUpdateForm") // 요청시 부르는 것
	public String userUpdateForm(@RequestParam String id, @RequestParam String page, Model model) {
		model.addAttribute("id", id); // userUpdateForm으로 id파라미터 값 옮기기 위하여
		model.addAttribute("page", page);
		
		return "/user/userUpdateForm"; // jsp 찾아가자
	}*/
	
	// 회원수정 post
	// axios.get()를 썼기 때문에 @GetMapping으로 변경
	@GetMapping("getUser")
	  // ajax처리는 view로 가지 말고 다시 돌아와야 하기때문에 viewResolve를 안거치게 해야한다.
	public Optional<UserDTO> getUser(@RequestParam String id) { 
		return userService.getUser(id); // 한 사람분량의 데이터만 옮겨줌
	} 
	
	@PutMapping(path="update")
	//@ResponseBody
	public void update(@ModelAttribute UserDTO userDTO) { // 리턴값이 없을 뿐이지 보내는 내용은 객체이다.
		System.out.println("컨트롤 단 =" + userDTO);
		userService.update(userDTO);
	} 
	
	// 회원정보 삭제
	@DeleteMapping(path="delete")
	public void delete(@RequestParam String id) { // 리턴값이 없을 뿐이지 보내는 내용은 객체이다.
		userService.delete(id);
	}
	
	// 회원정보 검색
	@GetMapping(path="getUserSearchList")
	public Page<UserDTO> getUserSearchList(@RequestParam String columnName, @RequestParam String keyword,
				@PageableDefault(page=0, size=3, sort="name", direction = Sort.Direction.DESC) Pageable pageable) {
	//public List<UserDTO> getUserSearchList(@RequestParam Map<String, String> map) {
							// columnName, value을 이렇게 controller단에서 미리 묶을수도 있지만, 
							// 어차피 Service단에서 다시 풀어야 하기에 여기선 그냥 따로 보냄
		return userService.getUserSearchList(columnName, keyword, pageable);	
	}
}