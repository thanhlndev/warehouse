package cloud.thanhln.identity.configuration;

import java.text.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;

import com.nimbusds.jwt.SignedJWT;

import lombok.experimental.NonFinal;

@Component
public class CustomJwtDecoder implements JwtDecoder {

    @NonFinal
    @Value("${jwt.signer-key}")
    protected String SIGNER_KEY;

//    @Autowired
//    private AuthenticationService authenticationService;
//
//    private NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {

//        try {
//            IntrospectTokenResponse response = authenticationService.introspectTokenResponse(
//                    IntrospectTokenRequest.builder().token(token).build());
//
//            if (!response.isValid())
//                throw new JwtException("Token invalid");
//        } catch (JOSEException | ParseException e) {
//            throw new JwtException(e.getMessage());
//        }
//
//        if (Objects.isNull(nimbusJwtDecoder)) {
//            SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(), "HS512");
//            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
//                    .macAlgorithm(MacAlgorithm.HS512)
//                    .build();
//        }
    	try {
			SignedJWT signedJWT = SignedJWT.parse(token);


			return new Jwt(token, 
					signedJWT.getJWTClaimsSet().getIssueTime().toInstant(),
					signedJWT.getJWTClaimsSet().getExpirationTime().toInstant(),
					signedJWT.getHeader().toJSONObject(),
					signedJWT.getJWTClaimsSet().getClaims());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			throw new JwtException("Token invalid");
		}
    }
}
