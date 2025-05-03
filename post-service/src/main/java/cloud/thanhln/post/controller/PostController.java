package cloud.thanhln.post.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

import cloud.thanhln.post.dto.request.PostRequest;
import cloud.thanhln.post.dto.response.ApiResponse;
import cloud.thanhln.post.dto.response.PostResponse;
import cloud.thanhln.post.service.PostService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostController {
	
PostService postService;

@PostMapping("/create")
ApiResponse<PostResponse> createPosst(@RequestBody PostRequest postRequest) {
    //TODO: process POST request
    
    return ApiResponse.<PostResponse>builder()
    		.result(postService.createPost(postRequest))
    		.build();
}

@GetMapping("/myPost")
ApiResponse<List<PostResponse>> myPost() {
    //TODO: process POST request
    
    return ApiResponse.<List<PostResponse>>builder()
    		.result(postService.getMyPost())
    		.build();
}
}