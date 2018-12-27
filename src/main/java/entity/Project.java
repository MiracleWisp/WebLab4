package entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @ManyToMany(cascade = CascadeType.ALL,fetch=FetchType.EAGER)
    @JoinTable(name="COLLABORATOR_PROJECT",
            joinColumns={@JoinColumn(name="projectName")},
            inverseJoinColumns={@JoinColumn(name="username")})
    Set<User> collaborators;

    @JsonIgnore()
    @Column(name = "sharableId")
    String sharableId;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    List<Point> points;
}
