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

import java.util.stream.Collectors;

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
        Project projectExist = projectService.findProjectByName(project.getProjectName());
        if (projectExist != null)
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new Response(false, "Имя занято"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        project.setUser(currentUser);
        projectService.saveProject(project);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, project));
    }

    @PostMapping("/projects/{projectName}/collaborators")
    ResponseEntity<?> addCollaborator(@PathVariable("projectName") String projectName, @RequestBody User user) {
        User userExist = userService.findUserByUsername(user.getUsername());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        Project currentProject = projectService.findProjectByName(projectName);
        if (!currentProject.getUser().equals(currentUser))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Response(false, "нет доступа к проекту"));
        if (!currentUser.equals(userExist))
            projectService.addCollaborator(currentProject, userExist);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, currentProject.getCollaborators()));
    }

    @GetMapping("/projects")
    ResponseEntity<?> getUserProjects() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Response(true, currentUser.getProjects()
                        .stream()
                        .map(Project::getProjectName)
                        .collect(Collectors.toList()))
                );
    }

    @GetMapping("/shared_projects")
    ResponseEntity<?> getUserSharedProjects() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new Response(true, currentUser.getSharedProjects()
                        .stream()
                        .map(Project::getProjectName)
                        .collect(Collectors.toList()))
                );
    }

}
