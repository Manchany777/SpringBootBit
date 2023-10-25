package user.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import user.bean.UserDTO;

@Repository
public interface UserDAO extends JpaRepository<UserDTO, String> {
// JpaRespository<Eneity 클래스, primavry key의 자료형>
 
	public List<UserDTO> findByNameContaining(String value);
	public List<UserDTO> findByIdContaining(String value);
	
	// 검색 대상이 테이블이 아니라 영속성 컨텍스트에 등록된 엔티티이다.
	// ?1는 첫번째 파라메터(String value)를 의미한다.
	/*
	@Query("select userDTO from UserDTO userDTO where userDTO.name like ('%', ?1, '%')") 
	// select 다음엔 영속성의 대상인 내가 잡은 엔티티의 객체명(userDTO)을 적어야함 (클래스명 즉, 테이블명(UserDTO)을 적으면 안 됨)
	// select 객체명 from 클래스명 객체명 where 조건~~
	public List<UserDTO> getUserSearchName(String value);
	
	@Query("select userDTO from UserDTO userDTO where userDTO.id like ('%', ?1, '%')")
	public List<UserDTO> getUserSearchId(String value); */
	
	// 파라미터 개수가 늘어나서 물음표 개수가 너무 많아지면 물음표가 무엇을 의미하는지 헷갈린다. 이럴 경우 물음표에 직접 이름을 적을 수 있다.
	// 이때, :value는 String value가 아니라 @Param("value")의 이름을 따라감
	@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%', :value, '%')") 
	public Page<UserDTO> getUserSearchName(@Param("value") String value, Pageable pageable);
	
	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%', :value, '%')")
	public Page<UserDTO> getUserSearchId(@Param("value") String value, Pageable pageable);
}