package com.example.be.product.api;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    private final String uploadDir = "uploads/";

    @Value("${cloudinary.cloud-name:}")
    private String cloudName;

    @Value("${cloudinary.api-key:}")
    private String apiKey;

    @Value("${cloudinary.api-secret:}")
    private String apiSecret;

    @Value("${cloudinary.folder:lumos-aura/products}")
    private String cloudinaryFolder;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Please select a file to upload."));
            }

            if (isCloudinaryConfigured()) {
                return uploadToCloudinary(file);
            }

            return uploadToLocalStorage(file);

        } catch (IOException ex) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Could not store file. " + ex.getMessage()));
        } catch (RuntimeException ex) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Could not upload file. " + ex.getMessage()));
        }
    }

    private ResponseEntity<?> uploadToCloudinary(MultipartFile file) throws IOException {
        Cloudinary cloudinary = new Cloudinary(new HashMap<>(Map.of(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        )));

        Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", cloudinaryFolder,
                "resource_type", "image",
                "use_filename", true,
                "unique_filename", true
        ));

        String secureUrl = String.valueOf(result.get("secure_url"));
        String publicId = String.valueOf(result.get("public_id"));

        return ResponseEntity.ok(Map.of(
                "url", secureUrl,
                "publicId", publicId
        ));
    }

    private ResponseEntity<?> uploadToLocalStorage(MultipartFile file) throws IOException {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "image.png");
            String fileExtension = "";
            int dotIndex = originalFileName.lastIndexOf('.');
            if (dotIndex > 0) {
                fileExtension = originalFileName.substring(dotIndex);
            }
            String newFileName = UUID.randomUUID().toString() + fileExtension;

            // Save file to local directory
            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/uploads/")
                    .path(newFileName)
                    .toUriString();

            return ResponseEntity.ok(Map.of("url", fileDownloadUri));
    }

    private boolean isCloudinaryConfigured() {
        return StringUtils.hasText(cloudName)
                && StringUtils.hasText(apiKey)
                && StringUtils.hasText(apiSecret);
    }
}
