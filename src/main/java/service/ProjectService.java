package service;

import entity.Project;
import entity.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ProjectRepository;

import java.util.HashSet;
import java.util.Set;

@Service("projectService")
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project findProjectByName(String name){
        return projectRepository.findProjectByProjectName(name);
    }

    public void saveProject(Project project) {
        project.setSharableId(RandomStringUtils.randomAlphabetic(10));
        projectRepository.save(project);
    }

    @Transactional
    public void addCollaborator(Project project,User user) {
        project.getCollaborators().add(user);
        projectRepository.save(project);
    }
}
