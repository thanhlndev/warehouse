package cloud.thanhln.post.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import cloud.thanhln.post.domain.Post;
import cloud.thanhln.post.dto.request.PostRequest;
import cloud.thanhln.post.dto.response.PostResponse;
import cloud.thanhln.post.mapper.PostMapper;
import cloud.thanhln.post.repository.PostRepository;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostService {
	
	PostRepository postRepository;
	PostMapper postMapper;
	
	public PostResponse createPost(PostRequest request) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Post post = Post.builder()
				.content(request.getContent())
				.userId(authentication.getName())
				.createdDate(Instant.now())
				.modifiedDate(Instant.now())
				.build();
		post = postRepository.save(post);
	return postMapper.toPostResponse(post);
	}
	public List<PostResponse> getMyPost() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String userId = authentication.getName();
		return postRepository.findAllByUserId(userId).stream().map(postMapper::toPostResponse).toList();
	}
}
