package spring.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.Data;

@Configuration
@PropertySource("classpath:naver.properties") // resources를 기준으로 파일을 찾는다.
@ConfigurationProperties(prefix="ncp") // naver.properties의 ncp.accessKey=CXkkZc5veJMDyhgpGhHE 등의 앞에 있는 'ncp.'
@Data
public class NaverConfiguration {
	private @Value("${ncp.accessKey}") String accessKey;
	private @Value("${ncp.secretKey}") String secretKey;
	private @Value("${ncp.regionName}") String regionName;
	private @Value("${ncp.endPoint}") String endPoint;
}