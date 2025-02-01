package cloud.thanhln.identity.configuration;

import java.util.Enumeration;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AuthenticationRequestInterceptor implements RequestInterceptor {

	@Override
	public void apply(RequestTemplate template) {
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		Enumeration<String> authHeaderNames = servletRequestAttributes.getRequest().getHeaderNames();
//		while (authHeaderNames.hasMoreElements()) {
//			String headerName = authHeaderNames.nextElement();
//			template.header(headerName, request.getHeader(headerName));
//		}
		if (StringUtils.hasText(authHeaderNames.toString())) {
//			while (authHeaderNames.hasMoreElements()) {
//				String headerName = authHeaderNames.nextElement();
				template.header("Authorization", authHeaderNames.toString());
//			}
		}
	}


}
