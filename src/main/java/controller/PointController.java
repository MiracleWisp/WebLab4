package controller;

import entity.Point;
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
import service.PointService;
import service.ProjectService;
import service.UserService;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api")
@EnableAutoConfiguration
public class PointController {

    @Autowired
    private PointService pointService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProjectService projectService;

    @PostMapping("/projects/{projectName}/points")
    ResponseEntity<?> postPoint(@PathVariable("projectName") String projectName, @RequestBody Point point) {
        Set<Double> rightR = new HashSet<>(Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0));

        if (point.getX() < -3 || point.getX() > 5) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Invalid X"));
        }

        if (!rightR.contains(point.getR())) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Invalid R"));
        }

        if (point.getY() > 3 || point.getY() < -3) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Invalid Y"));
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        Project currentProject = projectService.findProjectByName(projectName);
        Point newPoint = new Point(point.getX(), point.getY(), point.getR(), currentProject, currentUser);
        pointService.addPoint(newPoint);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, newPoint));
    }

    @GetMapping("/projects/{projectName}/points")
    ResponseEntity<?> getAllPoints(@PathVariable("projectName") String projectName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        Project currentProject = projectService.findProjectByName(projectName);
        return ResponseEntity.status(HttpStatus.OK).body(currentProject.getPoints());
    }

}
