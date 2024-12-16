package com.example.YKSPlatform.service;

import com.example.YKSPlatform.entity.ContentManagement;
import com.example.YKSPlatform.repository.ContentManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentManagementService {

    @Autowired
    private ContentManagementRepository contentManagementRepository;

    public List<ContentManagement> getAllContent() {
        return contentManagementRepository.findAll();
    }

    public ContentManagement createContent(ContentManagement content) {
        return contentManagementRepository.save(content);
    }

    public void deleteContent(Long id) {
        contentManagementRepository.deleteById(id);
    }
}
