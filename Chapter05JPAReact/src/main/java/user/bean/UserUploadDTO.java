package user.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "userimage")
@Data
public class UserUploadDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // MySQL의 auto_increment를 사용하여 자동으로 시퀀스가 적용되게 함
	@Column(name="seq")
	private Long seq;
	
	@Column(name="imagename", length = 50)
	private String imageName;//상품명
	
	@Column(name="imagecontent", length = 4000)
	private String imageContent;//상품 내용
	
	@Column(name="imagefilename", nullable = false, length = 100)
	private String imageFileName;//UUID에서 얻은 이름
	
	@Column(name="imageoriginalname", nullable = false, length = 100)
	private String imageOriginalName;//이미지의 원래 이름
}