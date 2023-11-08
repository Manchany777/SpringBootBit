package user.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import user.bean.UserUploadDTO;

@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserUploadController {
	
	@PostMapping(path="upload", produces = "application/json;charset=UTF-8")
	public void upload(@ModelAttribute UserUploadDTO userUploadDTO,
					   @RequestParam("img[]") List<MultipartFile> list, 
					   HttpSession session) {
		// 실제 폴더
		String filepath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제폴더 = " + filepath);
		
		File file;
		String originalFileName;
		String fileName;
		
		
		// 파일명만 모아서 DB로 보내기
		List<UserUploadDTO> userImageList = new ArrayList<UserUploadDTO>();
		
		for(MultipartFile img : list) { // @RequestParam("img[]") List<MultipartFile> list의 list	
			originalFileName = img.getOriginalFilename();
			System.out.println(originalFileName);
			
			// UUID 생성
			//fileName = objectStorageService.uploadFile(bucketName, "storage/", img); 
			//  objectStorageService의 uploadFile에서 bucketName의 storage/에 있는 img를 가져와서 fileName에 담는다
			fileName = "noname";
			
			file = new File(filepath, originalFileName);
			
			try {
				img.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			UserUploadDTO dto = new UserUploadDTO();
			dto.setImageName(userUploadDTO.getImageName()); // 상품명
			dto.setImageContent(userUploadDTO.getImageContent()); // 상품내용
			//dto.setImageFileName("");		 // UUID - Object에 올라갈 수 있도록 처리애햐함(클라우드에서 이름을 받아올 거라 여기선 공백으로 둔다.)
			//dto.setImageFileName("noname");  // 현재는 "noname"이 뜨게 바꿈
			dto.setImageFileName(fileName);  // NCloud에 UUID로 fileName 삽입
			dto.setImageOriginalName(originalFileName);
			
			userImageList.add(dto); // dto값을 list에 보관
		}//for
		
		System.out.println(userImageList);
		
		// DB
		//userUploadService.upload(userImageList);

	}
}
