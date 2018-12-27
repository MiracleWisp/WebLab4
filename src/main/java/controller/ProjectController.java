package controller;

import entity.Project;
import entity.User;
import main.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import service.ProjectService;
import service.UserService;

@RestController
@RequestMapping("/api")
@EnableAutoConfiguration
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @Autowired
    UserService userService;

    @PostMapping("/projects")
    ResponseEntity<?> createProject(@RequestBody Project project) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        project.setUser(currentUser);
        projectService.saveProject(project);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, project));
    }

    @GetMapping("/projects")
    ResponseEntity<?> getUserProjects() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, currentUser.getProjects()));
    }

}
