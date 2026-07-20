package com.emres.tasktracker.service.impl;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.emres.tasktracker.exception.ForbiddenException;
import com.emres.tasktracker.exception.ResourceNotFoundException;
import com.emres.tasktracker.model.Task;
import com.emres.tasktracker.repository.TaskRepository;
import com.emres.tasktracker.service.ITaskService;

@Service
public class TaskServiceImpl implements ITaskService {
  @Autowired
  private TaskRepository taskRepository;

  @Override
  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  @Override
  public List<Task> getTasksByKeycloakUsername(String username) {
    return taskRepository.findByTaskAssignedPersonIgnoreCase(username);
  }

  @Override
  public Task getUserTaskById(Integer id, String username) { //handled
    Task task = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("task " + id + " not found"));
    if (!task.getTaskAssignedPerson().equalsIgnoreCase(username)) {
      throw new ForbiddenException("no access");
    }
    return task;
  }


  @Override
  public Task getTaskById(Integer id) { //
    return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("task " + id + " not found"));
  }

  @Override
  public Task saveTask(Task task) {
    return taskRepository.save(task);
  }

  @Override
  public Task updateTask(Integer id, Task taskDetails) { //handled
    Task taskToBeUpdated = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("task " + id + " not found"));
    BeanUtils.copyProperties(taskDetails, taskToBeUpdated, "id", "taskStartDate");
    return taskRepository.save(taskToBeUpdated);
  }

  @Override
  public Task deleteTask(Integer id) { //handled
    Task taskToBeDeleted = taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("task " + id + " not found"));
    taskRepository.deleteById(id);
    return taskToBeDeleted;
  }

}
