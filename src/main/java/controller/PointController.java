package controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
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
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import service.PointService;
import service.ProjectService;
import service.UserService;
import websocket.SocketHandler;

import java.util.*;

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

    @Autowired
    private SocketHandler socketHandler;

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
        if (!currentUser.equals(currentProject.getUser()) && !currentProject.getCollaborators().contains(currentUser)) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Нет доступа к проекту"));
        }
        pointService.addPoint(newPoint);

        ObjectMapper mapper = new ObjectMapper();
        List<WebSocketSession> sessions = socketHandler.getSessions().getOrDefault(projectName, new ArrayList<>());
        List<WebSocketSession> found = new ArrayList<>();
        sessions.forEach(session -> {
            try {
                session.sendMessage(new TextMessage(mapper.writeValueAsString(newPoint)));
            } catch (Exception e) {
                found.add(session);
            }
        });
        sessions.removeAll(found);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, "ok"));
    }

    @GetMapping("/projects/{projectName}/points")
    ResponseEntity<?> getAllPoints(@PathVariable("projectName") String projectName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername(authentication.getName());
        Project currentProject = projectService.findProjectByName(projectName);
        return ResponseEntity.status(HttpStatus.OK).body(currentProject.getPoints());
    }
}
