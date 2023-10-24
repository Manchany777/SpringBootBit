package com.example.demo;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity // JPA에서 하나의 스키마처럼 하나의 객체로 선언하는 어노테이션
		//설정하는 dto하고  똑같은 이름의 테이블을 만들어준다. = create table boardDTO (~~)(단순 일반 dto가 아니라 테이블과 연관되어있는 객체가 되는 것이다.)
@Table(name="board") // 만약, boardDTO라는 테이블명이 마음에 안들면 따로 테이블명 지정 가능 = create table board (~~)
@Getter
@Setter
public class BoardDTO {
	@Id //Primary Key로 설정 (org.framework import하면 x)
	@Column(name="seq")
	//@GeneratedValue(strategy=GenerationType.AUTO) // 특정 데이터베이스에 맞게 자동으로 생성하는 방식, 자동으로 시퀀스 테이블이 생성된다.
	//@GeneratedValue(strategy=GenerationType.IDENTITY)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="BOARD_SEQ_GENERATOR") // BOARD_SEQ_GENERATOR 테이블 객체 생성 (BOARD_SEQ_GENERATOR은 임의로 지은 이름)
	private int seq;
	
	@Column(name="id", nullable=false, unique=true, length=30) // 중복등록 x
	private String id;
	
	@Column(name="name", nullable=false, length=30) // Table어노테이션과 마찬가지로 컬럼별로 세부적으로 지정 가능
	private String name; 						    // = name varcher(30) not null,
	
	@Column(name="subject")
	private String subject;
	
	@Column(name="content")
	private String content;
	
	@CreationTimestamp // 엔티티가 생성되는 시점의 시간 등록
	private Timestamp logtime; // security로 import하면 x
}
