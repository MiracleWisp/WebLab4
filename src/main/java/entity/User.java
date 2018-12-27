package entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @NotNull
    @NotEmpty
    @Column(name = "username")
    private String username;

    @NotNull
    @NotEmpty
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonProperty(access = Access.READ_ONLY)
    List<Project> projects;

}
