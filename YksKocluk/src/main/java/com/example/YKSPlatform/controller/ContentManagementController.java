package com.example.YKSPlatform.controller;

import com.example.YKSPlatform.entity.ContentManagement;
import com.example.YKSPlatform.service.ContentManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contentManagement")
public class ContentManagementController {

    @Autowired
    private ContentManagementService contentManagementService;

    @GetMapping
    public List<ContentManagement> getAllContent() {
        return contentManagementService.getAllContent();
    }

    @PostMapping
    public ContentManagement addContent(@RequestBody ContentManagement content) {
        return contentManagementService.createContent(content);
    }

    @DeleteMapping("/{id}")
    public void deleteContent(@PathVariable Long id) {
        contentManagementService.deleteContent(id);
    }
}
