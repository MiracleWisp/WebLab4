package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "project")
public class Project {
    @Id
    @Column(name = "projectName")
    String projectName;

    @JsonIgnore()
    @JoinColumn(name = "username", nullable = false)
    @ManyToOne
    User user;

    @JsonIgnore()
    @Column(name = "sharableId")
    String sharableId;

    @OneToMany(mappedBy = "project")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    List<Point> points;
}
