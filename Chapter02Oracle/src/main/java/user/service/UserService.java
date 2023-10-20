package user.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.annotation.MapperScan;

import user.bean.UserDTO;
import user.bean.UserPaging;

public interface UserService {

	public String isExistId(String id);

	public void write(UserDTO userDTO);

	public Map<String, Object> getUserList(String pg);

	public UserDTO getUser(String id);

	public void update(UserDTO userDTO);

	public void delete(String id);
}
