package service;

import entity.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.PointRepository;

import java.util.List;

@Service("pointService")
public class PointService {

    private final PointRepository pointRepository;

    @Autowired
    public PointService(PointRepository pointRepository) {
        this.pointRepository = pointRepository;
    }

    public Point getPointByPointId(int id) {
        return pointRepository.findPointByPointId(id);
    }

    public List<Point> getPointsByR(double r) {
        return pointRepository.getPointsByR(r);
    }

    public void addPoint(Point point) {
        pointRepository.save(point);
    }
}