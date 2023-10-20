#Oracle
create table USERIMAGE (
SEQ number primary key,
IMAGENAME varchar2(50) not null,
IMAGECONTENT varchar2(4000),
IMAGE1 varchar2(200));

create sequence SEQ_USERIMAGE nocycle nocache;


# MySQL - MySQL은 시퀀스 객체가 없기때문에 대신 auto_increment로 해야함
create table USERIMAGE (
SEQ int(10) primary key auto_increment,
IMAGENAME varchar(50) not null,
IMAGECONTENT varchar(4000),
IMAGE1 varchar(200));