package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="usertable") // usertable라는 이름으로 테이블을 만들도록 지정
@Data
public class UserDTO {
	@Column(name="name", nullable = false, length = 30)
	private String name;
	
	@Id
	@Column(name="id", length = 30)  // @Id로 pk키 지정했기때문에 not null, unique 설정 필요x
	private String id;
	
	@Column(name="pwd", nullable = false, length = 30)
	private String pwd;
	
	@Override
	public String toString() {
		return name + "\t" + id + "\t" + pwd;
	}
}