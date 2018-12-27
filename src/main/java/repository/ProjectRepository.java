package repository;

import entity.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, String> {
    Project findProjectByProjectName(String name);
}