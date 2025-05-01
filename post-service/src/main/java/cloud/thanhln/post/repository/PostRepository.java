package cloud.thanhln.post.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import cloud.thanhln.post.domain.Post;

public interface PostRepository extends MongoRepository<Post, String> {
}
