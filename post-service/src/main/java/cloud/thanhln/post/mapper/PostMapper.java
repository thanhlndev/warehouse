package cloud.thanhln.post.mapper;

import org.mapstruct.Mapper;

import cloud.thanhln.post.domain.Post;
import cloud.thanhln.post.dto.response.PostResponse;

@Mapper(componentModel = "spring")
public interface PostMapper {
    PostResponse toPostResponse(Post post);
}
