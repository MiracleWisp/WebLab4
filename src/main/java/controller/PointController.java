package controller;

import entity.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.PointService;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api")
@EnableAutoConfiguration
public class PointController {

    @Autowired
    private
    PointService pointService;

    @PostMapping("/point")
    ResponseEntity<?> postPoint(@RequestBody Point point) {
        Set<Double> rightXR = new HashSet<>(Arrays.asList(-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0));

        if (!rightXR.contains(point.getX())) {
            return ResponseEntity.status(HttpStatus.OK).body("Error x");
        }

        if (!rightXR.contains(point.getR())) {
            return ResponseEntity.status(HttpStatus.OK).body("Error r");
        }

        if (point.getY() > 3 || point.getY() < -3) {
            return ResponseEntity.status(HttpStatus.OK).body("Error y");
        }

        Point newPoint = new Point(point.getX(), point.getY(), point.getR());
        pointService.addPoint(newPoint);
        return ResponseEntity.status(HttpStatus.OK).body(newPoint);
    }

    @GetMapping("/point")
    ResponseEntity<?> getAllPoints() {
        return ResponseEntity.status(HttpStatus.OK).body(pointService.getAllPoints());
    }

}
