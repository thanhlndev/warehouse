package cloud.thanhln.post.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import cloud.thanhln.post.domain.Post;

public interface PostRepository extends MongoRepository<Post, String> {
	List<Post> findAllByUserId(String userId);
}
