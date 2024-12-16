package com.example.YKSPlatform.website;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * If other pages are to be added to the site, it can be done here. Like the login screen.
 **/
@Controller
public class Website {

    /// [ADMIN PAGE](http://localhost:8080/admin)
    @GetMapping("admin")
    public String admin() {
        return "admin";
    }

    /// [COACH PAGE](http://localhost:8080/coach)
    @GetMapping("coach")
    public String coach() {
        return "coach";
    }

    /// [HOME PAGE](http://localhost:8080)
    @GetMapping("")
    public String home() {
        return "home";
    }

    /// [STUDENT PAGE](http://localhost:8080/student)
    @GetMapping("student")
    public String student() {
        return "student";
    }
}
