package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testApi() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Spring Boot와 React 연동이 완벽하게 성공했습니다! \uD83C\uDF89");
        response.put("db_target", "Supabase 클라우드 데이터베이스 정상 구동 중");

        return ResponseEntity.ok(response);
    }
}
