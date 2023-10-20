package user.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import user.bean.UserDTO;
import user.bean.UserPaging;
import user.service.UserService;


@Controller
@RequestMapping(value="user") // 중복처리되는 매핑 코드를 전역으로 처리 (슬래시 안써넣어도 자기가 알아서 구분자로 슬래시를 넣어줌)
public class UserController {
	@Autowired // UserService와 의존관계 형성
	private UserService userService;
	
	// 회원가입
	//@GetMapping(value="/user/writeForm")
	@RequestMapping(value="writeForm", method={RequestMethod.GET, RequestMethod.POST}) // 요청시 부르는 것
	public String writeForm() {
		return "/user/writeForm"; // jsp 찾아가자
	}
	
	// 아이디 중복조회
	@PostMapping(value="/isExistId")
	@ResponseBody // exist를 jsp가 아닌 실제 문자열이 넘어가게 함
	public String isExistId(@RequestParam String id) { // = request.getParameter("id");
		
		//DB연결을 여기서 하는게 아니라 일을 하는 집합체인 UserServiceImpl에서 한다.
		//return "exist" or "non_exist"; -> 이런식으로 리턴하는 값을 UserServiceImpl에서 하도록 해야한다는 말
		return userService.isExistId(id);
	}
	
	// 회원가입 post
	@PostMapping("write")
				  // ajax처리는 view로 가지 말고 다시 돌아와야 하기때문에 viewResolve를 안거치게 해야한다.
	@ResponseBody // 이거 안붙여주면 view로 뿌려줄 jsp 찾음
	public void write(@ModelAttribute UserDTO userDTO) { // 리턴값이 없을 뿐이지 보내는 내용은 객체이다.
		userService.write(userDTO);
	}
	
	// 페이징 처리
	@GetMapping(value="list") 		// page값 아무것도 안떠도 된다. 단, 없을 땐 기본페이지는 1page를 보여준다.
									// index.jsp에 <a href="/chapter06_web/user/list?pg=1">라고 안적어도 되도록
	public String list(@RequestParam(required = false, defaultValue = "1") String pg, Model  model) {
		
		model.addAttribute("pg", pg);
		
		return "/user/list";
	}
	
	// 회원정보 조회
	@PostMapping(value="getUserList")
	@ResponseBody
	public Map<String, Object> getUserList(@RequestParam String pg) {
		return userService.getUserList(pg);
	}
	
	// 회원수정 페이지
	@GetMapping(value="userUpdateForm") // 요청시 부르는 것
	public String userUpdateForm(@RequestParam String id, @RequestParam String pg, Model model) {
		model.addAttribute("id", id); // userUpdateForm으로 id파라미터 값 옮기기 위하여
		model.addAttribute("pg", pg);
		
		return "/user/userUpdateForm"; // jsp 찾아가자
	}
	
	// 회원수정 post
	@PostMapping("getUser")
	  // ajax처리는 view로 가지 말고 다시 돌아와야 하기때문에 viewResolve를 안거치게 해야한다.
	@ResponseBody // 이거 안붙여주면 view로 뿌려줄 jsp 찾음
	public UserDTO getUser(@RequestParam String id) { 
		return userService.getUser(id); // 한 사람분량의 데이터만 옮겨줌
	} 
	
	@PostMapping(value="update")
	@ResponseBody
	public void update(@ModelAttribute UserDTO userDTO) { // 리턴값이 없을 뿐이지 보내는 내용은 객체이다.
		System.out.println("컨트롤 단 =" + userDTO);
		userService.update(userDTO);
	}
	
	// 회원정보 삭제
	@PostMapping(value="delete")
	@ResponseBody
	public void delete(@RequestParam String id) { // 리턴값이 없을 뿐이지 보내는 내용은 객체이다.
		userService.delete(id);
	}
}