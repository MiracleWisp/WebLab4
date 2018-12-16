package controller;

import entity.Point;
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

    @PostMapping("/points")
    ResponseEntity<?> postPoint(@RequestBody Point point) {
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
        User currentUser = userService.findUserByUsername( authentication.getName());
        Point newPoint = new Point(point.getX(), point.getY(), point.getR(), currentUser);
        pointService.addPoint(newPoint);
        return ResponseEntity.status(HttpStatus.OK).body(new Response (true, newPoint));
    }

    @GetMapping("/points")
    ResponseEntity<?> getAllPoints() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userService.findUserByUsername( authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).body(currentUser.getPoints());
    }

}
