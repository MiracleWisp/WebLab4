package service;

import entity.Project;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import repository.ProjectRepository;

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
}
