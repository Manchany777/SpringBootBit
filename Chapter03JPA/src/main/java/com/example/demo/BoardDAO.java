package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardDAO extends JpaRepository<BoardDTO, Long>{
// JPA 상속 기본값 : extends JpaRepository<T, ID>
// JpaRepository<엔티티 클래스가 누구인지 지정, Primary Key의 데이터 타입(이 경우엔 seq에 해당)
// 제네릭에는 기본 타입이 올 수 없으므로 객체형인 Integer가 와야함 (but, 데이터가 길어질 수도 있기에 여기선 Long으로 씀)
	
	// ***JpaRepository 얘가 다 알아서 구현해주기 때문에 BoardServiceImpl에서 호출한 save()의 추상메소드조차 필요가 없다.
}