package controller;

import entity.Point;
import main.Response;
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

    @PostMapping("/points")
    ResponseEntity<?> postPoint(@RequestBody Point point) {
        Set<Double> rightX = new HashSet<>(Arrays.asList(-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0, 5.0));
        Set<Double> rightR = new HashSet<>(Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0));

        if (!rightX.contains(point.getX())) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Invalid X"));
        }

        if (!rightR.contains(point.getR())) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Invalid R"));
        }

        if (point.getY() > 3 || point.getY() < -3) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response(false, "Invalid Y"));
        }

        Point newPoint = new Point(point.getX(), point.getY(), point.getR());
        pointService.addPoint(newPoint);
        return ResponseEntity.status(HttpStatus.OK).body(new Response(true, newPoint));
    }

    @GetMapping("/points")
    ResponseEntity<?> getAllPoints() {
        return ResponseEntity.status(HttpStatus.OK).body(pointService.getAllPoints());
    }

}
