package cloud.thanhln.profile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import cloud.thanhln.profile.domain.UserProfile;
import cloud.thanhln.profile.dto.request.ProfileCreationRequest;
import cloud.thanhln.profile.dto.response.UserProfileResponse;
import cloud.thanhln.profile.mapper.UserProfileMapper;
import cloud.thanhln.profile.repository.UserProfileRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserProfileService {
    UserProfileRepository userProfileRepository;
    UserProfileMapper userProfileMapper;

    public UserProfileResponse createProfile(ProfileCreationRequest request) {
        UserProfile userProfile = userProfileMapper.toUserProfile(request);
        userProfile = userProfileRepository.save(userProfile);
        return userProfileMapper.toUserProfileResponse(userProfile);
    }

    public UserProfileResponse getProfile(String profileId) {

        UserProfile thisUser =
                userProfileRepository.findById(profileId).orElseThrow(() -> new RuntimeException("Profile not found"));

        return userProfileMapper.toUserProfileResponse(thisUser);
    }

    public List<UserProfileResponse> fetchAllProfile() {

        List<UserProfile> allProfiles = userProfileRepository.findAll();

        return allProfiles.stream()
                .map(userProfileMapper::toUserProfileResponse)
                .collect(Collectors.toList());
    }
}
