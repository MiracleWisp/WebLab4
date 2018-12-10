package entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

import static java.lang.StrictMath.pow;
import static java.lang.StrictMath.sqrt;

@Entity
@Data
@NoArgsConstructor
@Table(name = "point")
public class Point implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pointId")
    Integer pointId;

    @Column(name = "x", nullable = false)
    double x;

    @Column(name = "y", nullable = false)
    double y;

    @Column(name = "r", nullable = false)
    double r;

    @Column(name = "inArea", nullable = false)
    boolean inArea;

    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.inArea = checkArea();
    }

    private boolean fits2() {
        if (this.y < 0 || this.x > 0 || this.x < -this.r || this.y > this.r) return false;

        return this.y <= sqrt(pow(this.r, 2) - pow(this.x, 2));

    }

    private boolean fits3() {
        return
                (this.x >= -this.r) &&
                        (this.x <= 0) &&
                        (this.y >= -this.r) &&
                        (this.y <= 0);
    }

    private boolean fits4() {
        if (this.x < 0 || this.y > 0) return false;
        return this.y >= this.x - this.r / 2;
    }

    private boolean checkArea() {
        return (this.fits2() || this.fits3() || this.fits4());
    }

    //21205
}